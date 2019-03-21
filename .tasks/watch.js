"use strict";
var gulp = require("gulp"),
    path = require("path"),
    plumber = require("gulp-plumber"),
    format = require("string-format"),
    watch = require("gulp-watch"),
    spsave = require("gulp-spsave"),
    runSequence = require("run-sequence"),
    livereload = require("gulp-livereload"),
    config = require("./@configuration.js");


gulp.task("watch", (done) => {
    const argv = require("yargs").argv;
    livereload.listen({ start: true });

    let envKey = argv.env || "default";
    let settings;

    try {
        let env = require("./@env.js");
        settings = env[envKey];
    } catch (error) {
        throw "[gulp watch] requires .tasks/@env.json";
    }

    if (!settings) {
        throw format("Environment {0} not found.", envKey);
    }

    watch(config.globs.js).on("change", () => {
        runSequence("clean", "buildJsonResources", argv.minify ? "packageCodeMinify" : "packageCode", () => {
            if (!argv.skipUpload) {
                uploadFileToSp(path.join(config.paths.dist, "js", "*.js"), settings, path.join(config.paths.spAssetsFolder, "js"));
            }
        });
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