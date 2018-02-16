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
    var destPath = process.cwd() + '/' + options.setup.outputPath + 'css';
    copy.one( options.setup.templateStyleguideStylesheet,
        destPath,
        {flatten: true, rename: 'test.css'}, function( err, file ) {
            if ( err ) {return console.log( err );}
            fs.rename(destPath + '/' + file.basename , destPath + '/'+ 'sg-style.css', function(err) {
                if ( err ) console.log('ERROR: ' + err);
            });
        } );

}

module.exports = copyJsCss;
