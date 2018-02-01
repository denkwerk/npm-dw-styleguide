'use strict';

var fs = require( 'fs' );
var copy = require( 'copy' );
var concat = require( 'concat' );

var pathExists = require( './path-exists' );

//read html files
function copyJsCss( options, callback ) {

    var dirOut = process.cwd() + '/' + options.setup.outputPath;
    var dirIn = __dirname + '/../src/';

    var cssPath = dirOut + 'css';
    if ( !pathExists( cssPath ) ) {
        fs.mkdirSync( cssPath );
    }
    var jsPath = dirOut + 'js';
    if ( !pathExists( jsPath ) ) {
        fs.mkdirSync( jsPath );
    }

    var jsVendorPath = dirOut + 'js/vendor';
    if ( !pathExists( jsVendorPath ) ) {
        fs.mkdirSync( jsVendorPath );
    }

    var prom1 = concat( [
        dirIn + 'css/sg-style/base.css',
        dirIn + 'css/sg-style/fonts.css',
        dirIn + 'css/sg-style/typography.css',
        dirIn + 'css/sg-style/sections.css',
        dirIn + 'css/sg-style/section-buttons.css',
        dirIn + 'css/sg-style/navigation.css',
        dirIn + 'css/sg-style/linklist.css',
        dirIn + 'css/sg-style/spinner.css',
        dirIn + 'css/sg-style/custom-checkboxes.css'
    ],
    dirOut + 'css/sg-style.css' );

    var prom3 = concat( [
        dirIn + 'js/sg-scripts-content-btns/all.js',
        dirIn + 'js/sg-scripts-navi-iframe/iframe.js',
        dirIn + 'js/sg-scripts-navi-iframe/base.js',
        dirIn + 'js/sg-scripts-navi-iframe/sticky-header.js',
        dirIn + 'js/sg-scripts-navi-iframe/toggle-btns.js'
    ], dirOut + 'js/sg-scripts.js' );

    var prom5 = concat( [
        dirIn + 'js/sg-scripts-navi-iframe/helper.js',
        dirIn + 'js/sg-scripts-navi-iframe/navigation.js'
    ], dirOut + 'js/sg-priority.js' );

    copy( 'js/vendor/*.js', dirOut + 'js/vendor', {
        cwd: dirIn
    }, function( err ) {
        if ( err ) {
            throw err;
        }

        prom1.then( function( result ) {
            prom3.then( function() {

                prom5.then( function() {
                    if ( typeof callback === 'function' ) {
                        callback();
                    }
                } ).catch( function() {
                    console.log( 'error on copy-js-css: js/navigation.js', result );
                    process.exit();
                } );
            } ).catch( function() {
                console.log( 'error on copy-js-css: js/sg-scripts.js', result );
                process.exit();
            } );
        } ).catch( function( result ) {
            console.log( 'error on copy-js-css: css/sg-style/sg-style.css', result );
            process.exit();
        } );

    } );

}

module.exports = copyJsCss;
