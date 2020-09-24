'use strict';
module.exports = {
    paths: {
        license: 'license.md',
        dist: './dist',
        lib: './lib',
        build: './build',
        release: './release',
        source: './src',
        nodeModules: './node_modules',
        temp: './temp',
        docs: './docs',
        templates: './templates',
        templatesTemp: './_templates',
        scripts: './scripts',
        spAssetsFolder: 'siteassets/pp',
    },
    globs: {
        build: './build/**/*',
        manualConf: './manual-conf/**/*',
        scripts: './scripts/**/*',
        js: './src/js/**/*.ts*',
        templates: './templates/**/*',
        theme: './templates/root/Theme/Project.spcolor',
        resxJson: './src/js/**/*.json',
        resx: './templates/root/*.resx',
        preferences: './templates/root/Preferences.xml'
    },
    versionToken: '{package-version}',
    availableLanguages: [1033, 1044],
    siteTemplates: [
        'FullTemplate',
        'LiteTemplate',
    ],
    thirdPartyLibs: [
        'xlsx/dist/xlsx.full.min.js',
        'file-saver/dist/FileSaver.min.js',
    ],
}