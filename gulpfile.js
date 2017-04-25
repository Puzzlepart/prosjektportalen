"use strict";
var path = require("path"),
    fs = require("fs"),
    format = require('string-format'),
    load = ["./.tasks"];

load.forEach(path => {
    fs.readdirSync(path).forEach(function (file) {
        if (file.endsWith(".js")) require(format("{0}/{1}", path, file));
    });
})