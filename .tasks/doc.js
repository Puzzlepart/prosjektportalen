'use strict'
let gulp = require('gulp'),
    typedoc = require('gulp-typedoc'),
    typedocConfig = require('../typedoc.json'),
    config = require('./@configuration.js')

gulp.task('doc', () => {
    return gulp
        .src(config.globs.js)
        .pipe(typedoc(typedocConfig))
})