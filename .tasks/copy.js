"use strict";
const gulp = require("gulp"),
    path = require("path"),
    es = require("event-stream"),
    format = require("string-format"),
    config = require("./@configuration.js");

gulp.task("copyLicense", () => {
    return gulp.src(config.paths.license).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyBuild", () => {
    return gulp.src(config.globs.build).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyScripts", () => {
    return gulp.src(config.globs.scripts).pipe(gulp.dest(path.join(config.paths.dist, "scripts")))
});

gulp.task("copyManualConfig", () => {
    return gulp.src(config.globs.manualConf).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyAssetsToDist", () => {
    const src = config.assets.fileTypes.map(ext => `./src/**/*.${ext}`);
    return gulp.src(src).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyResourcesToLib", () => {
    return gulp.src(config.globs.resxJson).pipe(gulp.dest(config.paths.lib))
});

gulp.task("copyPnpTemplates", () => {
    return gulp.src(config.globs.templates).pipe(gulp.dest(config.paths.templates_temp));
});

gulp.task("copyPnpRootTemplate", () => {
    const src = gulp.src(format("{0}/root/**/*", config.paths.templates_temp));
    return es.concat(config.availableLanguages.map(lcid => src.pipe(gulp.dest(format("{0}/root-{1}", config.paths.templates_temp, lcid)))));
});

gulp.task("copyResourcesToAssetsTemplate", () => {
    const src = ["js", "css", config.paths.assets.fileTypes].map(ext => {
        return path.join(config.paths.dist, "**", `*.${ext}`);
    });
    return es.concat(config.availableLanguages.map(lcid => {
        return src.pipe(gulp.dest(path.join(config.paths.templates_temp, `assets-${lcid}`)));
    }));
});

gulp.task("copyThirdPartyLibsToTemplate", () => {
    const src = gulp.src([
        format("{0}/xlsx/dist/xlsx.full.min.js", config.paths.nodeModules),
        format("{0}/file-saver/FileSaver.min.js", config.paths.nodeModules)
    ]);
    return src.pipe(gulp.dest(path.join(config.paths.templates_temp, "thirdparty", "libs")));
});