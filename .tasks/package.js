'use strict';
var gulp = require("gulp"),
    webpack = require('webpack'),
    wpDev = require('../webpack.config.development.js'),
    wpProd = require('../webpack.config.production.js'),
    stylus = require('gulp-stylus'),
    pluginError = require('plugin-error'),
    autoprefixer = require('autoprefixer-stylus'),
    settings = require('./@settings.js'),
    config = require('./@configuration.js');

gulp.task("packageCode", ["buildLib"], (done) => {
    webpack(wpDev("source-map"), (err, stats) => {
        if (err) {
            throw new pluginError("packageCode", err);
        }
        console.log(stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task("packageCodeEval", ["buildLib"], (done) => {
    webpack(wpDev("eval"), (err, stats) => {
        if (err) {
            throw new pluginError("packageCodeEval", err);
        }
        console.log(stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task("packageStyles", ["buildTheme"], (done) => {
    return gulp.src(config.paths.stylesMain)
        .pipe(stylus(config.stylus))
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task("package", ["copyAssetsToDist", "packageCode", "packageStyles"], (done) => {
    done();
});

gulp.task("packageCodeMinify", ["buildLib"], (done) => {
    webpack(wpProd(), (err, stats) => {
        if (err) {
            throw new pluginError("packageCodeMinify", err);
        }
        console.log(stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task("packageProd", ["copyAssetsToDist", "packageCodeMinify", "packageStyles"], (done) => {
    done();
});