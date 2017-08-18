var path = require("path"),
    webpack = require('webpack'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    pkg = require("./package.json"),
    build = require("./build.json"),
    I18nPlugin = require("i18n-webpack-plugin");

module.exports = (minify = true, bundleAnalyzer = false) => {
    const I18n = {
        1033: require("./src/js/Resources/en-US.json"),
        1044: require("./src/js/Resources/no-NB.json"),
    };

    const plugins = [
        new I18nPlugin(I18n[build.language]),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version)
        }),
        new webpack.DefinePlugin({
            __BUILD: build
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                LANGUAGE: JSON.stringify(build.language),
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
        { test: /\.txt$/, use: 'raw-loader' },
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
            extensions: ['.jsx', '.js', '.json', '.txt']
        },
        module: {
            rules: rules
        },
        plugins: plugins
    };
    return config;
}