var path = require("path"),
    webpack = require('webpack'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    pkg = require("./package.json"),
    build = require("./build.json");

module.exports = (minify = true, bundleAnalyzer = false) => {
    const plugins = [
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version)
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/),
    ];
    if (minify) {
        plugins.push(
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
            new webpack.optimize.AggressiveMergingPlugin());
    }
    if (bundleAnalyzer) {
        plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static'
            })
        )
    }
    let rules = [
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        require("babel-preset-es2015"),
                        require("babel-preset-react")
                    ],
                    plugins: [
                        require("babel-plugin-transform-class-properties")
                    ]
                }
            }
        },
        { test: /\.json$/, loader: "json-loader" }
    ]
    let config = {
        cache: true,
        entry: {
            main: [
                'core-js/fn/object/assign',
                'core-js/es6/promise',
                'whatwg-fetch',
                './lib/js/index.js'],
        },
        output: {
            path: path.join(__dirname, "dist/js"),
            filename: "pp.[name].js",
            libraryTarget: "umd",
        },
        devtool: "source-map",
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
            extensions: ['.jsx', '.js', '.json']
        },
        module: {
            rules: rules
        },
        plugins: plugins
    };
    return config;
}