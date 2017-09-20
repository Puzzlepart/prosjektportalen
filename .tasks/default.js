'use strict';
var gulp = require("gulp"),
    runSequence = require("run-sequence"),
    config = require('./@configuration.js');


gulp.task("default", (done) => {
    runSequence("clean", "build:jsonresources", "lint:ts", "package", "build:pnp", done)
});

/**
 * Set up gulp tasks for default::prod for each language in config.languages
 */
config.languages.forEach(lang => {
    gulp.task(`default::prod::${lang}`, (done) => {
        runSequence("clean", "build:jsonresources", "lint:ts", `package::prod::${lang}`, "build:pnp", done)
    });
})