'use strict';
var gulp = require("gulp"),
    zip = require("gulp-zip"),
    format = require("string-format"),
    git = require("./utils/git.js"),
    pkg = require("../package.json"),
    bom = require('gulp-bom'),
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
        gulp.src(format("{0}/**/*", config.paths.dist))
            .pipe(zip(releasePkgName))
            .pipe(gulp.dest(config.paths.release))
            .on('end', done);
    });
});