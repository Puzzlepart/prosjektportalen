'use strict';
var gulp = require("gulp"),
    tslint = require("gulp-tslint"),
    config = require('./@configuration.js');

gulp.task("tsLint", () => {
    return gulp.src(config.globs.js)
        .pipe(tslint({ formatter: config.lint.formatter }))
        .pipe(tslint.report({ emitError: config.lint.emitError }));
});