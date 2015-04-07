var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    config = {
        app: './',
        dist: 'build',
        port: 9000,
        browsers: ['last 2 versions'],
        scripts: function(){
            return this.app + '/js';
        },
        styles: function(){
            return this.app + '/sass';
        },
        images: function(){
            return this.app + '/img';
        }
    };

config.scripts.apply(config);
config.styles.apply(config);
config.images.apply(config);

function onError(err) {
    console.log(err);
}


/**
 * Clean dist and temp folder
 */
gulp.task('clean', function(cb) {
    rimraf.sync(config.dist, cb);
});


/**
 * Remove node_modules folder
 */
gulp.task('destruct', function(cb) {
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
 * Hint projects javascript files
 */
gulp.task('lint', function() {
    var dir = config.scripts();

    return gulp.src([dir + '/*.js', dir + '/helpers/*.js', dir + '!/vendor/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});


/**
 * Minify images
 */
gulp.task('images', function(){
    return gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,svg}')
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
    gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,svg}')
        .pipe(gulp.dest(config.dist + '/img'));
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
    var dir = config.styles();

    return gulp.src(dir + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init({debug: true}))
            .pipe($.sass())
            .pipe($.autoprefixer({
                browsers: config.browsers,
                cascade: false
            }))
        .pipe($.sourcemaps.write('../.maps'))
        .pipe(gulp.dest(config.app + '/css'));
});


/**
 * Minify javascript files
 */
gulp.task('uglify', function () {
    var dir = config.scripts();

    return gulp.src(dir)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(config.dist + '/js'));
});


/**
 * Set watch tasks
 */
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch(config.styles() + '/**/*.scss', ['sass']);

    // Watch .js files
    gulp.watch(config.scripts() + '/**/*.js', ['lint']);

    // Watch image files
    gulp.watch(config.images() + '/**/*', ['images']);

});


/**
 * Set combined tasks
 */
// Default
gulp.task('default', ['sass'], function() {
    gulp.start('watch');
});

//TODO: 'minify-css'
gulp.task('build', ['images', 'sass'], function(){
    gulp.start('images-copy', 'end');
});