browserify  = require 'browserify'
buffer      = require 'vinyl-buffer'
clean       = require 'gulp-clean'
download    = require 'gulp-download'
gm          = require 'gulp-gm'
gulp        = require 'gulp'
gulpTypings = require 'gulp-typings'
rename      = require 'gulp-rename'
runSequence = require 'run-sequence'
serve       = require 'gulp-serve'
source      = require 'vinyl-source-stream'
sourcemaps  = require 'gulp-sourcemaps'
stylus      = require 'gulp-stylus'
tsify       = require 'tsify'
tslintify   = require 'tslintify'
uglify      = require 'gulp-uglify'


libraryVersion = '2.6.2'
paths =
  build:   'build/'
  index:   'index.html'
  lib:     'lib/'
  media:   ['media/audio/*', 'media/sprites/*']
  mouse:   ['media/sprites/Mouse.png']
  root:    './'
  src:     'src/**/*.ts'
  srcMain: 'src/game.ts'
  srcOut:  'src/game.js'
  style:   'style/style.styl'
  typings: 'typings.json'

gulp.task 'default', ['serve']

gulp.task 'build', ->
  return runSequence ['clean', 'typings'],
                     ['create-mice', 'index', 'lib', 'media', 'src', 'style']

gulp.task 'clean', ->
  return gulp.src paths.build, read: false
    .pipe clean()

gulp.task 'create-mice', ->
  convertMouse('#000000', 'Black')
  convertMouse('#663300', 'Brown')
  convertMouse('#F0DC82', 'Buff')
  convertMouse('#FF0000', 'Dead')
  convertMouse('#808080', 'Grey')
  convertMouse('#FFFFFF', 'White')

gulp.task 'index', -> return copyToBuild paths.index

gulp.task 'lib', ->
  download 'https://github.com/photonstorm/phaser/releases/download/' +
      'v' + libraryVersion + '/phaser.min.js'
    .pipe gulp.dest(paths.build + paths.lib)

gulp.task 'media', -> return copyToBuild paths.media

gulp.task 'serve', ['build', 'watch'], serve(root: ['build'], port: 8080)

gulp.task 'src', ->
  return browserify(
      debug: true
      entries: [paths.srcMain]
    ).plugin tslintify, format: "stylish"
    .plugin tsify
    .on 'error', (err) ->
      console.error(err.toString())
      @emit('end')
    .bundle()
    .on 'error', (err) ->
      console.error(err.toString())
      @emit('end')
    .pipe source paths.srcOut
    .pipe buffer()
    .pipe sourcemaps.init loadMaps: true
    .pipe uglify()
    .pipe sourcemaps.write paths.root
    .pipe gulp.dest paths.build

gulp.task 'style', ->
  return gulp.src paths.style, base: paths.root
    .pipe stylus()
    .pipe gulp.dest paths.build

gulp.task 'typings', -> return gulp.src(paths.typings).pipe gulpTypings()

gulp.task 'watch', ->
  gulp.watch paths.index,   ['index']
  gulp.watch paths.media,   ['media']
  gulp.watch paths.src,     ['src']
  gulp.watch paths.style,   ['style']
  gulp.watch paths.typings, ['typings']

copyToBuild = (src) ->
  return gulp.src src, base: paths.root
    .pipe gulp.dest paths.build

convertMouse = (color, name) ->
  return gulp.src paths.mouse, base: paths.root
    .pipe gm((imFile) ->
      return imFile
        .fill color
        .opaque '#FFFFFF'
      , imageMagick: true)
    .pipe rename (path) ->
      path.basename = name + path.basename
    .pipe gulp.dest paths.build
