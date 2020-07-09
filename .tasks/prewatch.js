'use strict'
const gulp = require('gulp')
const open = require('open')
const { siteUrl } = require('./@env')

gulp.task('prewatch', () => open(`${siteUrl}?debug=http://localhost:9001`))