'use strict'
const exec = require('child_process').exec
const path = require('path')
const config = require('../@configuration.js')

var exports = module.exports = {}

exports.execute = (file, args) => {
    return new Promise((resolve, reject) => {
        const cmd = `Powershell.exe  -ExecutionPolicy RemoteSigned -File ${path.join(config.paths.scripts, file)} ${args}`
        exec(cmd, (err, stdout, stderr) => {
            if (err) reject({ err, stdout, stderr })
            resolve()
        })
    })
}