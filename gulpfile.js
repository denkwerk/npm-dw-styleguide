var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var livereload = require('gulp-livereload');

gulp.task( 'concat-js', function() {
    return gulp.src(
        [
            './src/js/sg-scripts/sg-scripts-content-btns.js',
            './src/js/sg-scripts/iframe.js',
            './src/js/sg-scripts/base.js',
            './src/js/sg-scripts/sticky-header.js',
            './src/js/sg-scripts/toggle-btns.js'
        ]
    )
        .pipe( concat( 'sg-scripts.js' ) )
        .pipe( gulp.dest( './dist/js/' ) );
} );

gulp.task( 'concat-js-prio', function() {
    return gulp.src(
        [
            './src/js/sg-scripts-prio/helper.js',
            './src/js/sg-scripts-prio/navigation.js'
        ]
    )
        .pipe( concat( 'sg-priority.js' ) )
        .pipe( gulp.dest( './dist/js/' ) );
} );

gulp.task( 'concat-css', function() {
    return gulp.src( [
        './src/css/sg-style/base.css',
        './src/css/sg-style/fonts.css',
        './src/css/sg-style/typography.css',
        './src/css/sg-style/sections.css',
        './src/css/sg-style/section-buttons.css',
        './src/css/sg-style/navigation.css',
        './src/css/sg-style/linklist.css',
        './src/css/sg-style/spinner.css',
        './src/css/sg-style/custom-checkboxes.css'
    ] )
        .pipe( concat( 'sg-style.css' ) )
        .pipe( gulp.dest( './dist/css/' ) );
} );

gulp.task( 'watch-js', function() {
    return gulp.watch( './src/js/sg-scripts/*.js', gulp.parallel('concat-js' ) );
} );

gulp.task( 'watch-js-prio', function() {
    return gulp.watch( './src/js/sg-scripts-prio/*.js', gulp.parallel( 'concat-js-prio' ) );
} );

gulp.task( 'watch-css', function() {
    return gulp.watch( './src/css/sg-style/*.css', gulp.parallel('concat-css' ) );
} );

gulp.task( 'watch',
    gulp.parallel( 'watch-js', 'watch-js-prio', 'watch-css' )
);

gulp.task( 'default',
    gulp.series( 'watch' )
);

gulp.task( 'build',
    gulp.series( 'concat-js', 'concat-js-prio', 'concat-css' )
);