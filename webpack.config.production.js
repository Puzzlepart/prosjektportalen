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

module.exports = () => {
    const plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: "pp.vendor.js",
            minChunks: (module) => isExternal(module)
        }),
        new I18nPlugin(require("./src/js/Resources/no-NB.json")),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version)
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            },
            beautify: false,
            comments: false,
            mangle: false
        })];
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
        entry: './lib/js/pp.main.js',
        output: {
            
            path: path.join(__dirname, "dist/js"),
            filename: "pp.main.js",
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
            rules: rules,
        },
        plugins: plugins
    };
    return config;
}