'use strict'
var gulp = require('gulp'),
    path = require('path'),
    plumber = require('gulp-plumber'),
    format = require('string-format'),
    watch = require('gulp-watch'),
    spsave = require('gulp-spsave'),
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload'),
    config = require('./@configuration.js')

let buildTimeout

gulp.task('watch', ['buildJsonResources', 'buildJsonPreferences'], (done) => {
    const argv = require('yargs').argv
    livereload.listen({ start: true })

    let envKey = argv.env || 'default'
    let settings

    try {
        let env = require('./@env.js')
        settings = env[envKey]
    } catch (error) {
        throw '[gulp watch] requires .tasks/@env.js'
    }

    if (!settings) {
        throw format('Environment {0} not found.', envKey)
    }

    watch(config.globs.js).on('change', () => {
        if (buildTimeout) {
            clearTimeout(buildTimeout)
            buildTimeout = null
        }
        buildTimeout = setTimeout(() => {
            try {
                runSequence('clean', argv.minify ? 'packageCodeMinify' : 'packageCode', () => {
                    if (!argv.skipUpload) {
                        uploadFileToSp(
                            path.join(config.paths.dist, 'js', '*.js'),
                            settings,
                            path.join(config.paths.spAssetsFolder, 'js')
                        )
                    }
                })
            } catch (error) { }
        }, 500)
    })

    watch('./src/**/components/*.styl').on('change', () => {
        if (buildTimeout) {
            clearTimeout(buildTimeout)
            buildTimeout = null
        }
        buildTimeout = setTimeout(() => {
            try {
                runSequence('packageStyles', () => {
                    if (!argv.skipUpload) {
                        uploadFileToSp(
                            path.join(config.paths.dist, 'css', '*.css'),
                            settings,
                            path.join(config.paths.spAssetsFolder, 'css')
                        )
                    }
                })
            } catch (error) { }
        }, 500)
    })

    watch(config.globs.resxJson).on('change', () => {
        if (!argv.skipUpload) {
            try {
                runSequence('buildJsonResources')
            } catch (error) { }
        }
    })
})

function uploadFileToSp(glob, settings, folder) {
    gulp.src(glob)
        .pipe(plumber({ errorHandler: () => this.emit('end') }))
        .pipe(spsave({ folder: folder, siteUrl: settings.siteUrl }, { username: settings.username, password: settings.password }))
        .pipe(livereload())
}