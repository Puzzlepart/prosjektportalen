'use strict'
const gulp = require('gulp')
const typescript = require('gulp-typescript')
const config = require('./@configuration.js')
const merge = require('merge2')
const rename = require('gulp-rename')
const resx2 = require('gulp-resx2')
const xml2json = require('gulp-xml2json')
const spcs = require('gulp-spcolor-stylus')
const replace = require('gulp-replace')
const flatmap = require('gulp-flatmap')
const es = require('event-stream')
const path = require('path')
const powershell = require('./utils/powershell.js')
const git = require('./utils/git.js')
const file = require('./utils/file.js')
const format = require('string-format')
const bom = require('gulp-bom')
const pkg = require('../package.json')
const sequence = require('run-sequence')
const argv = require('yargs').argv
const resxConverter = require('gulp-resx-convert');

//#region Helpers
function replaceVersionToken(hash) {
    return replace(config.versionToken, format('{0}.{1}', pkg.version, hash))
}
//#endregion

gulp.task('buildPnpTemplateFiles', done => {
    sequence(
        'copyPnpTemplates',
        'localizePnpTemplates',
        'copyResourcesToAssetsTemplate',
        'copyThirdPartyLibsToTemplate',
        'stampVersionToTemplates',
        done
    );
})

gulp.task('buildLib', ['copyResourcesToLib'], () => {
    const project = typescript.createProject('tsconfig.json', { declaration: true })
    const built = gulp.src(config.globs.js).pipe(project(typescript.reporter.fullReporter()))
    return merge([
        built.dts.pipe(gulp.dest(config.paths.lib)),
        built.js.pipe(gulp.dest(config.paths.lib))
    ])
})

gulp.task('buildAssets', done => {
    sequence(
        'clean',
        'buildTheme',
        'buildJsonResources',
        'buildJsonPreferences',
        done
    )
})

// gulp.task('buildJsonResources', () => {
//     return gulp.src(config.globs.resx)
//         .pipe(resx2())
//         .pipe(rename({ extname: '.json' }))
//         .pipe(gulp.dest(path.join(config.paths.source, 'js', 'Resources')))
// })


gulp.task('buildJsonResources', function () {
    gulp.src(config.globs.resx) //Pipe one or more files at a time
        .pipe(resxConverter.convert({
            //Include this for JSON
            json: {},
            //Include this for TypeScript
            typescript: {
                //Disables support for culture names in file name (ex: File.en-US.resx or File.en.resx).
                //Default: false
                culturesDisabled: false,
                //Sets the namespace to be used.
                //Default: Resx
                namespace: 'Resx',
                //Enables converting to .ts files.
                //Default: false
                source: true,
                //Enables converting to .d.ts files
                //Default: false
                declaration: false
            },
        }))
        .pipe(gulp.dest(path.join(config.paths.source, 'js', 'Resources')))
});

gulp.task('buildJsonPreferences', () => {
    return gulp.src(config.globs.preferences)
        .pipe(xml2json())
        .pipe(rename({ extname: '.json' }))
        .pipe(gulp.dest(path.join(config.paths.source, 'js', 'Preferences')))
})

gulp.task('buildTheme', () => {
    return gulp.src(config.globs.theme)
        .pipe(spcs())
        .pipe(rename(path => { path.extname += '.styl' }))
        .pipe(gulp.dest(path.join(config.paths.source, 'css', 'conf')))
})


gulp.task('stampVersionToTemplates', done => {
    const src = gulp.src(path.join(config.paths.templatesTemp, '**', '*.xml'))
    git.hash(hash => {
        es.concat(src.pipe(flatmap((stream, file) => {
            return stream
                .pipe(replaceVersionToken(hash))
                .pipe(gulp.dest(config.paths.templatesTemp))
        }))).on('end', done)
    })
})

gulp.task('stampVersionToScripts', done => {
    const src = gulp.src(path.join(config.paths.dist, '*.ps1'))
    git.hash(hash => {
        es.concat(src.pipe(flatmap(stream => {
            return stream
                .pipe(replaceVersionToken(hash))
                .pipe(bom())
                .pipe(gulp.dest(config.paths.dist))
        }))).on('end', done)
    })
})

gulp.task('convertPnpTemplates', done => {
    powershell.execute('Build-PnP-Templates.ps1', '')
        .then(done)
        .catch(err => done(err))
})

function getTemplateJson(tmpl, lcid) {
    const jsPath = format('../lib/Provision/Template/_/{0}.js', tmpl)
    global._spPageContextInfo = { webLanguage: lcid }
    const tmplJs = require(jsPath).default
    return JSON.stringify(tmplJs)
}

function _buildSiteTemplate(lcid) {
    return new Promise((resolve, reject) => {
        const files = []
        const filepath = path.join(__dirname, '../_templates', 'root-{0}', 'SiteTemplates', '{1}.txt')
        config.siteTemplates.forEach(tmpl => {
            files.push({
                path: format(filepath, lcid.toString(), tmpl),
                contents: getTemplateJson(tmpl, lcid),
            })
        })
        Promise.all(files.map(f => file.write(f.path, f.contents))).then(resolve, reject)
    })
}

gulp.task('buildSiteTemplates', ['buildLib'], done => {
    if (argv.lcid) {
        _buildSiteTemplate(argv.lcid).then(() => {
            done()
        })
    } else {
        done('Argument --lcid not specified')
    }
})