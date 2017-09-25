'use strict';
var gulp = require("gulp"),
    typescript = require("gulp-typescript"),
    config = require('./@configuration.js'),
    merge = require("merge2"),
    rename = require("gulp-rename"),
    resx2 = require('gulp-resx2'),
    sourcemaps = require('gulp-sourcemaps'),
    spcs = require("gulp-spcolor-stylus"),
    replace = require('gulp-replace'),
    flatmap = require("gulp-flatmap"),
    fs = require('fs'),
    es = require('event-stream'),
    path = require("path"),
    runSequence = require("run-sequence"),
    powershell = require("./utils/powershell.js"),
    git = require("./utils/git.js"),
    format = require("string-format"),
    pkg = require("../package.json");

gulp.task("copyAssetsToDist", () => {
    return gulp.src(config.paths.assetsFilesGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyResourcesToLib", () => {
    return gulp.src("./src/js/**/*.json")
        .pipe(gulp.dest(config.paths.lib))
});

gulp.task("buildLib", ["copyResourcesToLib"], () => {
    var project = typescript.createProject("tsconfig.json", { declaration: true });
    var built = gulp.src(config.paths.sourceGlob)
        .pipe(project(typescript.reporter.fullReporter()));
    return merge([built.dts.pipe(gulp.dest(config.paths.lib)), built.js.pipe(gulp.dest(config.paths.lib))]);
});

gulp.task("buildJsonResources", () => {
    return gulp.src(config.resources.glob)
        .pipe(resx2())
        .pipe(rename(path => {
            path.extname = ".json"
        }))
        .pipe(gulp.dest(config.resources.json));
});

gulp.task("buildTheme", () => {
    return gulp.src(config.theme.glob)
        .pipe(spcs())
        .pipe(rename(path => {
            path.extname += ".styl"
        }))
        .pipe(gulp.dest(config.theme.styl));
});

gulp.task("copyPnp", () => {
    return gulp.src(config.paths.templatesGlob)
        .pipe(gulp.dest(config.paths.templates_temp));
});

gulp.task("copyPnpRootTemplate", cb => {
    var root = format("{0}/root/**/*", config.paths.templates_temp);
    es.concat(
        gulp.src(root)
            .pipe(gulp.dest(format("{0}/root-1033", config.paths.templates_temp))),
        gulp.src(root)
            .pipe(gulp.dest(format("{0}/root-1044", config.paths.templates_temp)))
    ).on('end', cb);
});

gulp.task("copyToDist", () => {
    return gulp.src([
        format("{0}/**/*.js", config.paths.dist),
        format("{0}/**/*.css", config.paths.dist),
        format("{0}/**/*.png", config.paths.dist),
        format("{0}/**/*.js", config.paths.build)]
    )
        .pipe(gulp.dest(format("{0}/assets", config.paths.templates_temp)));
});

gulp.task("stampVersionToTemplates", cb => {
    git.hash(hash => {
        es.concat(
            gulp.src("./_templates/**/*.xml")
                .pipe(flatmap((stream, file) => {
                    return stream
                        .pipe(replace(config.version.token, format("{0}#{1}", config.version.v, hash)))
                        .pipe(gulp.dest(config.paths.templates_temp))
                }))
        )
            .on('end', cb);
    });
});

gulp.task("stampVersionToDist", cb => {
    git.hash(hash => {
        es.concat(
            gulp.src("./dist/*.ps1")
                .pipe(flatmap((stream, file) => {
                    return stream
                        .pipe(replace(config.version.token, format("{0}#{1}", config.version.v, hash)))
                        .pipe(gulp.dest(config.paths.dist))
                }))
        )
            .on('end', cb);
    });
});

gulp.task("buildPnp", (done) => {
    runSequence("copyPnp", "copyPnpRootTemplate", "copyToDist", "stampVersionToTemplates", () => {
        powershell.execute("Build-PnP-Templates.ps1", "", done);
    })
});