let gulp = require("gulp"),
    typedoc = require("gulp-typedoc"),
    pkg = require("../package.json"),
    config = require('./@configuration.js');

gulp.task("doc", () => {
    return gulp
        .src(config.paths.sourceGlob)
        .pipe(typedoc({
            target: "es2015",
            module: "commonjs",
            jsx: "react",
            includeDeclarations: true,
            hideGenerator: true,
            out: "./docs",
            name: pkg.name,
            ignoreCompilerErrors: true,
            version: true,
            readme: "./readme.md",
        }));
});