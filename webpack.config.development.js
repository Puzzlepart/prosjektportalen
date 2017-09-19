var path = require("path"),
    webpack = require('webpack'),
    pkg = require("./package.json"),
    base = require("./webpack.config.base.js"),
    objectAssign = require('object-assign');

module.exports = (devtool = "source-map") => {
    let config = objectAssign(base([path.join(__dirname, "node_modules")]), {
        devtool: devtool,
        plugins: [
            new webpack.DefinePlugin({
                __VERSION: JSON.stringify(pkg.version)
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                }
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/),
        ]
    });
    return config;
}