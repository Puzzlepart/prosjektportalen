var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    format = require("string-format"),
    watch = require("gulp-watch"),
    spsave = require("gulp-spsave"),
    runSequence = require("run-sequence"),
    livereload = require('gulp-livereload'),
    config = require('./@configuration.js'),
    settings = require('./@settings.js');

gulp.task("watch", (done) => {
    livereload.listen({
        start: true,
    });
    watch(config.paths.sourceGlob).on("change", (done) => {
        runSequence("clean:lib", "clean:dist", "package:code", () => {
            uploadFile(format("{0}/js/*.js", config.paths.dist), settings.siteUrl, "siteassets/pp/js")
        })
    });
    watch(config.paths.stylesGlob).on("change", (done) => {
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
    watch(config.resources.glob).on("change", (done) => {
        runSequence("build:jsonresources");
    });
});

gulp.task("watch::eval", (done) => {
    livereload.listen({
        start: true,
    });
    watch(config.paths.sourceGlob).on("change", (done) => {
        runSequence("clean:lib", "clean:dist", "package:code::eval", () => {
            uploadFile(format("{0}/js/*.js", config.paths.dist), settings.siteUrl, "siteassets/pp/js")
        })
    });
    watch(config.paths.stylesGlob).on("change", (done) => {
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
    watch(config.resources.glob).on("change", (done) => {
        runSequence("build:jsonresources");
    });
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