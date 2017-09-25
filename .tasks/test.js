const gulp = require("gulp"),
    mocha = require("gulp-mocha"),
    config = require('./@configuration.js');

gulp.task("test", ["buildLib"], () => {
    return gulp.src(config.paths.testGlob)
        .pipe(mocha({
            reporter: "spec"
        }));
});