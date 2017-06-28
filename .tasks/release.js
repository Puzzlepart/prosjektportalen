'use strict';
var gulp = require("gulp"),
    zip = require("gulp-zip"),
    format = require("string-format"),
    runSequence = require("run-sequence"),
    git = require("./utils/git.js"),
    build = require("../build.json"),
    pkg = require("../package.json"),
    config = require('./@configuration.js');

gulp.task("copy:license", () => {
    return gulp.src(config.paths.license)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copy:build", () => {
    return gulp.src(config.paths.buildGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copy:scripts", () => {
    return gulp.src(config.paths.scriptsGlob)
        .pipe(gulp.dest(config.paths.distScripts))
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
    console.log(`[Building release for ${build.language}]`);
    console.log("[See build.json to change build settings]");
    runSequence("default::prod", "copy:build", "copy:manualconf", "copy:scripts", "copy:license", "stamp:version::dist", "zip:dist", () => {
        console.log(`[Build done. Find your .zip in /releases]`);
        done();
    });
});
