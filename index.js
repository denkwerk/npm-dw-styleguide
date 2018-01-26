'use strict';
var styleNunjucks = require('./node-js/setup');

//read html files
function style(options, callback) {
    styleNunjucks( options, callback );

}

module.exports = style;
