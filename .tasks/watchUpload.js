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
    watch(config.paths.dist).on('change', (glob) => {
        let dest
        if (glob.indexOf('/js') !== -1) dest = path.join(config.paths.spAssetsFolder, 'js')
        if (glob.indexOf('/css') !== -1) dest = path.join(config.paths.spAssetsFolder, 'css')
        uploadFileToSp(
            glob,
            require('./@env.js').default,
            dest,
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