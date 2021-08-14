var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var browserSync = require("browser-sync").create();

function buildStyles() {
  return gulp
    .src("./src/public/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./src/public/css"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
    online: true,
    tunnel: true,
  });

  gulp.watch("./src/**/*.html").on("change", browserSync.reload);
  gulp.watch("./src/public/scss/**/*.scss").on("change", buildStyles, browserSync.reload);;
  gulp.watch("./src/public/js/**/*.js").on("change", browserSync.reload);
}

exports.buildStyles = buildStyles;
exports.watch = watch;
