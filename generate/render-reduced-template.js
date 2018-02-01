'use strict';

var fs = require( 'fs' );

var pathExists = require( './path-exists' );

var getWayToRoot = require( './get-way-to-root' );


function renderReducedTemplate( options, env, navTree, fileContents ) {

    // Render single views

    fileContents.forEach( function( file, i ) {
        var reduced = env.render( options.reducedTemplate, {
            title: 'Reduced Module ' + file.name,
            element: file,
            navigation: navTree,
            inputPagesPath: options.setup.inputPagesPath,

            templateSrcStylesheets: options.setup.templateSrcStylesheets,
            templateSrcHeaderScripts: options.setup.templateSrcHeaderScripts,
            templateSrcFooterScripts: options.setup.templateSrcFooterScripts,

            templateSrcHeadEndCode: options.templateSrcHeadEndCode,
            templateSrcBodyStartCode: options.templateSrcBodyStartCode,
            templateSrcBodyEndCode: options.templateSrcBodyEndCode,

            webPath: options.webPath,
            wayToRoot: options.webPath === '' ? getWayToRoot( file.level ? file.level : 0 ) : '',
            
            additionalVars: options.additionalTemplateVars
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

        fs.writeFile( options.setup.outputPath + file.path, reduced );
    } );

}

module.exports = renderReducedTemplate;
