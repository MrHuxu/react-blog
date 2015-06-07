var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    shell = require('gulp-shell');

gulp.task('js', function () {
  gulp.src([
      './public/bower_components/highlightjs/highlight.pack.js',
      './public/bower_components/nprogress/nprogress.js',
      './public/bower_components/angular/angular.min.js',
      './public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './public/javascripts/blog_module.js', 
      './public/javascripts/*.js'
    ])
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./public/dist'))
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('css', function () {
  gulp.src([
      './public/bower_components/highlightjs/styles/tomorrow-night-eighties.css',
      './public/bower_components/nprogress/nprogress.css',
      './public/stylesheets/*.css'
    ])
    .pipe(concatCss('all.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./public/dist'));
});

gulp.task('compress', ['js', 'css'], function () {});

gulp.task('prd', ['compress'], shell.task('NODE_ENV=production node app'));

gulp.task('dev', function () {
  nodemon({
    script: 'app.js'
  }).on('restart', function () {
    console.log('server restarted!');
  });
});
