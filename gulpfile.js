var gulp = require('gulp'),

   rimraf = require('rimraf'),
   jshint = require('gulp-jshint'),
   uglify = require('gulp-uglify'),
   sass = require('gulp-sass'),
   minifycss = require('gulp-minify-css'),
   imagemin = require('gulp-imagemin'),
   cache = require('gulp-cache'),
   plumber = require('gulp-plumber'),
   notify = require('gulp-notify'),

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

gulp.task('uglify', function () {
   var dir = config.styles();

   return gulp.src(config.app + '/js')
       .pipe(plumber())
       .pipe(uglify())
       .pipe(gulp.dest(config.dist + '/js'));
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

gulp.task('minify-css', function () {
   var dir = config.styles();

   return gulp.src(config.app + '/css')
       .pipe(plumber())
       .pipe(minifycss())
       .pipe(gulp.dest(config.dist + '/css'));
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

gulp.task('images-copy', function(){
   gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}')
   .pipe(gulp.dest(config.dist + '/img'));
});


gulp.task('minify-end', function(){
    return gulp.src(config.app)
        .pipe(notify({ message: 'Build task complete' }));
})

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

gulp.task('build', ['clean', 'images'], function(){
   gulp.start('images-copy', 'minify-css', 'uglify', 'minify-end');
});