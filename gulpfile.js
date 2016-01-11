var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat')

// lint js files
gulp.task('jshint', function () {
  return gulp.src('./src/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
})

// build css from source/sass
gulp.task('build-css', function () {
  return gulp.src('./src/scss/**/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init()) // Process the original sources
    .pipe(sass()) // Using gulp-sass
  .pipe(sourcemaps.write()) // Add the map to modified source
  .pipe(autoprefixer('last 2 versions')) // adds prefixes for previous 2 version support
  .pipe(gulp.dest('./public/stylesheets'));
});

// minify into public/javascript/bundle.js from source/javascript
gulp.task('build-js', function () {
  return gulp.src('src/javascript/**/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/javascript'));
})


// watch changes in sass and js
gulp.task('watch', function () {
  gulp.watch('./src/javascript/*.js', ['build-js']);
  gulp.watch('/src/javascript/**/*.js', ['jshint']);
  gulp.watch('src/scss/**/*.scss', ['build-css']);
});

gulp.task('default', ['jshint', 'build-js', 'build-css', 'watch'])
