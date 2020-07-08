'use strict'
const gulp = require('gulp')
const path = require('path')
const plumber = require('gulp-plumber')
const watch = require('gulp-watch')
const spsave = require('gulp-spsave')
const livereload = require('gulp-livereload')
const config = require('./@configuration.js')


gulp.task('watchUpload', () => {
    livereload.listen({ start: true })
    watch(config.paths.dist).on('change', (glob) => {
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