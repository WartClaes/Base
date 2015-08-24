gulp = require 'gulp'

config = require './config'

rimraf = require 'rimraf'
plumber = require 'gulp-plumber'

coffee = require 'gulp-coffee'
sourcemaps = require 'gulp-sourcemaps'
coffeelint = require 'gulp-coffeelint'

sass = require 'gulp-sass'
scsslint = require 'gulp-scss-lint'
autoprefixer = require 'gulp-autoprefixer'

jade = require 'gulp-jade'

server = require 'gulp-server-livereload'

usemin = require 'gulp-usemin'
uglify = require 'gulp-uglify'
minifyHtml = require 'gulp-minify-html'
minifyCss = require 'gulp-minify-css'
rev = require 'gulp-rev'

# Clean temp and dist folders
gulp.task 'clean', ->
  rimraf.sync config.dirs.tmp

# Coffee copy
gulp.task 'coffee-copy', ->
  gulp.src config.coffee.tmp + '**/*.js', { base: config.coffee.tmp }
    .pipe gulp.dest config.coffee.dist

# Coffee script
gulp.task 'coffee-parser', ->
  gulp.src config.coffee.src
    .pipe coffee()
    .pipe sourcemaps.write()
    .pipe gulp.dest config.coffee.tmp

# Coffee script sourcemaps
gulp.task 'coffee-sourcemaps', ->
  gulp.src config.coffee.src
    .pipe sourcemaps.init()
    .pipe coffee()
    .pipe sourcemaps.write()
    .pipe gulp.dest config.coffee.tmp

# Coffee script linter
gulp.task 'coffee-lint', ->
  gulp.src config.coffee.src
    .pipe plumber()
    .pipe coffeelint()
    .pipe coffeelint.reporter()


# SCSS copy
gulp.task 'scss-copy', ->
  gulp.src config.scss.tmp + '**/*.css', { base: config.scss.tmp }
    .pipe gulp.dest config.scss.dist

# SCSS
gulp.task 'scss-parser', ->
  gulp.src config.scss.src
    .pipe plumber()
    .pipe sourcemaps.init()
    .pipe sass()
    .pipe autoprefixer
      browsers: config.browsers
      cascade: false
    .pipe sourcemaps.write()
    .pipe gulp.dest config.scss.tmp

# SCSS lint
gulp.task 'scss-lint', ->
  gulp.src config.scss.src
    .pipe scsslint
      config: 'scss-lint.yml'


# jade
gulp.task 'jade-parser', ->
  gulp.src config.jade.src
    .pipe jade
      pretty: true
    .pipe gulp.dest config.jade.tmp


# watch
gulp.task 'watch', ->
  gulp.watch config.coffee.src, ['coffee']
  gulp.watch config.scss.src, ['scss']
  gulp.watch config.jade.src, ['jade']


# serve
gulp.task 'server', ->
  gulp.src config.jade.dist
    .pipe server
      livereload: true
      open: true

# usemin
gulp.task 'usemin', ->
  gulp.src config.jade.tmp + '*.html'
      .pipe usemin
        css: [minifyCss(), 'concat']
        html: [minifyHtml(
          empty: true
        )]
        js: [uglify(), rev()]
        inlinejs: [uglify()]
        inlinecss: [minifyCss(), 'concat']
      .pipe gulp.dest config.jade.dist

# Taks
gulp.task 'default', ['serve']

gulp.task 'serve', ['clean', 'coffee', 'scss', 'jade', 'usemin'], ->
  gulp.start 'server', 'watch'

gulp.task 'coffee', ['coffee-lint', 'coffee-sourcemaps', 'coffee-parser'], ->
  gulp.start 'coffee-copy'

gulp.task 'scss', ['scss-lint', 'scss-parser'], ->
  gulp.start 'scss-copy'

gulp.task 'jade', ->
  gulp.start 'jade-parser', 'usemin'