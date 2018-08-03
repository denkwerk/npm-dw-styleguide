'use strict';
var styleNunjucks = require('./generate/setup');

//read html files
function style(options, callback) {
    styleNunjucks( options, callback );

}

module.exports = style;
