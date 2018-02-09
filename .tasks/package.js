'use strict';
var gulp = require("gulp"),
    webpack = require('webpack'),
    webpackConfigDev = require('../webpack.config.development.js'),
    webpackConfigProduction = require('../webpack.config.production.js'),
    stylus = require('gulp-stylus'),
    pluginError = require('plugin-error'),
    config = require('./@configuration.js');

gulp.task("packageCode", ["buildLib"], done => {
    webpack(webpackConfigDev("source-map"), err => {
        if (err) throw new pluginError("packageCode", err);
        done();
    });
});

gulp.task("packageCodeEval", ["buildLib"], done => {
    webpack(webpackConfigDev("eval"), err => {
        if (err) throw new pluginError("packageCodeEval", err)
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
    webpack(webpackConfigProduction(), err => {
        if (err) throw new pluginError("packageCodeMinify", err)
        done();
    });
});

gulp.task("packageProd", ["copyAssetsToDist", "packageCodeMinify", "packageStyles"], done => {
    done();
});