var gulp = require("gulp"),
    runSequence = require("run-sequence");


gulp.task("default", (done) => {
    runSequence("clean", "build:jsonresources", "package", "build:pnp", done)
});
gulp.task("default::prod", (done) => {
    runSequence("clean", "build:jsonresources", "package::prod", "build:pnp", done)
});