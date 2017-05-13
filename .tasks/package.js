var gulp = require("gulp"),
    webpack = require('webpack'),
    webpackConfig = require('../webpack.config.js'),
    stylus = require('gulp-stylus'),
    gutil = require('gulp-util'),
    autoprefixer = require('autoprefixer-stylus'),
    config = require('./@configuration.js');

const env = "development";

gulp.task("package:code", ["build:lib"], (done) => {
    webpack(webpackConfig(env), (err, stats) => {
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
    webpack(webpackConfig(env, "eval"), (err, stats) => {
        if (err) {
            throw new gutil.PluginError("package:code", err);
        }
        console.log(stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task("package:code::prod", ["build:lib"], (done) => {
    webpack(webpackConfig("production"), (err, stats) => {
        if (err) {
            throw new gutil.PluginError("package:code::prod", err);
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

gulp.task("package::prod", ["copy:assets:dist", "package:code::prod", "package:styles"], (done) => {
    done();
});
