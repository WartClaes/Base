var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    rimraf = require('rimraf'),
    config = {
        app: './',
        dist: 'build',
        port: 9000,
        scripts: function () {
            return this.app + '/js';
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
    var dir = config.scripts();

    return gulp.src([dir + '/*.js', dir + '/helpers/*.js', dir + '!/vendor/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

gulp.task('uglify', function () {
    var dir = config.scripts();

    return gulp.src(dir)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe(gulp.dest(config.dist + '/js'));
});

gulp.task('compass', function() {
    var dir = config.styles();

    return gulp.src(dir + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            config_file: './config.rb',
            css: config.app + '/css',
            sass: config.app + '/sass',
            style: 'expanded'
        }))
        .pipe(gulp.dest(config.app + '/css'));
});

gulp.task('minify-css', function () {
    var dir = config.styles();
    
    return gulp.src(dir + '/**/*.scss')
        .pipe($.plumber())
        .pipe($.compass({
            config_file: './config.rb',
            css: config.app + '/css',
            sass: config.app + '/sass',
            style: 'compressed'
        }))
        .pipe(gulp.dest(config.dist + '/css'));
});

gulp.task('images', function(){
   return gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,svg}')
       .pipe($.cache($.imagemin({
           optimizationLevel: 5,
           progressive: true,
           interlaced: true
       })))
       .pipe(gulp.dest(config.app + '/img'));
});

gulp.task('images-copy', function(){
    gulp.src(config.app + '/img/{,*/}*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest(config.dist + '/img'));
});


gulp.task('minify-end', function(){
    return gulp.src(config.app)
        .pipe($.notify({
            message: 'Build task complete'
        }));
})

gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch(config.styles() + '/**/*.scss', ['compass']);

    // Watch .js files
    gulp.watch(config.scripts() + '/**/*.js', ['lint']);

    // Watch image files
    gulp.watch(config.images() + '/**/*', ['images']);

});

// Default
gulp.task('default', ['compass'], function() {
    gulp.start('watch');
});

gulp.task('build', ['clean', 'images'], function(){
    gulp.start('images-copy', 'minify-css', 'uglify', 'minify-end');
});