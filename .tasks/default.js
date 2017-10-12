'use strict';
var gulp = require("gulp"),
    runSequence = require("run-sequence");

gulp.task("default", (done) => {
    runSequence("clean", "buildJsonResources", "tsLint", "packageProd", "buildPnpTemplateFiles", done)
});