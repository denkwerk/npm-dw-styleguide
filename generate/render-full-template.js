'use strict';

var fs = require( 'fs' );

var getWayToRoot = require( './get-way-to-root' );

//read html files
function renderFullTemplate( options, env, navTree, fileContents, addOptions ) {
    // Render full styleguide
    var full = env.render( options.fullTemplate, {
        title: 'Full styleguide',
        elements: fileContents,
        navigation: navTree,

        navigationPages: addOptions.pageTree ? addOptions.pageTree : false,
        inputPagesPath: options.setup.inputPagesPath,
        outputPagesPath: options.setup.outputPagesPath,

        templateStyleguideStylesheet: options.setup.templateStyleguideStylesheet,
        templateStyleguideAdditionalStylesheet: options.setup.templateStyleguideAdditionalStylesheet,

        templateSrcStylesheets: options.setup.templateSrcStylesheets,
        templateSrcHeaderScripts: options.setup.templateSrcHeaderScripts,
        templateSrcFooterScripts: options.setup.templateSrcFooterScripts,

        templateSrcHeadEndCode: options.templateSrcHeadEndCode,
        templateSrcBodyStartCode: options.templateSrcBodyStartCode,
        templateSrcBodyEndCode: options.templateSrcBodyEndCode,

        webPath: options.webPath,
        wayToRoot: options.webPath === '' ? getWayToRoot( addOptions.level ? addOptions.level : 0 ) : '',

        additionalVars: options.additionalTemplateVars,

        showLinkList: addOptions.showLinkList ? true : false,
        showPageList: addOptions.showPageList ? true : false,
        showContent: addOptions.showContent ? true : false,

        levelStart: addOptions.levelStart ? addOptions.levelStart : 0
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
