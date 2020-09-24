/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./webpack.config')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const { merge } = require('webpack-merge')

let port = 9001

try {
    const watch = require('./tasks/@watch.json')
    port = watch.port
} catch (error) {
    throw 'Can´t initialize watch task without ./tasks/@watch.json'
}

module.exports = merge(
    config,
    {
        mode: 'development',
        stats: 'minimal',
        devtool: 'eval',
        devServer: {
            open: false,
            disableHostCheck: true,
            compress: true,
            port,
        },
        plugins: [
            new LiveReloadPlugin()
        ]
    })