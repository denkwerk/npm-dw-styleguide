# npm-dw-styleguide

> Node package for generating a static file styleguide from markup

This package is inspired by the [Styleguide Boilerplate](https://bjankord.github.io/Style-Guide-Boilerplate/). The goal
is to provide a styleguide that renders to static HTML files.

Modern frontend development mostly uses node.js for build-tasks so it was obvious to implement such a tool using node.js.

## Installation

There are two types of installations:

- As a local module:
  `npm install --save npm-dw-styleguide`
- As a global module:
  `npm install -g npm-dw-styleguide`
  
## Usage

When using the styleguide there are two ways of usage: as a node-package or as a cli-application.

### CLI

Using the `npm-dw-styleguide` via the cli you need to install it as a global module.

There is a help-page integrated:

```
dw-styleguide CLI

  Usage:
    dw-styleguide [opts] input-path output-path
    dw-styleguide [opts] -o|--output output-path input-path

  Avalilable Options:
    -o, --output            The output path
    -d, --documentation     The documentation path
    -s, --stylesheets       Array of stylesheets
        --templates-path    The root of the template files
        --full-template     The template file for the full styleguide page
        --reduced-template  The template file for the reduced styleguide pages
        --doc-not-found     The template string for the documentation not found hint
        --web-root          The web-root of the styleguide
    -h, --help              This help page
```

### As a node-package

Using the styleguide as a node.js package is really easy. Require the package and call the function with options.

```javascript
var dwStyleguide = require('dw-styleguide');

dwStyleguide({
  inputPath: 'markup',
  outputPath: 'styleguide'
});
```

There are a bunch of options you can use:

- `inputPath`: The path where all the markup can be found. __This is required.__
- `outputPath`: The path where the rendered files will be put. __This is required.__
- `docPath`: The path where all documentation files can be found.
- `stylesheets`: The stylesheets to include.
- `templatesPath`: The root folder for the nunjucks-templates
- `fullTemplate`: The filename/relative path to the full styleguide template
- `reducedTemplate`: The filename/relative path to the reduced (single view) template
- `docNotFoundTemplate`: The template rendered when no documentation file is found
- `webPath`: The relative path to the styleguide from the web-root

### As a grunt-plugin

There is a simple grunt-wrapper for this module. For more options refer to the Plugin: [grunt-dw-styleguide](https://www.npmjs.com/package/grunt-dw-styleguide)
