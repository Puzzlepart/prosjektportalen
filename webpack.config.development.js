var path = require("path"),
    webpack = require('webpack'),
    pkg = require("./package.json"),
    I18nPlugin = require("i18n-webpack-plugin");

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('node_modules') >= 0;
}

module.exports = (devtool = "source-map") => {
    const plugins = [
        new I18nPlugin(require("./src/js/Resources/no-NB.json")),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version)
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/)];
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
            main: ['babel-polyfill', './lib/js/index.js'],
            loader: './lib/js/Loader.js'
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
            rules: rules,
            noParse: [/jszip.js$/]
        },
        plugins: plugins,
        node: {
            fs: 'empty',
            Buffer: false
        },
        externals: [
            { "./cptable": "var cptable", "./jszip": "jszip" }
        ],
    };
    return config;
}