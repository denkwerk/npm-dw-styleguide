'use strict';

var fs = require( 'fs' );
function pathExists( path ) {
    try {
        fs.statSync( path );
        return true;
    } catch ( e ) {
        return false;
    }
}

module.exports = pathExists;
