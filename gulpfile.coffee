clean = require 'gulp-clean'
browserify = require 'gulp-browserify'
gulp = require 'gulp'
runSequence = require 'run-sequence'


gulp.task 'default', ['build']

gulp.task 'build', ->
  return runSequence 'clean', ['style', 'static', 'src', 'lib']

gulp.task 'clean', ->
  return gulp.src('build/', read: false)
    .pipe(clean())

gulp.task 'lib', ->
  return gulp.src('lib/*.js')
    .pipe(gulp.dest('build/'))

gulp.task 'src', ->
  return gulp.src('src/game.js')
    .pipe(browserify({
        insertGlobals : true,
        debug : true
      }))
    .pipe(gulp.dest('build/'))

gulp.task 'static', ->
  return gulp.src("static/index.html")
    .pipe(gulp.dest('build/'))

gulp.task 'style', ->
  return gulp.src('style/style.css')
    .pipe(gulp.dest('build/'))
