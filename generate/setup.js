'use strict';

var path = require( 'path' );
var styleGenerateMain = require( './main' );

//read html files
/* eslint-disable complexity */
function style( options, callback ) {
    /* eslint-enable */
    // Check for required options
    if ( !options.inputPath ) {
        throw new Error( 'You have to specify an input path' );
    }

    if ( !options.outputPath ) {
        throw new Error( 'You have to specify an output path' );
    }

    if ( typeof options.docNotFoundTemplate !== 'string' ) {
        options.docNotFoundTemplate = 'Documentation for {{ file }} not found. Please add documentation file';
    }

    if ( typeof options.webPath !== 'string' ) {
        options.webPath = '/dw-styleguide';
    }

    if  ( options.webPath !== '' ) {
        options.webPath = options.webPath + '/';
    }

    if ( !options.fullTemplate ) {
        options.fullTemplate = 'full.njk';
    }

    if ( !options.iframeTemplate ) {
        options.iframeTemplate = 'iframe.njk';
    }

    if ( !options.reducedTemplate ) {
        options.reducedTemplate = 'reduced.njk';
    }

    if ( !options.showdownOptions ) {
        options.showdownOptions = {
            prefixHeaderId: 'sg-'
        };
    } else if ( !options.showdownOptions.prefixHeaderId ) {
        options.showdownOptions.prefixHeaderId = 'sg-';
    }

    var inputPath = path.normalize( options.inputPath ) + path.sep,
        inputPagesPath = options.inputPagesPath && options.inputPagesPath !== '' ?
            path.normalize( options.inputPagesPath ) : false,
        outputPagesPath = options.outputPagesPath && options.outputPagesPath !== '' ?
            path.normalize( options.outputPagesPath ) : false,
        docPath = ( typeof options.docPath === 'string' ) ?
            path.normalize( options.docPath ) + path.sep :
            inputPath,
        outputPath = path.normalize( options.outputPath ) + path.sep;

    var templateSrcStylesheets = [
        '/css/main.css'
    ];

    if ( Array.isArray( options.templateSrcStylesheets ) ) {
        templateSrcStylesheets = options.templateSrcStylesheets;
    } else if ( typeof options.templateSrcStylesheets === 'string' ) {
        templateSrcStylesheets = [
            options.templateSrcStylesheets
        ];
    }

    var templateStyleguideStylesheet = options.templateStyleguideStylesheet &&
    options.templateStyleguideStylesheet !== '' ? options.templateStyleguideStylesheet :
        __dirname + '/../dist/css/sg-style.css';

    if ( Array.isArray( options.templateStyleguideAdditionalStylesheets ) ) {
        templateStyleguideAdditionalStylesheets = options.templateStyleguideAdditionalStylesheets;
    } else if ( typeof options.templateStyleguideAdditionalStylesheets === 'string' ) {
        templateStyleguideAdditionalStylesheets = [
            options.templateStyleguideAdditionalStylesheets
        ];
    }

    // Scripts
    var footerScripts = [],
        headerScripts = [];

    if ( Array.isArray( options.templateSrcHeaderScripts ) ) {
        headerScripts = options.templateSrcHeaderScripts;
    } else if ( typeof options.templateSrcHeaderScripts === 'string' ) {
        headerScripts = [
            options.templateSrcHeaderScripts
        ];
    }

    if ( Array.isArray( options.templateSrcFooterScripts ) ) {
        footerScripts = options.templateSrcFooterScripts;
    } else if ( typeof options.templateSrcFooterScripts === 'string' ) {
        footerScripts = [
            options.templateSrcFooterScripts
        ];
    }

    var templatesPath =  __dirname + '/../src' + '/templates';

    if ( options.templatesPath ) {
        templatesPath = options.templatesPath;
    }

    var templateSrcPath = options.templateSrcPath && options.templateSrcPath !== '' ? options.templateSrcPath :
        templatesPath;

    if ( typeof options.templateSrcHeadEndCode !== 'string' ) {
        options.templateSrcHeadEndCode = '';
    }

    if ( typeof options.templateSrcBodyStartCode !== 'string' ) {
        options.templateSrcBodyStartCode = '';
    }

    if ( typeof options.templateSrcBodyEndCode !== 'string' ) {
        options.templateSrcBodyEndCode = '';
    }


    options.setup = {
        inputPath: inputPath,
        inputPagesPath: inputPagesPath,
        outputPath: outputPath,
        outputPagesPath: outputPagesPath,

        docPath: docPath,
        templatesPath: templatesPath,
        templateSrcPath: templateSrcPath,

        templateStyleguideStylesheet: templateStyleguideStylesheet,
        templateStyleguideAdditionalStylesheets: templateStyleguideAdditionalStylesheets,

        templateSrcStylesheets: templateSrcStylesheets,
        templateSrcHeaderScripts: headerScripts,
        templateSrcFooterScripts: footerScripts
    };

    styleGenerateMain( options, callback );

}

module.exports = style;
