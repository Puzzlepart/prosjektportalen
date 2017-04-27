var gulp = require("gulp"),
    zip = require("gulp-zip"),
    format = require("string-format"),
    runSequence = require("run-sequence"),
    git = require("./utils/git.js"),
    pkg = require("../package.json"),
    config = require('./@configuration.js');

gulp.task("copy:build", () => {
    return gulp.src(config.paths.buildGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copy:manualconf", () => {
    return gulp.src(config.paths.manualConfGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("zip:dist", (done) => {
    git.hash(hash => {
        gulp.src(format("{0}/**/*", config.paths.dist))
            .pipe(zip(format("{0}-{1}.{2}.zip", pkg.name, pkg.version, hash)))
            .pipe(gulp.dest(config.paths.release))
            .on('end', () => done());
    });
});

gulp.task("release", (done) => {
    runSequence("default::prod", "copy:build", "copy:manualconf", "zip:dist", () => {
        done();
    });
});

