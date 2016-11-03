var glob = require('glob');
var fs = require('fs');
var nunjucks = require('nunjucks');
var showdown = require('showdown');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

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
    var inputPath = options.inputPath,
        docPath = options.docPath,
        outputPath = options.outputPath;

    glob('**/*.html', {
        cwd: inputPath
    }, function(err, files) {
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

        files.forEach(function(file, i, ar) {
            var split = file.split("/");

            var contents = pathExists(inputPath + file) ?
                fs.readFileSync(inputPath + file) : '';
            var doc = (docPath && pathExists(docPath + file.split('.')[0] + '.md')) ?
                mdConverter.makeHtml(
                    fs.readFileSync(docPath + file.split('.')[0] + '.md').toString()
                ) :
                'Bitte Dokumentation für ' + file + ' anlegen';
            fileContents.push({
                name: split[split.length - 1]
                    .split(".")[file.split(".").length - 2],
                content: contents.toString(),
                doc: doc,
                path: file
            })
        });

        env.addGlobal('renderSingle', function(inputPath) {});

        var full = env.render('full.njk', {
            title: 'Full styleguide',
            elements: fileContents,
            navigation: navTree
        });

        if (!pathExists(outputPath)) {
            fs.mkdirSync(outputPath);
        }

        fs.writeFile(outputPath + 'index.html', full);

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

                    if(!pathExists(outputPath + p)) {
                        fs.mkdirSync(outputPath + p);
                    }
                }
            });

            fs.writeFile(outputPath + file.path, reduced);
        });

        if (!pathExists(outputPath + 'css')) {
            fs.mkdirSync(outputPath + 'css');
        }

        if (!pathExists(outputPath + 'js')) {
            fs.mkdirSync(outputPath + 'js');
        }

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
