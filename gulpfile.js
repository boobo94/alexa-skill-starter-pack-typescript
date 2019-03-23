var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var IN_DIR = "lambda/custom/";
const OUT_DIR = "dist/custom/";

// compile typescript
gulp.task("compile", function () {
    return gulp.src(IN_DIR + "/**/*.ts")
        .pipe(tsProject())
        .js.pipe(gulp.dest(OUT_DIR));
});

gulp.task("json", function () {
    return gulp.src(IN_DIR + '/**/*.json').pipe(gulp.dest(OUT_DIR));
});

gulp.task("default", ["compile", "json"]);
