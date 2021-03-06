/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const { CheckerPlugin } = require('awesome-typescript-loader')
const dest = path.join(__dirname, 'dist/js')

/**
 * Presets for @babel
 */
const presets = {
    env: [
        '@babel/preset-env',
        {
            corejs: { version: 3 },
            useBuiltIns: 'entry',
            targets: {
                chrome: '58',
                ie: '11'
            },
            modules: 'commonjs',
        }]
}

module.exports = {
    stats: 'errors-only',
    devtool: 'none',
    entry: {
        main: [
            'core-js/stable',
            'whatwg-fetch',
            '@pnp/polyfill-ie11',
            'regenerator-runtime/runtime',
            './src/js/index.tsx',
        ],
    },
    output: {
        path: dest,
        filename: 'pp.[name].js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.styl', '.json']
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader?paths=node_modules/bootstrap-stylus/stylus/'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [presets.env]
                    }
                },
                include: [path.resolve(__dirname, 'node_modules/sp-js-provisioning')]
            },
            {
                test: /\.ts(x?)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useCache: true,
                            useBabel: true,
                            babelOptions: {
                                babelrc: false,
                                presets: [presets.env]
                            },
                            babelCore: '@babel/core'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version),
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/),
    ]
}