'use strict';
var gulp = require("gulp"),
    runSequence = require("run-sequence");


gulp.task("default", (done) => {
    runSequence("clean", "buildJsonResources", "tslint", "package", "buildPnp", done)
});


gulp.task(`defaultProd`, (done) => {
    runSequence("clean", "buildJsonResources", "tslint", "packageProd", "buildPnp", done)
});