'use strict';

function getNaviObjData( options, files, navTree ) {
    // Build navigation using infinite recursion
    var buildNav = function( splitPath, children, pathSum ) {
        var rawItem = splitPath.shift(); // get file name of path

        if ( splitPath.length === 0 ) { // if file (no folder)
            children.push( {
                name: rawItem,
                link: options.setup.outputPath + rawItem.split( '.' )[0],
                hash: rawItem.split( '.' )[0],
                pathSum: pathSum
            } );
        } else { // if folder

            // get element of rawItem ( folder element )
            var item = children.filter( function( item ) {
                return item.name === rawItem;
            } )[0];

            pathSum = pathSum !== '' ? pathSum + '/' + rawItem : pathSum + rawItem;

            if ( !item ) {
                item = {
                    name: rawItem,
                    children: [],
                    pathSum: pathSum
                };

                children.push( item );
            }
            buildNav( splitPath, item.children, pathSum );
        }
    };

    files.forEach( function( file ) {
        var element = file.split( '/' );
        buildNav( element, navTree, '' );
    } );

    return navTree;

}

module.exports = getNaviObjData;
