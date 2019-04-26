"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var server = require("browser-sync").create();
var del = require("del");
var jsmin = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var prettify = require('gulp-jsbeautifier');
var run = require("run-sequence");

//style automation
gulp.task("style", function () {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

//image optimizer
gulp.task("images", function () {
  return gulp.src("img/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

//sprite collector
gulp.task("sprite", function () {
  return gulp.src("img/svg-sprite-resourses/*.svg")
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/"));
});

//js minifier
gulp.task("jsmin", function (cb) {
  return gulp.src("build/js/*.js")
    .pipe(jsmin())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js/"));
});

//html minifier
gulp.task("htmlmin", function (cb) {
  return gulp.src("build/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build/"));
});

//wepb-converter
gulp.task("webp", function () {
  return gulp.src("img/**/*.{jpg,png,tiff}")
    .pipe(webp({quality: 80}))
    .pipe(gulp.dest("img/"));
});

//postHTML to HTML
gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build/"));
});

//local server
gulp.task("serve", function () {
  server.init({
    server: "build"
  });

  gulp.watch("sass/**/*.scss", ["style"]);
  gulp.watch("*.html", ["html"]);
  gulp.watch("js/**/*.js", ["jsmin"]);

  server.watch("build/**/*.*").on("change", server.reload);
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/*.{png,jpg,svg,webp}",
    "js/**"
  ], {
    base: "."
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build/");
});

//total task
gulp.task("build", function (done) {
  run(
    "clean",
    "copy",
    "style",
    "sprite",
    "jsmin",
    "html",
    "htmlmin",
    done);
});
