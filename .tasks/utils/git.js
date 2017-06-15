'use strict';
var gulp = require("gulp"),
    exec = require('child_process').exec;

var exports = module.exports = {};

exports.hash = function (cb) {
    exec('git rev-parse --short=8 HEAD', function (err, stdout, stderr) {
        cb(stdout.trim());
    });
};