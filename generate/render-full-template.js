'use strict';

var fs = require( 'fs' );

//read html files
function renderFullTemplate( options, env, navTree, fileContents, addOptions ) {
    // Render full styleguide
    var full = env.render( options.fullTemplate, {
        title: 'Full styleguide',
        elements: fileContents,
        navigation: navTree,
        navigationPages: addOptions.pageTree ? addOptions.pageTree : false,
        inputPagesPath: options.setup.inputPagesPath,
        templateSrcStylesheets: options.setup.templateSrcStylesheets,
        templateStyleguideStylesheetTheme: options.setup.templateStyleguideStylesheetTheme,
        headerScripts: options.setup.headerScripts,
        footerScripts: options.setup.footerScripts,
        webPath: options.webPath,
        additionalVars: options.additionalTemplateVars,
        showLinkList: addOptions.showLinkList ? true : false,
        showPageList: addOptions.showPageList ? true : false,
        showContent: addOptions.showContent ? true : false,
        levelStart: addOptions.levelStart ? addOptions.levelStart : 0,
        templateSrcHeadEndCode: options.templateSrcHeadEndCode,
        templateSrcBodyStartCode: options.templateSrcBodyStartCode,
        templateSrcBodyEndCode: options.templateSrcBodyEndCode
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
