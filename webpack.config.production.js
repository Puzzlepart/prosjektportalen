var path = require("path"),
    webpack = require('webpack'),
    pkg = require("./package.json"),
    base = require("./webpack.config.base.js"),
    objectAssign = require('object-assign');

module.exports = (devtool = "source-map") => {
    let config = objectAssign(base([]), {
        devtool: devtool,
        plugins: [
            new webpack.DefinePlugin({
                __VERSION: JSON.stringify(pkg.version)
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production'),
                }
            }),
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|nb/),
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
            new webpack.optimize.AggressiveMergingPlugin(),
        ]
    });
    return config;
}
