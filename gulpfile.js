var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var eslint = require('gulp-eslint');
var gulpStylelint = require('gulp-stylelint')
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postCSSPlugins = [
    autoprefixer( {browsers: [ 'last 2 versions', 'ie >= 9', 'Firefox >= 12', 'ios >= 7', 'android >= 4' ]} ),
];
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

gulp.task( 'watch-js', function() {
    return gulp.watch( './src/js/sg-scripts/*.js', gulp.parallel('concat-js' ) );
} );

gulp.task( 'watch-js-prio', function() {
    return gulp.watch( './src/js/sg-scripts-prio/*.js', gulp.parallel( 'concat-js-prio' ) );
} );

gulp.task( 'watch-scss', function() {
    return gulp.watch( './src/css/sg-style/**/*.scss', gulp.parallel('sass' ) );
} );

gulp.task( 'watch',
    gulp.parallel( 'watch-js', 'watch-js-prio', 'watch-scss' )
);

gulp.task( 'lint-js', function() {
    return gulp.src( [
        './generate/**',
        './src/js/sg-scripts/**/*.js',
        './src/js/sg-scripts-prio/**'
    ] )
        .pipe( eslint() )
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
} );

gulp.task('lint-styles', function lintCssTask() {
    return gulp
        .src('./src/css/sg-style/**/*.scss')
        .pipe(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        }));
});

gulp.task('sass', function () {
    return gulp.src('./src/css/sg-style/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(postCSSPlugins))
        .pipe( gulp.dest( './dist/css' ) )
        .pipe( gulp.dest( './demo-dist/styleguide/css' ) );
});

gulp.task( 'build',
    gulp.series( 'concat-js', 'concat-js-prio', 'sass' )
);

gulp.task( 'default',
    gulp.series( 'build', 'watch' )
);


