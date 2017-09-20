'use strict';
var gulp = require("gulp"),
    runSequence = require("run-sequence");


gulp.task("default", (done) => {
    runSequence("clean", "build:jsonresources", "lint:ts", "package", "build:pnp", done)
});


gulp.task(`default::prod`, (done) => {
    runSequence("clean", "build:jsonresources", "lint:ts", "package::prod", "build:pnp", done)
});