'use strict'
const gulp = require('gulp')
const open = require('open')

gulp.task('prewatch', () => {
    try {
        const { pageUrl, port } = require('./@watch.json')
        open(`${pageUrl}?debug=http://localhost:${port}`)
    } catch (error) {
        throw 'Can´t initialize watch task without ./tasks/@watch.json'
    }
})