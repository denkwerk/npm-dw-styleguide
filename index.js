var glob = require('glob')
var fs = require('fs');
var nunjucks = require('nunjucks');
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader('templates'));
NODE_DEBUG = fs, nunjucks, glob;
var navi = '';
var inputPath = '../../htdocs/frontend/dist/npm-dw-styleguide/markup/';
var inputPath = 'markup-full/';
if (process.env.npm_config_input) {
    inputPath = process.env.npm_config_input;
}
var docPath = '../../htdocs/frontend/dist/npm-dw-styleguide/doc/'
var docPath = 'doc/'
if (process.env.npm_config_doc) {
    docPath = process.env.npm_config_doc;
}
var outputPath = '../../htdocs/frontend/dist/npm-dw-styleguide/reduced/';
var outputPath = 'reduced/';
if (process.env.npm_config_output) {
    outputPath = process.env.npm_config_output;
}

//read html files
glob('**/*.html', {
    cwd: inputPath
}, function(err, files) {
    if (err) {
        return log(er);
    }
    var allTypes = files.map(function(file) {
        return file.match(/^([\w\d-_]+)\//)[1];
    }).reduce(function(pre, cur) {
        if (!~pre.indexOf(cur)) {
            pre.push(cur);
        }
        return pre;
    }, []);
    //build structure for navigation
    var navTree = [];

    var buildNav = function(splitPath, children) {
        var rawItem = splitPath.shift();
        if (splitPath.length === 0) {
            children.push({
                name: rawItem,
                link: rawItem.split('.')[0]
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
module.exports = 'npm-dw-styleguide';
