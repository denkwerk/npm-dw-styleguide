'use strict';

var fs = require( 'fs' );
var copy = require( 'copy' );

//read html files
function copyJsCss( options, callback ) {

    copy( __dirname + '/../dist/**/*.js', process.cwd() + '/' + options.setup.outputPath, {
        cwd: __dirname
    }, function( err ) {
        if ( err ) {throw err;}
        if ( typeof callback === 'function' ) {
            callback();
        }
    } );

    copy.one( __dirname + '/../' + options.setup.templateStyleguideStylesheet,
        __dirname + '/../' + options.setup.outputPath + 'css', {flatten: true}, function( err ) {
            if ( err ) {return console.log( err );}
        } );

}

module.exports = copyJsCss;
