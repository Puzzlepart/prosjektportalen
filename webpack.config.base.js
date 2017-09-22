var path = require("path");

const libBasePath = path.join(__dirname, "lib/js/");
const distBasePath = path.join(__dirname, "dist/js");

module.exports = (exclude) => ({
    cache: true,
    entry: {
        main: [
            'core-js/fn/object/assign',
            'core-js/es6/promise',
            'whatwg-fetch',
            'regenerator-runtime/runtime',
            './lib/js/index.js',
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
            "localization": path.resolve(libBasePath, '@localization/index.js'),
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
                        presets: ["react", "env"],
                        plugins: [
                            require("babel-plugin-transform-class-properties")
                        ]
                    }
                },
                exclude
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
    }
});