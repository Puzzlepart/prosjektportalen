'use strict';
var gulp = require("gulp"),
    typescript = require("gulp-typescript"),
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
    file = require("./utils/file.js"),
    format = require("string-format"),
    pkg = require("../package.json");

gulp.task("copyAssetsToDist", () => {
    return gulp.src(config.paths.assetsFilesGlob)        .pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyResourcesToLib", () => {
    return gulp.src("./src/js/**/*.json")        .pipe(gulp.dest(config.paths.lib))
});

gulp.task("buildLib", ["copyResourcesToLib"], () => {
    var project = typescript.createProject("tsconfig.json", { declaration: true });
    var built = gulp.src(config.paths.sourceGlob)
        .pipe(project(typescript.reporter.fullReporter()));
    return merge([built.dts.pipe(gulp.dest(config.paths.lib)), built.js.pipe(gulp.dest(config.paths.lib))]);
});

gulp.task("buildJsonResources", () => {
    return gulp.src(config.resources.glob)
        .pipe(resx2())
        .pipe(rename(path => {
            path.extname = ".json"
        }))
        .pipe(gulp.dest(config.resources.json));
});

gulp.task("buildTheme", () => {
    return gulp.src(config.theme.glob)
        .pipe(spcs())
        .pipe(rename(path => {
            path.extname += ".styl"
        }))
        .pipe(gulp.dest(config.theme.styl));
});

gulp.task("copyPnpTemplates", () => {
    return gulp.src(config.paths.templatesGlob)
        .pipe(gulp.dest(config.paths.templates_temp));
});

gulp.task("copyPnpRootTemplate", () => {
    var src = gulp.src(format("{0}/root/**/*", config.paths.templates_temp));
    return es.concat(config.availableLanguages.map(lcid => src.pipe(gulp.dest(format("{0}/root-{1}", config.paths.templates_temp, lcid)))));
});

gulp.task("copyResourcesToAssetsTemplate", () => {
    var src = gulp.src([
        format("{0}/**/*.js", config.paths.dist),
        format("{0}/**/*.css", config.paths.dist),
        format("{0}/**/*.png", config.paths.dist),
        format("{0}/**/*.txt", config.paths.dist),
        format("{0}/**/*.js", config.paths.build)])
    return es.concat(config.availableLanguages.map(lcid => src.pipe(gulp.dest(format("{0}/assets-{1}", config.paths.templates_temp, lcid)))));
});

gulp.task("copyThirdPartyLibsToTemplate", () => {
    var src = gulp.src([
        format("{0}/xlsx/dist/xlsx.full.min.js", config.paths.nodeModules),
        format("{0}/file-saver/FileSaver.min.js", config.paths.nodeModules)
    ]);
    return src.pipe(gulp.dest(format("{0}/thirdparty/libs", config.paths.templates_temp)));
});

gulp.task("stampVersionToTemplates", done => {
    git.hash(hash => {
        gulp.src("./_templates/**/*.xml")
            .pipe(flatmap((stream, file) => {
                return stream
                    .pipe(replace(config.version.token, format("{0}.{1}", config.version.v, hash)))
                    .pipe(gulp.dest(config.paths.templates_temp))
            }))
            .on('end', done);
    });
});

gulp.task("stampVersionToDist", done => {
    git.hash(hash => {
        es.concat(
            gulp.src("./dist/*.ps1")
                .pipe(flatmap((stream, file) => {
                    return stream
                        .pipe(replace(config.version.token, format("{0}.{1}", config.version.v, hash)))
                        .pipe(gulp.dest(config.paths.dist))
                }))
        )
            .on('end', done);
    });
});

gulp.task("buildPnpTemplateFiles", done => {
    runSequence("copyPnpTemplates", "copyPnpRootTemplate", "copyResourcesToAssetsTemplate", "buildSiteTemplates", "copyThirdPartyLibsToTemplate", "stampVersionToTemplates", () => {
        powershell.execute("Build-PnP-Templates.ps1", "", done);
    })
});

gulp.task("buildSiteTemplates", done => {
    // Faking _spPageContextInfo to be able to use localization
    global._spPageContextInfo = {};

    const files = [];
    const filepath = path.join(__dirname, "../_templates", "assets-{0}", "sitetemplates", "{1}.txt");

    config.siteTemplates.forEach(tmpl => {
        const tmplJs = require(format("../lib/Provision/Template/{0}.js", tmpl)).default;
        config.availableLanguages.forEach(lang => {
            files.push({
                path: format(filepath, lang.toString(), tmpl),
                contents: JSON.stringify(tmplJs(lang)),
            });
        });
    });
    const fileWritePromises = [];
    files.forEach(f => {
        fileWritePromises.push(file.write(f.path, f.contents));
    });
    Promise.all(fileWritePromises).then(() => done());
});
