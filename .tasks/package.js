'use strict';
var gulp = require("gulp"),
    webpack = require('webpack'),
    webpackConfigDev = require('../webpack.config.development.js'),
    webpackConfigProd = require('../webpack.config.production.js'),
    stylus = require('gulp-stylus'),
    gutil = require('gulp-util'),
    autoprefixer = require('autoprefixer-stylus'),
    settings = require('./@settings.js'),
    config = require('./@configuration.js');

gulp.task("package:code", ["build:lib"], (done) => {
    webpack(webpackConfigDev(settings.language, "source-map"), (err, stats) => {
        if (err) {
            throw new gutil.PluginError("package:code", err);
        }
        console.log(stats.toString({
            colors: true
        }));
        done();
    });
});
gulp.task("package:code::eval", ["build:lib"], (done) => {
    webpack(webpackConfigDev(settings.language, "eval"), (err, stats) => {
        if (err) {
            throw new gutil.PluginError("package:code", err);
        }
        console.log(stats.toString({
            colors: true
        }));
        done();
    });
});
gulp.task("package:styles", ["build:theme"], (done) => {
    return gulp.src(config.paths.stylesMain)
        .pipe(stylus(config.stylus))
        .pipe(gulp.dest(config.paths.dist));
});
gulp.task("package", ["copy:assets:dist", "package:code", "package:styles"], (done) => {
    done();
});

/**
 * Set up gulp tasks for package::prod and package:code::prod for each language in config.languages
 */
config.languages.forEach(lang => {
    gulp.task(`package:code::prod::${lang}`, ["build:lib"], (done) => {
        webpack(webpackConfigProd(lang), (err, stats) => {
            if (err) {
                throw new gutil.PluginError("package:code::prod", err);
            }
            console.log(stats.toString({
                colors: true
            }));
            done();
        });
    });
    gulp.task(`package::prod::${lang}`, ["copy:assets:dist", `package:code::prod::${lang}`, "package:styles"], (done) => {
        done();
    });
})