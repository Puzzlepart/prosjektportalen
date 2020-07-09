'use strict'
const gulp = require('gulp')
const clean = require('gulp-clean')
const config = require('./@configuration.js')

gulp.task('cleanNodeModules', () => {
    return gulp.src(config.paths.nodeModules, { read: false }).pipe(clean())
})

gulp.task('clean', () => {
    return gulp.src(
        [
            config.paths.lib,
            config.paths.dist,
            config.paths.templatesTemp
        ],
        {
            read: false
        }
    ).pipe(clean())
})