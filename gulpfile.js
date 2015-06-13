/// <binding Clean='clean' />

var gulp = require("gulp"),
  rimraf = require("rimraf"),
  watch = require("gulp-watch"),
  less = require('gulp-less'),
  cssmin = require('gulp-cssmin'),
  rename = require('gulp-rename'),
  fs = require("fs"),
  shell = require("gulp-shell"),
  project = require("./project.json");

var paths = {
  bower: "./bower_components/",
  lib: "./" + project.webroot + "/lib/"
};

gulp.task("clean", function (cb) {
  rimraf(paths.lib, cb);
});

gulp.task("copy", ["clean"], function () {
  var bower = {
    "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,eot}",
    "bootstrap-touch-carousel": "bootstrap-touch-carousel/dist/**/*.{js,css}",
    "hammer.js": "hammer.js/hammer*.{js,map}",
    "jquery": "jquery/jquery*.{js,map}",
    "jquery-validation": "jquery-validation/jquery.validate.js",
    "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js"
  };

  for (var destinationDir in bower) {
    gulp.src(paths.bower + bower[destinationDir])
      .pipe(gulp.dest(paths.lib + destinationDir));
  }
});

gulp.task('watch-less', function () {
    watch('./wwwroot/css/*.less', function (files) { // watch any changes on coffee files
        gulp.start('compile-less'); // run the compile task
    });

    watch(['./wwwroot/css/*.css', '!./wwwroot/css/*.min.css']
    , function(files) {
        gulp.start('minify-css'); // run the compile task
    });
});

gulp.task('compile-less', function () {
    gulp.src('./wwwroot/css/*.less') // path to your file
    .pipe(less().on('error', function(err) {
        console.log(err);
    }))
    .pipe(gulp.dest('./wwwroot/css/'));
});

gulp.task('minify-css', function() {
    gulp.src([
        './wwwroot/css/*.css',
        '!./wwwroot/css/*.min.css'
    ])
    .pipe(cssmin().on('error', function(err) {
        console.log(err);
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./wwwroot/css/'));
})

gulp.task("run", function() {
  return shell.task(["dnx . --watch kestrel"])();
});


gulp.task("restore", function() {
  return shell.task(["dnu restore"])();
});
