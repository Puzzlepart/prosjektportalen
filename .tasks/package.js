'use strict';
var gulp = require("gulp"),
    path = require("path"),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js'),
    stylus = require('gulp-stylus'),
    runSequence = require("run-sequence"),
    pluginError = require('plugin-error'),
    config = require('./@configuration.js');

gulp.task("packageCode", ["buildLib"], done => {
    webpack(webpackConfig("source-map", [path.join(__dirname, "../", "node_modules")], "development"), err => {
        if (err) throw new pluginError("packageCode", err);
        done();
    });
});

gulp.task("packageStyles", ["buildTheme"], done => {
    return gulp.src(config.globs.styles)
        .pipe(stylus(config.stylus))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task("package", ["copyAssetsToDist", "packageCode", "packageStyles"], done => {
    done();
});

gulp.task("packageCodeMinify", ["buildLib"], done => {
    webpack(webpackConfig("source-map", [path.join(__dirname, "../", "node_modules/disposables")], "production"), err => {
        if (err) throw new pluginError("packageCodeMinify", err)
        done();
    });
});

gulp.task("packageProd", done => {
    runSequence("buildJsonResources", ["copyAssetsToDist", "packageCodeMinify", "packageStyles"], done);
});