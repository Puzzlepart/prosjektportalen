var path = require("path"),
    webpack = require('webpack'),
    pkg = require("./package.json"),
    I18nPlugin = require("i18n-webpack-plugin");

const isExternal = ({ userRequest }) => {
    if (typeof userRequest !== 'string') {
        return false;
    }
    return userRequest.indexOf('node_modules') !== -1;
}

module.exports = (env = "dev", devtool = "source-map") => ({
    cache: true,
    entry: './lib/js/pp.main.js',
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "pp.main.js",
        libraryTarget: "umd",
    },
    devtool: devtool,
    stats: {
        hash: false,
        timing: false,
        assets: false,
        chunks: false,
        modules: false,
        reasons: true,
        children: false
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.txt'],
        alias: {
            Util: path.resolve(__dirname, 'lib/js/Util'),
            Provision: path.resolve(__dirname, 'lib/js/Provision'),
            Model: path.resolve(__dirname, 'lib/js/Model'),
        }
    },
    module: {
        loaders: [
            Object.assign({
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            require("babel-preset-es2015"),
                            require("babel-preset-react"),
                        ],
                        plugins: [
                            require("babel-plugin-transform-class-properties"),
                        ]
                    }
                }
            }, (env === "dev") ? { exclude: /node_modules/ } : {}),
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.json$/, loader: "json-loader" }
        ]
    },
    plugins: [
        new I18nPlugin(require("./src/js/Resources/no-NB.json")),
        new webpack.DefinePlugin({
            __VERSION: JSON.stringify(pkg.version)
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
    ].concat(
        (env.toLowerCase() === "prod") ? [
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false, drop_console: true },
                beautify: false,
                comments: false,
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
        ] : []
        ),
    node: { fs: 'empty' },
    externals: [
        { './cptable': 'var cptable' },
        { './jszip': 'jszip' }
    ]
});