var gulp = require('gulp'),
    connect = require('connect'),
    http = require('http'),
    opn = require('opn'),
    rimraf = require('rimraf'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    useref = require('gulp-useref'),
    filter = require('gulp-filter'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    config = {
        app: './',
        dist: 'build',
        port: 9000,
        scripts: function () {
            return this.app + '/js/*.js';
        },
        styles: function () {
            return this.app + '/sass';
        },
        images: function () {
            return this.app + '/img';
        }
    };

config.scripts.apply(config);
config.styles.apply(config);
config.images.apply(config);

gulp.task('clean', function(cb) {
    rimraf(config.dist, cb);
});

gulp.task('lint', function() {
    var path = config.scripts();

    return gulp.src(path)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    var dir = config.styles();

    return gulp.src(dir + '/**/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(config.app + '/css'));
});

gulp.task('images', function(){
    return gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}')
        .pipe(cache(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.app + '/img'));
});

gulp.task('misc', function(){
    return gulp.src([
            config.app + '/*.{ico,png,txt}',
            config.app + '/.htaccess'
        ])
        .pipe(gulp.dest(config.dist));
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(config.styles() + '/**/*.scss', ['sass']);

  // Watch .js files
  gulp.watch(config.scripts() + '/**/*.js', ['lint']);

  // Watch image files
  gulp.watch(config.images() + '/**/*', ['images']);

});

// Default
gulp.task('default', function() {
    gulp.start('watch');
});

gulp.task('build', ['clean'], function(){
    gulp.start('images', 'fonts', 'misc', 'html');
});