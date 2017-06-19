var path = require("path"),
    webpack = require('webpack'),
    pkg = require("./package.json"),
    build = require("./build.json"),
    I18nPlugin = require("i18n-webpack-plugin");

const I18n = {
    1033: require("./src/js/Resources/en-US.json"),
    1044: require("./src/js/Resources/no-NB.json"),
};

module.exports = (devtool) => {
    const plugins = [
          new I18nPlugin(I18n[build.language]),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version)
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development'),
                LANGUAGE: JSON.stringify(build.language),
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/),
    ];
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
            },
            exclude: [
                path.join(__dirname, "node_modules")
            ]
        },
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.json$/, loader: "json-loader" }
    ]
    let config = {
        cache: true,
        entry: {
            main: ['babel-polyfill', 'whatwg-fetch','./lib/js/index.js']
        },
        output: {
            path: path.join(__dirname, "dist/js"),
            filename: "pp.[name].js",
            libraryTarget: "umd",
        },
        devtool: devtool,
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