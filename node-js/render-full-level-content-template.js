'use strict';

var fs = require( 'fs' );

var getLevelContentData = require( './get-level-content-data' );
var renderFullTemplate = require( './render-full-template' );

function renderFullLevelContentTemplate( options, env, navTree, fileContents ) {


    var getContentSub = function( navTreeAct, level ) {
        navTreeAct.forEach( function( el, i ) {

            if ( el.children ) {
                // console.log( 'level:', level, 'el.pathSum:', el.pathSum );
                // console.log( 'el.name:', el.name );
                var content = getLevelContentData( fileContents, el.pathSum );
                // console.log( 'content:', content );

                var path = options.setup.outputPath + el.pathSum + '/';
                // console.log( 'path:', path, 'level:', level );

                renderFullTemplate( options, env, navTree, content,
                    {levelStart: level + 1, showContent: true, showlinkList: false, writePath: path, fileName: false} );

                getContentSub( el.children, level + 1 );
            }
        } );

    };

    getContentSub( navTree, 0, '' );


}

module.exports = renderFullLevelContentTemplate;
