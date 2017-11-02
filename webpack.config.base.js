var path = require("path"),
    webpack = require('webpack'),
    pkg = require("./package.json"),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const libBasePath = path.join(__dirname, "lib");
const distBasePath = path.join(__dirname, "dist/js");
const useBundleAnalyzer = false;

module.exports = (devtool, exclude, env) => ({
    devtool: devtool,
    entry: {
        main: [
            'core-js/fn/object/assign',
            'core-js/es6/promise',
            'whatwg-fetch',
            'regenerator-runtime/runtime',
            './lib/index.js',
        ],
    },
    output: {
        path: distBasePath,
        filename: "pp.[name].js",
        libraryTarget: "umd",
    },
    stats: {
        hash: true,
        timing: true,
        assets: true,
        chunks: true,
        modules: true,
        reasons: true,
        children: true
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.txt'],
        alias: {
            "model": path.resolve(libBasePath, 'Model/index.js')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["react", "env", "es2015"],
                        plugins: [
                            require("babel-plugin-transform-class-properties"),
                            require("babel-plugin-transform-object-assign"),
                        ]
                    }
                },
                exclude: exclude
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version),
            'process.env': {
                NODE_ENV: JSON.stringify(env)
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/),
    ]
        .concat(env === "production" ? [
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                compress: {
                    warnings: false,
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    screw_ie8: true
                },
                output: {
                    comments: false,
                },
            }),
            new webpack.optimize.AggressiveMergingPlugin()
        ] : [])
        .concat(useBundleAnalyzer ? [
            new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            })
        ] : [])
});