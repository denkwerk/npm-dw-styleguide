'use strict';

var glob = require('glob');
var fs = require('fs');
var path = require('path');
var nunjucks = require('nunjucks');
var showdown = require('showdown');

function pathExists(path) {
    try {
        fs.statSync(path);
        return true;
    } catch (e) {
        return false;
    }
}

//read html files
function style(options) {

    // Check for required options
    if (!options.inputPath) {
        throw new Error('You have to specify an input path');
    }

    if (!options.outputPath) {
        throw new Error('You have to specify an output path');
    }

    var inputPath = path.normalize(options.inputPath) + path.sep,
        docPath = (typeof options.docPath === 'string') ?
            path.normalize(options.docPath) + path.sep :
            options.docPath,
        outputPath = path.normalize(options.outputPath) + path.sep;

    var stylesheets = [
        '/css/main.css'
    ];

    if (Array.isArray(options.stylesheets)) {
        stylesheets = options.stylesheets;
    } else if (typeof options.stylesheets === 'string') {
        stylesheets = [
            options.stylesheets
        ];
    }

    if (!options.fullTemplate) {
        options.fullTemplate = 'full.njk';
    }

    if (!options.reducedTemplate) {
        options.reducedTemplate = 'reduced.njk';
    }

    var templatesPath = __dirname + '/templates';

    if (options.templatesPath) {
        templatesPath = options.templatesPath;
    }

    var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templatesPath));

    if (typeof options.docNotFoundTemplate !== 'string') {
        options.docNotFoundTemplate = 'Documentation for {{ file }} not found. Please add documentation file';
    }

    if (typeof options.webPath !== 'string') {
        options.webPath = '/dw-styleguide';
    }

    glob('**/*.html', {
        cwd: inputPath
    }, function(err, files) {
        if (err) {
            return console.log(err);
        }

        //build structure for navigation
        var navTree = [];

        // Build navigation using infinite recursion
        var buildNav = function(splitPath, children) {
            var rawItem = splitPath.shift();
            if (splitPath.length === 0) {
                children.push({
                    name: rawItem,
                    link: outputPath + rawItem.split('.')[0],
                    hash: rawItem.split('.')[0]
                });
            } else {
                var item = children.filter(function(item) {
                    return item.name === rawItem;
                })[0];

                if (!item) {
                    item = {
                        name: rawItem,
                        children: []
                    };

                    children.push(item);
                }

                buildNav(splitPath, item.children);
            }
        };

        files.forEach(function(file) {
            var element = file.split('/');
            buildNav(element, navTree);
        });

        var fileContents = [],
            mdConverter = new showdown.Converter();

        // Build data structure for rendering
        files.forEach(function(file, i, ar) {
            var split = file.split("/");

            var contents = pathExists(inputPath + file) ?
                fs.readFileSync(inputPath + file) : '';
            var doc = (docPath && pathExists(docPath + file.split('.')[0] + '.md')) ?
                mdConverter.makeHtml(
                    fs.readFileSync(docPath + file.split('.')[0] + '.md').toString()
                ) :
                env.renderString(options.docNotFoundTemplate, { file: file });
            fileContents.push({
                name: split[split.length - 1]
                    .split(".")[file.split(".").length - 2],
                content: contents.toString(),
                doc: doc,
                path: file
            })
        });

        // Render full styleguide
        var full = env.render(options.fullTemplate, {
            title: 'Full styleguide',
            elements: fileContents,
            navigation: navTree,
            stylesheets: stylesheets,
            webPath: options.webPath
        });

        // Create target directory if it does not exist
        if (!pathExists(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        // Write full styleguide to file
        fs.writeFile(outputPath + 'index.html', full);

        // Render single views
        fileContents.forEach(function(file, i) {
            var reduced = env.render(options.reducedTemplate, {
                title: 'Reduced Module ' + file.name,
                element: file,
                stylesheets: stylesheets,
                webPath: options.webPath
            });
            var paths = file.path.split('/');
            var p = '';

            paths.forEach(function(path, i, paths) {
                if (i + 1 < paths.length) {
                    p += path + '/';

                    if(!pathExists(outputPath + p)) {
                        fs.mkdirSync(outputPath + p);
                    }
                }
            });

            fs.writeFile(outputPath + file.path, reduced);
        });

        // Check for existance of css/js paths in target folder
        if (!pathExists(outputPath + 'css')) {
            fs.mkdirSync(outputPath + 'css');
        }

        if (!pathExists(outputPath + 'js')) {
            fs.mkdirSync(outputPath + 'js');
        }

        // Copy css and js files
        glob('css/**/*.css', {
            cwd: __dirname
        }, function(err, files) {
            files.forEach(function (file) {
                fs.createReadStream(__dirname + '/' + file).pipe(
                    fs.createWriteStream(outputPath + file)
                );
            });
        });

        glob('js/**/*.js', {
            cwd: __dirname
        }, function(err, files) {
            files.forEach(function (file) {
                fs.createReadStream(__dirname + '/' + file).pipe(
                    fs.createWriteStream(outputPath + file)
                );
            });
        });
    });

}

module.exports = style;
