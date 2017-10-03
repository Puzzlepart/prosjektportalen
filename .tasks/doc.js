'use strict';
let gulp = require("gulp"),
    typedoc = require("gulp-typedoc"),
    pkg = require("../package.json"),
    typedocConfig = require('../typedoc.json'),
    config = require('./@configuration.js');

gulp.task("doc", () => {
    return gulp
        .src(config.paths.sourceGlob)
        .pipe(typedoc(typedocConfig));
});