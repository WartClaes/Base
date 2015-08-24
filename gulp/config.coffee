module.exports =
  dirs:
    tmp: '.tmp'
    dist: 'dist'
  browsers: ['last 2 versions']
  maps: '.maps'
  coffee:
    src: './src/scripts/**/*.coffee'
    tmp: './.tmp/scripts/'
    dist: './dist/scripts/'
  scss:
    src: './src/styles/**/*.scss'
    tmp: './.tmp/styles/'
    dist: './dist/styles/'
  jade:
    src: './src/views/**/*.jade'
    tmp: './.tmp/views/'
    dist: './dist/'
