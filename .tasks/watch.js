'use strict';
var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    format = require("string-format"),
    watch = require("gulp-watch"),
    spsave = require("gulp-spsave"),
    runSequence = require("run-sequence"),
    livereload = require('gulp-livereload'),
    config = require('./@configuration.js'),
    settings = require('./@settings.js');

let buildTimeout;

function __startWatch(packageCodeFunc) {
    livereload.listen({
        start: true,
    });
    console.log("Started watching...", settings.siteUrl)
    watch(config.paths.sourceGlob).on("change", () => {
        if (buildTimeout) {
            clearTimeout(buildTimeout);
        }
        buildTimeout = setTimeout(() => {
            runSequence("clean", packageCodeFunc, () => {
                uploadFile(format("{0}/js/pp.main.js", config.paths.dist), settings.siteUrl, "siteassets/pp/js")
            })
        }, 100);
    });
    watch(config.paths.stylesGlob).on("change", () => {
        runSequence("package:styles", () => {
            uploadFile(format("{0}/css/*.css", config.paths.dist), settings.siteUrl, "siteassets/pp/css")
        })
    });
    watch(config.paths.searchDispTemplatesGlob).on("change", (file) => {
        uploadFile(file, settings.siteUrl, "_catalogs/masterpage/Display Templates/Search")
    });
    watch(config.paths.filtersDispTemplatesGlob).on("change", (file) => {
        uploadFile(file, settings.siteUrl, "_catalogs/masterpage/Display Templates/Filters")
    });
    watch(config.resources.glob).on("change", () => {
        runSequence("build:jsonresources");
    });
}

gulp.task("watch", () => {
    __startWatch("package:code");
});

gulp.task("watch::eval", () => {
    __startWatch("package:code::eval");
});

gulp.task("watch::prod", () => {
    __startWatch(`package:code::prod`);
});

function uploadFile(glob, url, folder) {
    gulp.src(glob)
        .pipe(plumber({
            errorHandler: function (err) {
                this.emit("end");
            }
        }))
        .pipe(spsave({ folder: folder, siteUrl: url }, {
            username: settings.username,
            password: settings.password
        }))
        .pipe(livereload());
}