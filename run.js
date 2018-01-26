/**
 * Created by fuekermann on 19.01.2018.
 */
var styleguide = require('./index');

var options = {
    // inputPath: 'frontend/src/simple/html',
    inputPath: 'frontend/src/markup-src-org/html',
    outputPath: 'frontend/dist/styleguide',
    webPath : '/frontend/dist/styleguide',
    docPath : 'frontend/src/markup-src-org/html',
    fullLevelTemplate: 'full-level.njk',
    stylesheets: ['/frontend/dist/css/home.css'],
    headEndCode: '<script>console.log("headEndCode");</script>',
    // bodyEndCode: 'BODYENDCODE<script>console.log("bodyEndCode");</script>'
    bodyStartCode: '<div class="site">',
    bodyEndCode: '<script data-main="/frontend/dist/js/app/main.js" src="/frontend/dist/js/app/vendor/require.js"></script></div>'

};
var callback = function() {
    console.log( 'callback styleguide' );
}

styleguide(options, callback);