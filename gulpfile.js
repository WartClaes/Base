var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    app = './',
    config = {
        app: './',
        dist: 'build',
        port: 9000,
        browsers: ['last 2 versions'],
        scripts: app + '/js/*.js',
        styles: app + '/sass/**/*.scss',
        images: app + '/img/{,*/}*.{png,jpg,jpeg,gif,svg}'
    };

/**
 * Autoprefixer
 */
gulp.task('autoprefixer', function(){
    return gulp.src('dist/css/*.css')
        .pipe($.autoprefixer({
            browsers: config.browsers,
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));
})

/**
 * Clean dist and temp folder
 */
gulp.task('clean', function(cb) {
    rimraf.sync(config.dist, cb);
});


/**
 * Remove node_modules folder
 */
gulp.task('destruct', ['clean'], function(cb) {
    rimraf.sync('node_modules', cb);
});


/**
 * Notify on build end
 */
gulp.task('end', function(){
    return gulp.src(config.app)
        .pipe($.notify({
            message: 'Build task complete'
        }));
});


/**
 * Minify images
 */
gulp.task('images', function(){
    return gulp.src(config.images)
        .pipe($.cache($.imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.app + '/img'));
});


/**
 * Copy images into distribution folder
 */
gulp.task('images-copy', function(){
    gulp.src(config.images)
        .pipe(gulp.dest(config.dist + '/img'));
});


/**
 * Hint projects javascript files
 */
gulp.task('jslint', function() {
    return gulp.src(config.scripts)
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});


/**
 * Minify CSS files
 */
gulp.task('minify-css', function () {
    return gulp.src(config.app + '/css')
        .pipe($.plumber())
        .pipe($.minifyCss())
        .pipe(config.dist + '/css');
});


/**
 * Sass task
 */
gulp.task('sass', function() {
    return gulp.src(config.styles)
        .pipe($.plumber())
        .pipe($.sourcemaps.init({
                debug: true
            }))
            .pipe($.sass())
            .pipe($.autoprefixer({
                browsers: config.browsers,
                cascade: false
            }))
        .pipe($.sourcemaps.write('../.maps'))
        .pipe(gulp.dest(config.app + '/css'));
});

/**
 * SCSS lint task
 */
gulp.task('scsslint', function(){
    gulp.src(config.styles)
        .pipe($.scssLint({
            'config': 'scsslint.yml',
        }));
});


/**
 * Minify javascript files
 */
gulp.task('uglify', function () {
    return gulp.src(config.scripts)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(config.dist + '/js'));
});


/**
 * Set watch tasks
 */
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch(config.styles, ['scsslint', 'sass']);

    // Watch .js files
    gulp.watch(config.scripts, ['jslint']);

    // Watch image files
    gulp.watch(config.images, ['images']);

});


/**
 * Set combined tasks
 */
// Default
gulp.task('default', ['jslint', 'scsslint', 'sass'], function() {
    gulp.start('watch');
});

//TODO: 'minify-css'
gulp.task('build', ['images', 'sass'], function(){
    gulp.start('autoprefixer', 'images-copy', 'end');
});
