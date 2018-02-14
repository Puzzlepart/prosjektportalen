"use strict";
const gulp = require("gulp"),
    path = require("path"),
    es = require("event-stream"),
    format = require("string-format"),
    config = require("./@configuration.js");

gulp.task("copyReleaseFiles", ["copyBuildFiles", "copyManualConfig", "copyScripts", "copyLicense"], done => {
    done();
})

gulp.task("copyLicense", () => {
    return gulp.src(config.paths.license).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyBuildFiles", () => {
    return gulp.src(config.globs.build).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyScripts", () => {
    return gulp.src(config.globs.scripts).pipe(gulp.dest(path.join(config.paths.dist, "scripts")))
});

gulp.task("copyManualConfig", () => {
    return gulp.src(config.globs.manualConf).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyAssetsToDist", () => {
    const src = config.assets.fileTypes.map(ext => path.join(config.paths.source, "**", `*.${ext}`));
    return gulp.src(src).pipe(gulp.dest(config.paths.dist))
});

gulp.task("copyResourcesToLib", () => {
    return gulp.src(config.globs.resxJson).pipe(gulp.dest(config.paths.lib))
});

gulp.task("copyPnpTemplates", () => {
    return gulp.src(config.globs.templates).pipe(gulp.dest(config.paths.templatesTemp));
});

gulp.task("copyPnpRootTemplate", () => {
    const src = gulp.src(path.join(config.paths.templatesTemp, "root", "**", "*"));
    return es.concat(config.availableLanguages.map(lcid => {
        return src.pipe(gulp.dest(path.join(config.paths.templatesTemp, `root-${lcid}`)));
    }));
});

gulp.task("copyPnpAssetsTemplate", () => {
    const src = gulp.src(path.join(config.paths.templatesTemp, "assets", "**", "*"));
    return es.concat(config.availableLanguages.map(lcid => {
        return src.pipe(gulp.dest(path.join(config.paths.templatesTemp, `assets-${lcid}`)));
    }));
});

gulp.task("localizePnpTemplates", ["copyPnpRootTemplate", "copyPnpAssetsTemplate"], done => {
    done();
});

gulp.task("copyConfigToAssetsTemplate", () => {
    return es.concat(config.availableLanguages.map(lcid => {
        const glob = path.join(config.paths.source, "config", lcid.toString(), `*.txt`);
        const src = gulp.src(glob);
        return src.pipe(gulp.dest(path.join(config.paths.templatesTemp, `assets-${lcid}`, "config")));
    }));
});

gulp.task("copyResourcesToAssetsTemplate", ["copyConfigToAssetsTemplate"], () => {
    const glob = ["js", "css", ...config.assets.fileTypes].map(ext => {
        return path.join(config.paths.dist, "**", `*.${ext}`);
    });
    const src = gulp.src(glob);
    return es.concat(config.availableLanguages.map(lcid => {
        return src.pipe(gulp.dest(path.join(config.paths.templatesTemp, `assets-${lcid}`)));
    }));
});

gulp.task("copyThirdPartyLibsToTemplate", () => {
    const glob = config.thirdPartyLibs.map(libRelPath => {
        return path.join(config.paths.nodeModules, libRelPath);
    });
    const src = gulp.src(glob);
    return src.pipe(gulp.dest(path.join(config.paths.templatesTemp, "thirdparty", "libs")));
});