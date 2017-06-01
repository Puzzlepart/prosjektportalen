var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    config = require('./@configuration.js'),
    merge = require("merge2"),
    rename = require("gulp-rename"),
    resx2 = require('gulp-resx2'),
    sourcemaps = require('gulp-sourcemaps'),
    spcs = require("gulp-spcolor-stylus"),
    replace = require('gulp-replace'),
    flatmap = require("gulp-flatmap"),
    fs = require('fs'),
    path = require("path"),
    runSequence = require("run-sequence"),
    powershell = require("./utils/powershell.js"),
    format = require("string-format"),
    pkg = require("../package.json");

gulp.task("copy:assets:lib", () => {
    return gulp.src(config.paths.libFilesGlob)
        .pipe(gulp.dest(config.paths.lib))
});

gulp.task("copy:assets:dist", () => {
    return gulp.src(config.paths.assetsFilesGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("build:lib", ["copy:assets:lib"], () => {
    var project = tsc.createProject("tsconfig.json", { declaration: true });
    var built = gulp.src(config.paths.sourceGlob)
        .pipe(project(tsc.reporter[config.typescript.reporter]()));
    return merge([
        built.dts.pipe(gulp.dest(config.paths.lib)),
        built.js.pipe(gulp.dest(config.paths.lib))
    ]);
});

gulp.task("build:jsonresources", () => {
    return gulp.src(config.resources.glob)
        .pipe(resx2())
        .pipe(rename(path => {
            path.extname = ".json"
        }))
        .pipe(gulp.dest(config.resources.json));
});

gulp.task("build:theme", () => {
    return gulp.src(config.theme.glob)
        .pipe(spcs())
        .pipe(rename(path => {
            path.extname += ".styl"
        }))
        .pipe(gulp.dest(config.theme.styl));
});

gulp.task("copy:pnp", () => {
    return gulp.src(config.paths.templatesGlob)
        .pipe(gulp.dest(config.paths.templates_temp));
});

gulp.task("copy:dist", () => {
    return gulp.src([
        format("{0}/**/*.js", config.paths.dist),
        format("{0}/**/*.css", config.paths.dist),
        format("{0}/**/*.png", config.paths.dist),
        format("{0}/**/*.js", config.paths.build)]
    )
        .pipe(gulp.dest(format("{0}/assets", config.paths.templates_temp)));
});

gulp.task("stamp:version::templates", () => {
    return gulp.src("./_templates/**/*.xml")
        .pipe(flatmap(function (stream, file) {
            return stream
                .pipe(replace(config.version.token, config.version.v))
                .pipe(gulp.dest(config.paths.templates_temp))
        }));
});

gulp.task("stamp:version::dist", () => {
    return gulp.src("./dist/*.ps1")
        .pipe(flatmap(function (stream, file) {
            return stream
                .pipe(replace(config.version.token, config.version.v))
                .pipe(gulp.dest(config.paths.dist))
        }));
});

gulp.task("build:pnp", (done) => {
    runSequence("copy:pnp", "copy:dist", "stamp:version::templates", () => {
        powershell.execute("Build-PnP-Templates.ps1", "", done);
    })
});