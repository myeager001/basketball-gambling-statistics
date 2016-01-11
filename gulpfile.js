var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch'])

// lint js files
gulp.task('jshint', function () {
  return gulp.src('./src/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
})

// build css from source/sass
gulp.task('build-css', function () {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(sourcemaps.init()) // Process the original sources
    .pipe(sass()) // Using gulp-sass
  .pipe(sourcemaps.write()) // Add the map to modified source
  .pipe(gulp.dest('./public/stylesheets'));
});

// minify into public/javascript/bundle.js from source/javascript
gulp.task('build-js', function () {
  return gulp.src('src/javascript/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/javascript'))
})


// watch changes in sass and js
gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', ['build-js']);
  gulp.watch('/src/javascript/**/*.js', ['jshint']);
  gulp.watch('src/scss/**/*.scss', ['build-css'])
});
