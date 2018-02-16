var styleguide = require('./index');

var options = {

    inputPath: 'demo-src/html/elements',
    inputPagesPath: 'demo-src/html/pages',// has to be on or below webPath root level- reason: It's linked on directly
    outputPath: 'demo-dist/styleguide',
    webPath : '/demo-dist/styleguide',
    templateStyleguideStylesheet: 'dist/css/sg-style.css',
    templateSrcStylesheets: ['/demo-src/css/main.css'],
    templateSrcHeadEndCode: '<script>console.log("headEndCode");</script>',
    templateSrcPath: 'src/templates', // same as default

    // inputPath: 'frontend/dist/markup',
    // inputPagesPath: 'frontend/dist/pages',// has to be on or below webPath root level- reason: It's linked on directly
    // outputPath: 'frontend/dist/styleguide',
    // webPath : '/frontend/dist/styleguide/',
    // templateSrcStylesheets: ['/frontend/dist/css/home.css'],
    // templateSrcHeaderScripts: ['/frontend/dist/js/app/vendor/bundled/head.js'],
    // templateSrcBodyStartCode: '<div class="site">',
    // templateSrcBodyEndCode: '<script data-main="/frontend/dist/js/app/main.js" src="/frontend/dist/js/app/vendor/require.js"></script></div>'


    // no webserver (file protocol)
    // inputPath: 'demo-src/html/elements',
    // outputPath: 'dist/styleguide',
    // templateSrcStylesheets: [],
    // webPath : ''

};
var callback = function() {
    console.log( 'callback styleguide' );
}

styleguide(options, callback);