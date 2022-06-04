const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const shell = require("gulp-shell");

const MODULEPATH = "../../../modules/foundry-vtt-dextracker/";

const project = ts.createProject("tsconfig.json");

// =========================================
// Individual tasks
// =========================================

gulp.task("compile", () => {
  return gulp.src("src/**/*.ts").pipe(project()).pipe(gulp.dest("compiled/"));
});

gulp.task("bundle", shell.task("yarn bundle"));

gulp.task("copy", async () => {
  return new Promise((resolve) => {
    gulp.src("README.md").pipe(gulp.dest("dist/"));
    gulp.src("src/module.json").pipe(gulp.dest("dist/"));
    gulp.src("src/lang/**").pipe(gulp.dest("dist/lang/"));
    gulp.src("src/templates/**").pipe(gulp.dest("dist/templates/"));
    gulp.src("src/styles/**").pipe(gulp.dest("dist/styles/"));
    gulp.src("src/assets/**").pipe(gulp.dest("dist/assets/"));

    resolve(null);
  });
});

gulp.task("clean", () => {
  return del("compiled/", { force: true });
});

gulp.task("foundry", () => {
  return gulp.src("dist/**").pipe(gulp.dest(MODULEPATH));
});

// =========================================
// Grouped tasks
// =========================================

gulp.task("generate-dist", gulp.parallel("bundle", "copy"));

gulp.task("finish", gulp.parallel("clean", "foundry"));

// =========================================
// Main tasks
// =========================================

gulp.task("build-statics", gulp.series("copy", "foundry"));
gulp.task("build", gulp.series("compile", "generate-dist", "finish"));
