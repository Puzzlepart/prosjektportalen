/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const { CheckerPlugin } = require('awesome-typescript-loader')
const libBasePath = path.join(__dirname, 'lib')
const distBasePath = path.join(__dirname, 'dist/js')

const env = [
    '@babel/preset-env',
    {
        corejs: { version: 3 },
        useBuiltIns: 'entry',
        targets: {
            'chrome': '58',
            'ie': '11'
        },
        modules: 'commonjs',
    }]

module.exports = () => ({
    stats: 'minimal',
    devtool: 'source-map',
    entry: {
        main: [
            'core-js/es6/map',
            'core-js/es6/set',
            'core-js/fn/object/assign',
            'core-js/es6/promise',
            'whatwg-fetch',
            '@pnp/polyfill-ie11',
            'regenerator-runtime/runtime',
            './src/js/index.tsx',
        ],
    },
    output: {
        path: distBasePath,
        filename: 'pp.[name].js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.css', '.styl', '.json'],
        alias: { model: path.resolve(libBasePath, 'Model/index.js') }
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
                        presets: [env]
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
                                presets: [env]
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
})