let autoprefixer = require('autoprefixer-stylus'),
    pkg = require("../package.json");

module.exports = {
    paths: {
        dist: "./dist",
        lib: "./lib",
        build: "./build",
        release: "./release",
        source: "./src",
        temp: "./temp",
        docs: "./docs",
        buildGlob: "./build/**/*",
        manualConfGlob: "./manual-conf/**/*",
        sourceGlob: "./src/**/*.ts*",
        stylesGlob: "./src/**/*.styl",
        stylesMain: ["./src/*/pp.main.styl", "./src/*/pp.project.styl"],
        libFilesGlob: ["./src/**/*.txt", "./src/**/*.json"],
        assetsFilesGlob: ["./src/**/*.png"],
        libGlob: ["./lib/**/*.js", "./lib/**/**/*.js"],
        searchDispTemplatesGlob: "./templates/root/DisplayTemplates/Search/*",
        filtersDispTemplatesGlob: "./templates/root/DisplayTemplates/Filters/*",
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
        token: "[version]",
        globs: ["./_templates/**/*.xml"]
    }
}
