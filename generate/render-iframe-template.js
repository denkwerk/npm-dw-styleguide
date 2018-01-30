'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var nunjucks = require( 'nunjucks' );

var pathExists = require( './path-exists' );

function renderIframeTemplate( options, env, fileContents ) {

    fileContents.forEach( function( file, i ) {
        var iframe = env.render( options.iframeTemplate, {
            title: 'Iframe Module ' + file.name,
            element: file,
            templateSrcStylesheets: options.setup.templateSrcStylesheets,
            headerScripts: options.setup.headerScripts,
            footerScripts: options.setup.footerScripts,
            webPath: options.webPath,
            additionalVars: options.additionalTemplateVars,
            headerEndCode: options.headerEndCode,
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
