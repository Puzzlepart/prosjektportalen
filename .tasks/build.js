'use strict';
const gulp = require("gulp"),
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
    log = require("fancy-log"),
    runSequence = require("run-sequence"),
    powershell = require("./utils/powershell.js"),
    git = require("./utils/git.js"),
    file = require("./utils/file.js"),
    format = require("string-format"),
    pkg = require("../package.json");

gulp.task("buildLib", ["copyResourcesToLib", "tsLint"], () => {
    const project = typescript.createProject("tsconfig.json", { declaration: true });
    const built = gulp.src(config.globs.js).pipe(project(typescript.reporter.fullReporter()));
    return merge([built.dts.pipe(gulp.dest(config.paths.lib)), built.js.pipe(gulp.dest(config.paths.lib))]);
});

gulp.task("buildJsonResources", () => {
    return gulp.src(config.globs.resx)
        .pipe(resx2())
        .pipe(rename(path => {
            path.extname = ".json"
        }))
        .pipe(gulp.dest(path.join(config.paths.source, "js", "Resources")));
});

gulp.task("buildTheme", () => {
    return gulp.src(config.globs.theme)
        .pipe(spcs())
        .pipe(rename(path => { path.extname += ".styl" }))
        .pipe(gulp.dest(path.join(config.paths.source, "css", "conf")));
});

function replaceVersionToken(hash) {
    return replace(config.versionToken, format("{0}.{1}", pkg.version, hash));
}

gulp.task("stampVersionToTemplates", done => {
    const src = gulp.src(path.join(config.paths.templatesTemp, "**", "*.xml"));
    git.hash(hash => {
        es.concat(src.pipe(flatmap((stream, file) => {
            return stream
                .pipe(replaceVersionToken(hash))
                .pipe(gulp.dest(config.paths.templatesTemp))
        }))).on('end', done);
    });
});

gulp.task("stampVersionToScripts", done => {
    const src = gulp.src(path.join(config.paths.dist, "*.ps1"));
    git.hash(hash => {
        es.concat(src.pipe(flatmap((stream, file) => {
            return stream
                .pipe(replaceVersionToken(hash))
                .pipe(gulp.dest(config.paths.dist))
        }))).on('end', done);
    });
});

gulp.task("buildPnpTemplateFiles", done => {
    runSequence("copyPnpTemplates", "localizePnpTemplates", "copyResourcesToAssetsTemplate", "buildSiteTemplates", "copyThirdPartyLibsToTemplate", "stampVersionToTemplates", () => {
        powershell.execute("Build-PnP-Templates.ps1", "", done);
    })
});

gulp.task("buildSiteTemplates", done => {
    // Faking _spPageContextInfo to be able to use localization
    global._spPageContextInfo = {};

    const files = [];
    const jspath = "../lib/Provision/Template/_/{0}.js";
    const filepath = path.join(__dirname, "../_templates", "assets-{0}", "sitetemplates", "{1}.txt");

    config.siteTemplates.forEach(tmpl => {
        const tmplJs = require(format(jspath, tmpl)).default;
        config.availableLanguages.forEach(lcid => {
            log(`(buildSiteTemplates) Building site template ${tmpl} for language ${lcid}`)
            files.push({
                path: format(filepath, lcid.toString(), tmpl),
                contents: JSON.stringify(tmplJs(lcid)),
            });
        });
    });
    const fileWritePromises = [];
    files.forEach(f => {
        fileWritePromises.push(file.write(f.path, f.contents));
    });
    Promise.all(fileWritePromises).then(() => done());
});
