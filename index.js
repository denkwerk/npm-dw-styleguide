var glob = require('glob');
var fs = require('fs');
var nunjucks = require('nunjucks');

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));

//read html files
function style(inputPath, docPath, outputPath) {
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
        });

        env.addGlobal('renderSingle', function(inputPath) {});

        var full = env.render('full.njk', {
            title: 'Full styleguide',
            elements: fileContents,
            navigation: navTree
        });

        if (!fs.existsSync(outputPath)) {
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
                    if(!fs.existsSync(outputPath + p)) {
                        fs.mkdirSync(outputPath + p);
                    }
                }
            });

            fs.writeFile(outputPath + file.path, reduced);
        })
    })
}

module.exports = style;
