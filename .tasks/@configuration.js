'use strict';
var autoprefixer = require('autoprefixer-stylus'),
    pkg = require("../package.json");

module.exports = {
    paths: {
        license: "license.md",
        dist: "./dist",
        distScripts: "./dist/scripts",
        lib: "./lib",
        build: "./build",
        release: "./release",
        source: "./src",
        nodeModules: "./node_modules",
        temp: "./temp",
        docs: "./docs",
        buildGlob: "./build/**/*",
        manualConfGlob: "./manual-conf/**/*",
        scriptsGlob: "./.scripts/**/*",
        sourceGlob: "./src/js/**/*.ts*",
        stylesGlob: "./src/**/*.styl",
        stylesMain: ["./src/*/pp.main.styl"],
        assetsFilesGlob: ["./src/**/*.png", "./src/**/*.txt"],
        libGlob: ["./lib/**/*.js", "./lib/**/**/*.js"],
        testGlob: ["./lib/js/_tests/**/*.js"],
        templates: "./templates",
        templates_temp: "./_templates",
        templatesGlob: "./templates/**/*",
        scripts: "./.scripts"
    },
    stylus: {
        compress: false,
        use: [autoprefixer('last 5 versions')]
    },
    lint: {
        formatter: "prose",
        emitError: true
    },
    resources: {
        glob: "./templates/root/*.resx",
        json: "./src/js/Resources"
    },
    theme: {
        glob: "./templates/root/Theme/Project.spcolor",
        styl: "./src/css/conf/"
    },
    version: {
        v: pkg.version,
        token: "{package-version}"
    },
    availableLanguages: [1033, 1044],
    siteTemplates: ["FullTemplate", "LiteTemplate"]
}