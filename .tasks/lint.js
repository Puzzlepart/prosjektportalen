'use strict';
var gulp = require("gulp"),
    tslint = require("gulp-tslint"),
    config = require('./@configuration.js');

gulp.task("tslint", function () {
    return gulp.src(config.paths.sourceGlob)
        .pipe(tslint({ formatter: config.lint.formatter }))
        .pipe(tslint.report({ emitError: config.lint.emitError }));
});