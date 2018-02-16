'use strict';

var glob = require( 'glob' );
var fs = require( 'fs' );
var path = require( 'path' );
var nunjucks = require( 'nunjucks' );
var showdown = require( 'showdown' );
var copy = require( 'copy' );

var pathExists = require( './path-exists' );
var copyJsCss = require( './copy-js-css' );
var getNaviObjData = require( './get-navi-obj-data' );
var getNaviObjDataWithAddInfo = require( './get-navi-obj-data-with-add-info' );
var renderFullTemplate = require( './render-full-template' );
var renderFullTemplateLevel = require( './render-full-level-content-template' );
var renderReducedTemplate = require( './render-reduced-template' );
var renderIframeTemplate = require( './render-iframe-template' );

function styleGenerateMain( options, callback ) {

    var env = new nunjucks.Environment( new nunjucks.FileSystemLoader( options.setup.templatesPath ) );

    // read html element files
    glob( '**/*.html', {
        cwd: options.setup.inputPath
    }, function( err, files ) {
        if ( err ) {
            return console.log( err );
        }

        //build structure for navigation
        var navTree = [];
        navTree = getNaviObjData( options, files, navTree );
        navTree = getNaviObjDataWithAddInfo( navTree );
        // console.log( 'navTree', navTree );

        var fileContents = [],
            mdConverter = new showdown.Converter( options.showdownOptions );

        var levelMinus = options.setup.inputPath.split( '/' ).length;
        // Build data structure for rendering

        files.forEach( function( file, i, ar ) {
            var split = file.split( '/' );

            var contents = pathExists( options.setup.inputPath + file ) ?
                fs.readFileSync( options.setup.inputPath + file ) : '';

            // docs could be in src folder only (not in generated folders) - so we need the option
            var doc = ( options.setup.docPath &&
            pathExists( options.setup.docPath + file.split( '.' )[ 0 ] + '.md' ) ) ?
                mdConverter.makeHtml(
                    fs.readFileSync( options.setup.docPath + file.split( '.' )[ 0 ] + '.md' ).toString()
                ) :
                env.renderString( options.docNotFoundTemplate, { file: file } );

            var basePath = file.substring( 0, file.lastIndexOf( '/' ) );
            var name = split[ split.length - 1 ]
                .split( '.' )[ file.split( '.' ).length - 2 ];
            var id = basePath.replace( /\//g, '-' ) + '-' + name;
            fileContents.push( {
                name: name,
                content: contents.toString(),
                doc: doc,
                path: file,
                iframePath: file.split( '.html' )[ 0 ] + '-iframe.html',
                basePath: basePath,
                level: split.length - levelMinus,
                id: id
            } );
        } );

        // console.log( 'fileContents:', fileContents );

        // Create target directory if it does not exist
        if ( !pathExists( options.setup.outputPath ) ) {
            fs.mkdirSync( options.setup.outputPath );
        }

        // Render full styleguide with all elements
        renderFullTemplate( options, env, navTree, fileContents,
            { showContent: true, writePath: false, fileName: 'all' } );

        // Render full styleguide link overview
        renderFullTemplate( options, env, navTree, fileContents,
            { showContent: false, showLinkList: true, writePath: false, fileName: 'index' } );

        // Render single views
        renderReducedTemplate( options, env, navTree, fileContents );

        // Render iframe views
        var env2 = new nunjucks.Environment( new nunjucks.FileSystemLoader( options.setup.templateSrcPath ) );
        renderIframeTemplate( options, env2, fileContents );

        // Render all level Contents
        // Each level content contains als sublevel content
        renderFullTemplateLevel( options, env, navTree, fileContents );

        // Copy CSS/JS files
        copyJsCss( options, callback );

        if ( options.setup.inputPagesPath ) {
            //read html pages files
            glob( '**/*.html', {
                cwd: options.setup.inputPagesPath
            }, function( err, files ) {
                if ( err ) {
                    return console.log( err );
                }

                var pageTree = [];
                pageTree = getNaviObjData( options, files, pageTree );


                renderFullTemplate( options, env, navTree, fileContents,
                    {
                        showContent: false,
                        showPageList: true,
                        pageTree: pageTree,
                        writePath: false,
                        fileName: 'index-pages'
                    } );

            } );
        }


    } );


}

module.exports = styleGenerateMain;
