var path = require("path"),
    __base = require("./webpack.config.base.js");

module.exports = () => {
    return __base("source-map", [path.join(__dirname, "node_modules/disposables")], "production");
}