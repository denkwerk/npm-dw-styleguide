'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var nunjucks = require( 'nunjucks' );

var pathExists = require( './path-exists' );

var getWayToRoot = require( './get-way-to-root' );

function renderIframeTemplate( options, env, fileContents ) {

    fileContents.forEach( function( file, i ) {
        var iframe = env.render( options.iframeTemplate, {
            title: 'Iframe Module ' + file.name,
            element: file,
            webPath: options.webPath,
            wayToRoot: options.webPath === '' ? getWayToRoot( file.level ? file.level : 0 ) : '',

            additionalVars: options.additionalTemplateVars,

            templateSrcStylesheets: options.setup.templateSrcStylesheets,
            templateSrcHeaderScripts: options.setup.templateSrcHeaderScripts,
            templateSrcFooterScripts: options.setup.templateSrcFooterScripts,

            templateSrcHeadEndCode: options.templateSrcHeadEndCode,
            templateSrcBodyStartCode: options.templateSrcBodyStartCode,
            templateSrcBodyEndCode: options.templateSrcBodyEndCode
        } );
        var paths = file.path.split( '/' );
        var p = '';

        paths.forEach( function( path, i, paths ) {
            if ( i + 1 < paths.length ) {
                p += path + '/';
                if ( !pathExists( options.setup.outputPath + p ) ) {
                    fs.mkdirSync( options.setup.outputPath + p );
                }
            }
        } );

        // TODO: Check origin
        //fs.writeFile(options.outputPath + file.iframePath, iframe);
        fs.writeFile( options.outputPath + '/' + file.iframePath, iframe );
    } );
}

module.exports = renderIframeTemplate;
