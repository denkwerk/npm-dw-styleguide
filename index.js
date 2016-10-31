var glob = require('glob');
var fs = require('fs');
var nunjucks = require('nunjucks');
var prompt = require('prompt');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));
NODE_DEBUG = fs, nunjucks, glob;
var inputPath = '../../htdocs/frontend/dist/npm-dw-styleguide/markup/';

if (process.env.npm_config_input) {
    inputPath = process.env.npm_config_input;
}
var docPath = '../../htdocs/frontend/dist/npm-dw-styleguide/doc/'
if (process.env.npm_config_doc) {
    docPath = process.env.npm_config_doc;
}
var outputPath = '../../htdocs/frontend/dist/npm-dw-styleguide/reduced/';
if (process.env.npm_config_output) {
    outputPath = process.env.npm_config_output;
}

prompt.start();

prompt.get(['inputPath', 'docPath', 'outputPath'], function(err, result) {
    if (err) {
        return onErr(err);
    }
    console.log('Command-line input received:');
    console.log('  inputPath: ' + result.inputPath);
    console.log('  docPath: ' + result.docPath);
    console.log('  Email: ' + result.outputPath);

    //set paths if user input and ad attached '/' if not prompted
    if (result.inputPath) {
        inputPath = result.inputPath;
        (inputPath.slice(-1) == '/') ? null: inputPath += '/';
    }
    if (result.docPath) {
        docPath = result.docPath;
        (docPath.slice(-1) == '/') ? null: docPath += '/';
    }
    if (result.outputPath) {
        outputPath = result.outputPath;
        (outputPath.slice(-1) == '/') ? null: outputPath += '/';
    }
    style(inputPath, docPath, outputPath);
});

function onErr(err) {
    console.log(err);
    return 1;
}

//read html files
function style(inputPath, docPath, outputPath) {
    glob('**/*.html', {
        cwd: inputPath
    }, function(err, files) {
        console.log(inputPath, docPath, outputPath);
        if (err) {
            return console.log(err);
        }
        //build structure for navigation
        var navTree = [];

        var buildNav = function(splitPath, children) {
            var rawItem = splitPath.shift();
            if (splitPath.length === 0) {
                children.push({
                    name: rawItem,
                    link: outputPath + rawItem.split('.')[0]
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
        }
        files.forEach(function(file) {
            var element = file.split('/');
            var tree = buildNav(element, navTree);
        })

        var fileContents = [];

        files.forEach(function(file, i, ar) {
            var split = file.split("/");

            var contents = fs.existsSync(inputPath + file) ?
                fs.readFileSync(inputPath + file) : '';
            var doc = (fs.existsSync(docPath + file.split('.')[0] + '.md')) ?
                fs.readFileSync(docPath + file.split('.')[0] + '.md') :
                'Bitte Dokumentation für ' + file + ' anlegen';
            fileContents.push({
                name: split[split.length - 1]
                    .split(".")[file.split(".").length - 2],
                content: contents.toString(),
                doc: doc,
                path: file
            })
        })
        env.addGlobal('renderSingle', function(inputPath) {});

        var full = env.render('full.njk', {
            title: 'Full styleguide',
            elements: fileContents,
            navigation: navTree
        });
        fs.writeFile('index.html', full);

        fs.existsSync(outputPath) ? null : fs.mkdirSync(outputPath);

        fileContents.forEach(function(file, i) {
            var reduced = env.render('reduced.njk', {
                title: 'Reduced Module ' + file.name,
                element: file
            });
            paths = file.path.split('/');
            var p = '';

            paths.forEach(function(path, i, paths) {
                if (i + 1 < paths.length) {
                    p += path + '/';
                    fs.existsSync(outputPath + p) ? null : fs.mkdirSync(outputPath + p);
                }
            })
            fs.writeFile(outputPath + file.path, reduced);
        })
    })
}
module.exports = 'npm-dw-styleguide';
