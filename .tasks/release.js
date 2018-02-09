'use strict';
var gulp = require("gulp"),
    zip = require("gulp-zip"),
    format = require("string-format"),
    runSequence = require("run-sequence"),
    log = require("fancy-log"),
    git = require("./utils/git.js"),
    pkg = require("../package.json"),
    config = require('./@configuration.js');

gulp.task("zipReleasePackage", done => {
    git.hash(hash => {
        git.branch(branch => {
            let zipFilename = format("{0}-{1}.{2}.zip", pkg.name, pkg.version, hash);
            if (branch !== "master") {
                zipFilename = format("{0}-{1}.{2}.{3}.zip", pkg.name, pkg.version, branch, hash);
            }
            gulp.src(format("{0}/**/*", config.paths.dist))
                .pipe(zip(zipFilename))
                .pipe(gulp.dest(config.paths.release))
                .on('end', () => done());
        });
    });
});

gulp.task("release", done => {
    log(`(release) Building release ${pkg.version}`);
    runSequence("clean", "buildJsonResources", "packageProd", "buildPnpTemplateFiles", "copyBuild", "copyManualConfig", "copyScripts", "copyLicense", "stampVersionToScripts", "zipReleasePackage", () => {
        log(`(release) Build done. Find your .zip in ${config.paths.release}`);
        done();
    });
});
