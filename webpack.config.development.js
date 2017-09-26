var path = require("path"),
    __base = require("./webpack.config.base.js");

module.exports = (devtool = "source-map") => {
    return __base("source-map", [path.join(__dirname, "node_modules")], "development");
}