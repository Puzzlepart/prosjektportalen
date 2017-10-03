'use strict';
var exec = require('child_process').exec,
    format = require('string-format'),
    config = require("../@configuration.js");

var exports = module.exports = {};

exports.execute = (filePath, args, done) => {
    const cmd = format("Powershell.exe  -executionpolicy remotesigned -File {0}/{1} {2}", config.paths.scripts, filePath, args);
    exec(cmd, (err, stdout, stderr) => {
        done(err, stdout, stderr);
    });
}