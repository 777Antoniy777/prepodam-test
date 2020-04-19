"use strict";

var gulp = require("gulp");
var posthtml = require("gulp-posthtml");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssmin = require("gulp-csso");
var rename = require("gulp-rename");
var image = require("gulp-image");
var webp = require("gulp-webp");
var objectfit = require(`postcss-object-fit-images`);
var jsconcat = require('gulp-concat');
var jsuglify = require("gulp-uglify");
var babel = require('gulp-babel');
var svgsprite = require('gulp-svg-sprite');
var sourcemaps = require(`gulp-sourcemaps`);
var del = require("del");
var server = require("browser-sync").create();

// css
gulp.task("css", function () {
  return gulp.src("src/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      objectfit()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssmin())
    .pipe(rename("style.min.css"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

// js
gulp.task("js", function () {
  return gulp.src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(jsconcat("all.js"))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(jsuglify())
    .pipe(rename("all.min.js"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

// img (jpg, png, svg)
gulp.task("images", function() {
  return gulp.src("src/img/*.{png,jpg,svg}")
    .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: false,
      jpegRecompress: false,
      mozjpeg: ["-optimize", "-progressive", "-quality N[75]"],
      guetzli: false,
      gifsicle: false,
      svgo: true,
      concurrent: 10,
      quiet: true
    }))
    .pipe(gulp.dest("build/img/"));
});

gulp.task("webp", function() {
  return gulp.src("src/img/*.{png,jpg}")
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest("build/img"));
});

// svg sprite
gulp.task('sprite', function () {
  return gulp.src('src/img/icons-sprite/*.svg')
		.pipe(svgsprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
			}
		}))
		.pipe(gulp.dest('build/img/sprite/'));
});

// html
gulp.task("html", function() {
  return gulp.src("src/*.html")
    .pipe(posthtml())
    .pipe(gulp.dest("build"));
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  // watchers
  gulp.watch("src/img/**/*.{png,jpg,webp}", gulp.series("copy")).on("change", server.reload);
  gulp.watch("src/img/icons-sprite/*.svg", gulp.series("sprite", "reload"));
  gulp.watch("src/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("src/js/*/**.js", gulp.series("js"));
  gulp.watch("src/*.html", gulp.series("html", "reload"));
});

gulp.task("reload", function(done) {
  server.reload();
  done();
});

gulp.task("copy", function() {
  return gulp.src([
    "src/fonts/**/*.{woff,woff2}",
    "src/img/**/*.{png,jpg,webp}",
    "src/img/svg/*.svg"
  ], {
    base: "src"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("imagemin", gulp.series(
  "webp",
  "images"
));

gulp.task("build", gulp.series(
  "clean",
  "js",
  "sprite",
  "css",
  "copy",
  "html"
));

gulp.task("start", gulp.series(
  "build",
  "server"
));
