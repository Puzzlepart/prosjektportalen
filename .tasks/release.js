'use strict';
var gulp = require("gulp"),
    zip = require("gulp-zip"),
    format = require("string-format"),
    runSequence = require("run-sequence"),
    log = require("fancy-log"),
    git = require("./utils/git.js"),
    pkg = require("../package.json"),
    config = require('./@configuration.js');

function getReleasePackageName() {
    return new Promise((resolve, reject) => {
        git.hash(hash => {
            git.branch(branch => {
                let releasePackageName = format("{0}-{1}.{2}.zip", pkg.name, pkg.version, hash);

                // If we're not on the master branch, we'll include th branch name
                if (branch !== "master") {
                    releasePackageName = format("{0}-{1}.{2}.{3}.zip", pkg.name, pkg.version, branch, hash);
                }

                resolve(releasePackageName);
            });
        });
    })
}

gulp.task("zipReleasePackage", done => {
    getReleasePackageName().then(releasePkgName => {
        log(`(zipReleasePackage) Release ${pkg.version} done. Find ${releasePkgName} in ${config.paths.release}`);
        gulp.src(format("{0}/**/*", config.paths.dist))
            .pipe(zip(releasePkgName))
            .pipe(gulp.dest(config.paths.release))
            .on('end', done);
    });
});

gulp.task("release", done => {
    log(`(release) Building release ${pkg.version}`);
    runSequence("clean", "packageProd", "buildPnpTemplateFiles", "copyReleaseFiles", "stampVersionToScripts", "zipReleasePackage", done);
});
