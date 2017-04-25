var gulp = require("gulp"),
    clean = require('gulp-clean'),
    runSequence = require("run-sequence"),
    config = require('./@configuration.js');

gulp.task("clean", done => {
    runSequence("clean:lib", "clean:dist", "clean:templates_temp", done);
});

gulp.task("clean:lib", () => {
    return gulp.src(config.paths.lib, { read: false })
        .pipe(clean());
});

gulp.task("clean:dist", () => {
    return gulp.src(config.paths.dist, { read: false })
        .pipe(clean());
});

gulp.task("clean:release", () => {
    return gulp.src(config.paths.release, { read: false })
        .pipe(clean());
});

gulp.task("clean:templates_temp", () => {
    return gulp.src(config.paths.templates_temp, { read: false })
        .pipe(clean());
});