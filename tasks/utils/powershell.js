'use strict'
var exec = require('child_process').exec
const path = require('path')
const format = require('string-format')
const config = require('../@configuration.js')

var exports = module.exports = {}

exports.execute = (file, args) => {
    return new Promise((resolve, reject) => {
        const cmd = format('Powershell.exe  -ExecutionPolicy RemoteSigned -File {0} {1}', path.join(config.paths.scripts, file), args);
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject({ err, stdout, stderr })
            }
            resolve({ stdout });
        });
    });
}