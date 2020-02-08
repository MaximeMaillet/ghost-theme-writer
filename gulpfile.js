var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var browserSync = require('browser-sync').create();

gulp.task('pack', function () {
  return gulp.src([
    './**',
    '!./node_modules/**',
    '!node_modules',
    '!./config',
    '!./assets/js',
    '!./assets/sass',
    '!gulpfile.js',
    '!.gitignore',
    '!package-lock.json',
    '!routes.yaml'
  ])
    .pipe(zip('ghost-theme-writer.zip'))
    .pipe(gulp.dest('.'));
});

gulp.task('lib-cp', function() {
  return gulp.src([
    './node_modules/@fortawesome/fontawesome-free/webfonts/*'
  ])
    .pipe(gulp.dest('./assets/dist/webfonts/'));
});

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('sass-watch', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./assets/dist/'))
    .pipe(browserSync.stream());
});

gulp.task('reload', function(done) {
  browserSync.reload();
  done();
});

gulp.task('js', function () {
  return gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    `./config/env.${process.env.NODE_ENV}.js`,
    './assets/js/**/*.js'
  ])
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./assets/dist/'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/js/**/*.js', gulp.series('js', 'reload'));
  gulp.watch('./assets/sass/**/*.scss', gulp.series('sass-watch'));
  gulp.watch('./**/*.hbs', gulp.series('reload'))
});

gulp.task('serve', function () {
  browserSync.init({
    proxy: 'http://localhost:8089',
    open: false,
    notify: false,
    plugins: []
  });
});

gulp.task('default',  gulp.series('lib-cp', 'sass', 'js', gulp.parallel('watch', 'serve')));

gulp.task('build',  gulp.series('lib-cp', 'sass', 'js', 'pack'));
