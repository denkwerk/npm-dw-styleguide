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
        // docPath = ( typeof options.docPath === 'string' ) ?
        //     path.normalize( options.docPath ) + path.sep :
        //     options.docPath,
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

    var templateStyleguideStylesheetTheme = options.templateStyleguideStylesheetTheme &&
    options.templateStyleguideStylesheetTheme !== '' ? options.templateStyleguideStylesheetTheme : false;

    // Scripts
    var footerScripts = [],
        headerScripts = [];

    if ( Array.isArray( options.headerScripts ) ) {
        headerScripts = options.headerScripts;
    } else if ( typeof options.headerScripts === 'string' ) {
        headerScripts = [
            options.headerScripts
        ];
    }

    if ( Array.isArray( options.footerScripts ) ) {
        footerScripts = options.footerScripts;
    } else if ( typeof options.footerScripts === 'string' ) {
        footerScripts = [
            options.footerScripts
        ];
    }

    var templatesPath =  __dirname + '/../src' + '/templates';

    if ( options.templatesPath ) {
        templatesPath = options.templatesPath;
    }

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
        // docPath: docPath,
        templatesPath: templatesPath,
        templateSrcStylesheets: templateSrcStylesheets,
        templateStyleguideStylesheetTheme: templateStyleguideStylesheetTheme,
        footerScripts: footerScripts,
        headerScripts: headerScripts
    };

    styleGenerateMain( options, callback );

}

module.exports = style;
