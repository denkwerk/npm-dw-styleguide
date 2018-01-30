'use strict';

// Get all content of level data including the sublevel data
function getLevelContentData( files, path ) {
    var content = [];
    files.forEach( function( el, i ) {
        var pathLength = path.length;
        if ( el.basePath.length >= pathLength && path === el.basePath.substring( 0, pathLength ) ) {
            content.push( el );
        }
    } );
    return content;
}

module.exports = getLevelContentData;
