"use strict";
var gulp = require("gulp"),
    path = require("path"),
    plumber = require("gulp-plumber"),
    format = require("string-format"),
    watch = require("gulp-watch"),
    spsave = require("gulp-spsave"),
    runSequence = require("run-sequence"),
    livereload = require("gulp-livereload"),
    config = require("./@configuration.js"),
    env = require("./@env.js");

let buildTimeout;

function __startWatch(packageCodeFunc) {

}

gulp.task("watchTests", () => {
    __startWatch("test");
});

gulp.task("watch", () => {
    const argv = require("yargs").argv;
    livereload.listen({ start: true });

    let envKey = argv.env || "default";

    let settings = env[envKey];

    if (!settings) {
        throw format("Environment {0} not found.", envKey);
    }

    watch(config.globs.js).on("change", () => {
        if (buildTimeout) {
            clearTimeout(buildTimeout);
        }
        buildTimeout = setTimeout(() => {
            runSequence("clean", "buildJsonResources", argv.minify ? "packageCodeMinify" : "packageCode", () => {
                if (!argv.skipUpload) {
                    uploadFileToSp(path.join(config.paths.dist, "js", "*.js"), settings, path.join(config.paths.spAssetsFolder, "js"));
                }
            });
        }, 100);
    });
    watch(config.globs.styles).on("change", () => {
        runSequence("packageStyles", () => {
            if (!argv.skipUpload) {
                uploadFileToSp(path.join(config.paths.dist, "css", "*.css"), settings, path.join(config.paths.spAssetsFolder, "css"));
            }
        });
    });
    watch(config.globs.resxJson).on("change", () => {
        if (!argv.skipUpload) {
            runSequence("buildJsonResources");
        }
    });
});

function uploadFileToSp(glob, settings, folder) {
    gulp.src(glob)
        .pipe(plumber({ errorHandler: (err) => this.emit("end") }))
        .pipe(spsave({ folder: folder, siteUrl: settings.siteUrl }, { username: settings.username, password: settings.password }))
        .pipe(livereload());
}