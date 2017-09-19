'use strict';
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
    es = require('event-stream'),
    path = require("path"),
    runSequence = require("run-sequence"),
    powershell = require("./utils/powershell.js"),
    git = require("./utils/git.js"),
    format = require("string-format"),
    pkg = require("../package.json");

gulp.task("copy:assets:dist", () => {
    return gulp.src(config.paths.assetsFilesGlob)
        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copy:resources:lib", () => {
    return gulp.src("./src/**/*.json")
        .pipe(gulp.dest(config.paths.lib))
});

gulp.task("build:lib", ["copy:resources:lib"], () => {
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

gulp.task("copy:pnp::root", cb => {
    var root = format("{0}/root/**/*", config.paths.templates_temp);
    es.concat(
        gulp.src(root)
            .pipe(gulp.dest(format("{0}/root-1033", config.paths.templates_temp))),
        gulp.src(root)
            .pipe(gulp.dest(format("{0}/root-1044", config.paths.templates_temp)))
    ).on('end', cb);
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

gulp.task("stamp:version::templates", cb => {
    git.hash(hash => {
        es.concat(
            gulp.src("./_templates/**/*.xml")
                .pipe(flatmap((stream, file) => {
                    return stream
                        .pipe(replace(config.version.token, format("{0}#{1}", config.version.v, hash)))
                        .pipe(gulp.dest(config.paths.templates_temp))
                }))
        )
            .on('end', cb);
    });
});

gulp.task("stamp:version::dist", cb => {
    git.hash(hash => {
        es.concat(
            gulp.src("./dist/*.ps1")
                .pipe(flatmap((stream, file) => {
                    return stream
                        .pipe(replace(config.version.token, format("{0}#{1}", config.version.v, hash)))
                        .pipe(gulp.dest(config.paths.dist))
                }))
        )
            .on('end', cb);
    });
});

gulp.task("build:pnp", (done) => {
    runSequence("copy:pnp", "copy:pnp::root", "copy:dist", "stamp:version::templates", () => {
        powershell.execute("Build-PnP-Templates.ps1", "", done);
    })
});