var styleguide = require('./index');

var options = {
    inputPath: 'demo-src/html/elements',
    // inputPath: 'dist/markup-src-org/html',
    inputPagesPath: 'dist/styleguide/pages',// has to be on or below webPath root level- reason: It's linked on directly
    //docPath : 'demo-src/html/elements', REMOVED, TODO: DISCUSS, is it necessary?

    outputPath: 'dist/styleguide',

    webPath : '/dist/styleguide',

    // stylesheets: ['/dist/css/home.css'],
    // headEndCode: '<script>console.log("headEndCode");</script>',
    // bodyStartCode: '<div class="site">',
    // bodyEndCode: '<script data-main="/dist/js/app/main.js" src="/dist/js/app/vendor/require.js"></script></div>'

    templateStyleguideStylesheetTheme: '/demo-src/css/sg-custom-theme.css',

    //templateSrcStylesheets: ['/dist/css/home.css'],
    templateSrcStylesheets: ['/demo-src/css/main.css'],

    templateSrcHeadEndCode: '<script>console.log("headEndCode");</script>',
    templateSrcBodyStartCode: '<div class="site">',
    templateSrcBodyEndCode: '<script data-main="/dist/js/app/main.js" src="/dist/js/app/vendor/require.js"></script></div>'

};
var callback = function() {
    console.log( 'callback styleguide' );
}

styleguide(options, callback);