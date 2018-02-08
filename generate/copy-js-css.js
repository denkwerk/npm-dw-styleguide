'use strict';

var fs = require( 'fs' );
var copy = require( 'copy' );

//read html files
function copyJsCss( options, callback ) {

    copy( __dirname + '/../dist/**/**/*.*', process.cwd() + '/' + options.setup.outputPath, {
        cwd: __dirname
    }, function( err ) {
        if ( err ) {throw err;}
        if ( typeof callback === 'function' ) {
            callback();
        }
    } );

}

module.exports = copyJsCss;
