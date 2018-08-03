'use strict';

// Get all content of level data including the sublevel data
function getNaviObjDataWithAddInfo( navTree ) {

    var getContentSub = function( navTreeAct ) {
        navTreeAct.forEach( function( el ) {

            if ( el.children ) {
                getContentSub( el.children );
            } else {
                var pathSumCounter = -1;
                navTreeAct.forEach( function( elOrg ) {
                    pathSumCounter = elOrg.pathSum === el.pathSum ? pathSumCounter + 1 : pathSumCounter;
                } );
                el.nrOfSiblings = pathSumCounter;

                if ( el.pathSum.length - el.hash.length >= 0 ) {
                    var parentName = el.pathSum.substring( el.pathSum.length - el.hash.length );
                    el.nameSameAsParent = el.hash === parentName ? true : false;
                } else {
                    el.nameSameAsParent = false;
                }

                // console.log( 'el:', el );

            }
        } );

    };

    getContentSub( navTree );

    var getContentSub2 = function( navTreeAct ) {
        navTreeAct.forEach( function( el, i ) {

            if ( el.children ) {
                if ( el.children.length > 1 ||
                    ( el.children[ 0 ].nrOfSiblings > 0 ) || el.children[ 0 ].children ) {
                    el.hasOneSameNamedChildOnly = false;
                } else {
                    if ( el.children[ 0 ].hash === el.name ) {
                        el.hasOneSameNamedChildOnly = true;
                    } else {
                        el.hasOneSameNamedChildOnly = false;
                    }
                }

                getContentSub2( el.children );
            }

        } );

    };

    getContentSub2( navTree );


    // var getContentSub3 = function( navTreeAct ) {
    //     navTreeAct.forEach( function( el ) {
    //
    //         if ( el.children ) {
    //             console.log( '--->', el.name, el.children[ 0 ].name );
    //             console.log( el );
    //
    //             getContentSub3( el.children);
    //         }
    //
    //     } );
    //
    // };
    //
    // getContentSub3( navTree );


    return navTree;
}

module.exports = getNaviObjDataWithAddInfo;
