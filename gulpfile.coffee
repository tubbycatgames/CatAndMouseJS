browserify  = require 'browserify'
buffer      = require 'vinyl-buffer'
clean       = require 'gulp-clean'
gulp        = require 'gulp'
gulpTypings = require 'gulp-typings'
runSequence = require 'run-sequence'
serve       = require 'gulp-serve'
source      = require 'vinyl-source-stream'
sourcemaps  = require 'gulp-sourcemaps'
stylus      = require 'gulp-stylus'
tsify       = require 'tsify'
uglify      = require 'gulp-uglify'


paths =
  build:   'build/'
  index:   'index.html'
  lib:     'lib/*.js'
  media:   ['media/audio/*', 'media/sprites/*']
  root:    './'
  src:     'src/**/*.ts'
  srcMain: 'src/game.ts'
  srcOut:  'src/game.js'
  style:   'style/style.styl'
  typings: 'typings.json'

gulp.task 'default', ['serve']

gulp.task 'build', ->
  return runSequence ['clean', 'typings'],
                     ['index', 'lib', 'media', 'src', 'style']

gulp.task 'clean', ->
  return gulp.src paths.build, read: false
    .pipe clean()

gulp.task 'index', -> return copyToBuild paths.index, paths.root, paths.build

gulp.task 'lib', ->   return copyToBuild paths.lib, paths.root, paths.build

gulp.task 'media', -> return copyToBuild paths.media, paths.root, paths.build

gulp.task 'serve', ['build', 'watch'], serve(root: ['build'], port: 8080)

gulp.task 'src', ->
  return browserify(
      debug: true
      entries: [paths.srcMain]
    ).plugin tsify, noImplicitAny: true
    .bundle()
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
  gulp.watch paths.lib,     ['lib']
  gulp.watch paths.media,   ['media']
  gulp.watch paths.src,     ['src']
  gulp.watch paths.style,   ['style']
  gulp.watch paths.typings, ['typings']

copyToBuild = (src, base, dest) ->
  return gulp.src src, base: base
    .pipe gulp.dest dest
