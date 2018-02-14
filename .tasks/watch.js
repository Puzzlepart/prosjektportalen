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
    defaultSettings = require("./@settings.js");

let buildTimeout;

function __startWatch(packageCodeFunc) {
  
}

gulp.task("watchTests", () => {
    __startWatch("test");
});

gulp.task("watch", () => {
    const argv = require("yargs").argv;
    livereload.listen({ start: true });
    const settings = {
        siteUrl: argv.siteUrl || defaultSettings.siteUrl,
        username: argv.username || defaultSettings.username,
        password: argv.password || defaultSettings.password,
    };
    watch(config.globs.js).on("change", () => {
        if (buildTimeout) {
            clearTimeout(buildTimeout);
        }
        buildTimeout = setTimeout(() => {
            runSequence("clean", argv.minify ? "packageCodeMinify" : "packageCode", () => {
                uploadFileToSp(path.join(config.paths.dist, "js", "*.js"), settings, path.join(config.paths.spAssetsFolder, "js"));
            });
        }, 100);
    });
    watch(config.globs.styles).on("change", () => {
        runSequence("packageStyles", () => {
            uploadFileToSp(path.join(config.paths.dist, "css", "*.css"), settings, path.join(config.paths.spAssetsFolder, "css"));
        });
    });
    watch(config.globs.resxJson).on("change", () => {
        runSequence("buildJsonResources");
    });
});

function uploadFileToSp(glob, settings, folder) {
    gulp.src(glob)
        .pipe(plumber({
            errorHandler: (err) => this.emit("end"),
        }))
        .pipe(spsave({ folder: folder, siteUrl: settings.siteUrl }, {
            username: settings.username,
            password: settings.password,
        }))
        .pipe(livereload());
}