'use strict';

var fs = require( 'fs' );

var pathExists = require( './path-exists' );

function renderReducedTemplate( options, env, navTree, fileContents ) {

    // Render single views
    fileContents.forEach( function( file, i ) {
        var reduced = env.render( options.reducedTemplate, {
            title: 'Reduced Module ' + file.name,
            element: file,
            navigation: navTree,
            stylesheets: options.setup.stylesheets,
            headerScripts: options.setup.headerScripts,
            footerScripts: options.setup.footerScripts,
            webPath: options.webPath,
            additionalVars: options.additionalTemplateVars,
            headEndCode: options.headEndCode,
            bodyStartCode: options.bodyStartCode,
            bodyEndCode: options.bodyEndCode
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
