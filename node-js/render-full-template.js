'use strict';

var fs = require( 'fs' );

//read html files
function renderFullTemplate( options, env, navTree, fileContents, addOptions ) {

    // Render full styleguide
    var full = env.render( options.fullTemplate, {
        title: 'Full styleguide',
        elements: fileContents,
        navigation: navTree,
        stylesheets: options.setup.stylesheets,
        headerScripts: options.setup.headerScripts,
        footerScripts: options.setup.footerScripts,
        webPath: options.webPath,
        additionalVars: options.additionalTemplateVars,
        showlinkList: addOptions.showlinkList ? true : false,
        showContent: addOptions.showContent ? true : false,
        levelStart: addOptions.levelStart ? addOptions.levelStart : 0,
        headEndCode: options.headEndCode,
        bodyStartCode: options.bodyStartCode,
        bodyEndCode: options.bodyEndCode
    } );

    // Write full styleguide to file
    var path = typeof addOptions.writePath === 'undefined' || addOptions.writePath === false ?
        options.setup.outputPath : addOptions.writePath;
    var name = typeof addOptions.fileName === 'undefined' || addOptions.fileName === false ?
        'index' : addOptions.fileName;
    fs.writeFile( path + name + '.html', full );

    return full;

}

module.exports = renderFullTemplate;
