browserify = require 'gulp-browserify'
clean = require 'gulp-clean'
gulp = require 'gulp'
runSequence = require 'run-sequence'
serve = require 'gulp-serve'


paths =
  build: 'build/'
  lib: 'lib/*.js'
  media: ['media/audio/*', 'media/sprites/*']
  root: './'
  src: 'src/*.js'
  static: 'static/index.html'
  style: 'style/*.css'

gulp.task 'default', ['serve']

gulp.task 'build', ->
  return runSequence 'clean', ['style', 'static', 'src', 'lib', 'media']

gulp.task 'clean', ->
  return gulp.src(paths.build, read: false)
    .pipe(clean())

gulp.task 'lib', -> return copyToBuild(paths.lib, paths.build, paths.root)

gulp.task 'media', -> return copyToBuild(paths.media, paths.build, paths.root)

gulp.task 'serve', ['build', 'watch'], serve(root: ['build'], port: 8080)

gulp.task 'src', ->
  return gulp.src(paths.src)
    .pipe(browserify(insertGlobals : true, debug : true))
    .pipe(gulp.dest(paths.build))

gulp.task 'static', -> copyToBuild(paths.static, paths.build)

gulp.task 'style', -> copyToBuild(paths.style, paths.build)

gulp.task 'watch', ->
  gulp.watch paths.lib, ['lib']
  gulp.watch paths.media, ['media']
  gulp.watch paths.src, ['src']
  gulp.watch paths.static, ['static']
  gulp.watch paths.style, ['style']

###
# Copy files to build destination
#
# @param {String} src Pattern to copy files from
# @param {String} dest Directory to copy files to
# @param {String} base Base for copying directory structure (Optional)
###
copyToBuild = (src, dest, base) ->
  return gulp.src(src, base: base)
    .pipe(gulp.dest(dest))
