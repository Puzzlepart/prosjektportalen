'use strict'
var gulp = require('gulp'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch'),
    spsave = require('gulp-spsave'),
    livereload = require('gulp-livereload'),
    config = require('./@configuration.js')


gulp.task('watchUpload', () => {
    livereload.listen({ start: true })
    watch(config.dist.js).on('change', (glob) => {
        uploadFileToSp(
            glob,
            require('./@env.js').default,
            path.join(config.paths.spAssetsFolder, 'js'),
        )
    })
})

function uploadFileToSp(glob, settings, folder) {
    gulp.src(glob)
        .pipe(plumber({ errorHandler: () => this.emit('end') }))
        .pipe(spsave(
            {
                folder: folder,
                siteUrl: settings.siteUrl
            },
            { username: settings.username, password: settings.password })
        )
        .pipe(livereload())
}