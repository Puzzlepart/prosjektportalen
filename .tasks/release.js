'use strict';
var gulp = require("gulp"),
    color = require('gulp-color'),
    zip = require("gulp-zip"),
    format = require("string-format"),
    runSequence = require("run-sequence"),
    git = require("./utils/git.js"),
    pkg = require("../package.json"),
    config = require('./@configuration.js');

gulp.task("copyLicense", () => {
    return gulp.src(config.paths.license)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyBuild", () => {
    return gulp.src(config.paths.buildGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyScripts", () => {
    return gulp.src(config.paths.scriptsGlob)
        .pipe(gulp.dest(config.paths.distScripts))
});

gulp.task("copyManualConfig", () => {
    return gulp.src(config.paths.manualConfGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("zipDist", (done) => {
    git.hash(hash => {
        gulp.src(format("{0}/**/*", config.paths.dist))
            .pipe(zip(format("{0}-{1}.{2}.zip", pkg.name, pkg.version, hash)))
            .pipe(gulp.dest(config.paths.release))
            .on('end', () => done());
    });
});

gulp.task("release", (done) => {
    console.log(color(`[Building release ${pkg.version}]`, 'GREEN'));
    runSequence(`defaultProd`, "copyBuild", "copyManualConfig", "copyScripts", "copyLicense", "stampVersionToDist", `zipDist`, () => {
        console.log(color(`[Build done. Find your .zip in /releases]`, 'GREEN'));
        done();
    });
});
