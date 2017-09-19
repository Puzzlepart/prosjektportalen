var path = require("path");

module.exports = (exclude) => ({
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
            "localization": path.resolve(__dirname, 'lib/js/@localization/index.js')
        }
    },
    module: {
        rules: [
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
                exclude: exclude
            },
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.json$/, loader: "json-loader" }
        ]
    }
});