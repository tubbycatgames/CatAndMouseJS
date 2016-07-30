browserify  = require 'browserify'
buffer      = require 'vinyl-buffer'
clean       = require 'gulp-clean'
gulp        = require 'gulp'
gulpTypings = require 'gulp-typings'
runSequence = require 'run-sequence'
serve       = require 'gulp-serve'
source      = require 'vinyl-source-stream'
sourcemaps  = require 'gulp-sourcemaps'
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
  style:   'style/*.css'
  typings: 'typings.json'

gulp.task 'default', ['serve']

gulp.task 'build', ->
  return runSequence 'clean', 'typings',
                     ['index', 'lib', 'media', 'src', 'style']

gulp.task 'clean', ->
  return gulp.src paths.build, read: false
    .pipe clean()

gulp.task 'index', -> return copyToBuild paths.index, paths.build, paths.root

gulp.task 'lib', -> return copyToBuild paths.lib, paths.build, paths.root

gulp.task 'media', -> return copyToBuild paths.media, paths.build, paths.root

gulp.task 'serve', ['build', 'watch'], serve(root: ['build'], port: 8080)

gulp.task 'src', ->
  return browserify(
      debug: true
      entries: [paths.srcMain]
    ).plugin tsify, noImplicitAny: true
    .bundle()
    .pipe source 'src/game.js'
    .pipe buffer()
    .pipe sourcemaps.init loadMaps: true
    .pipe uglify()
    .pipe sourcemaps.write './'
    .pipe gulp.dest paths.build

gulp.task 'style', -> return copyToBuild paths.style, paths.build, paths.root

gulp.task 'typings', -> return gulp.src(paths.typings).pipe gulpTypings()

gulp.task 'watch', ->
  gulp.watch paths.lib, ['lib']
  gulp.watch paths.media, ['media']
  gulp.watch paths.src, ['src']
  gulp.watch paths.index, ['index']
  gulp.watch paths.style, ['style']

###
# Copy files to build destination
#
# @param {String} src Pattern to copy files from
# @param {String} dest Directory to copy files to
# @param {String} base Base for copying directory structure (Optional)
###
copyToBuild = (src, dest, base) ->
  return gulp.src src, base: base
    .pipe gulp.dest dest
