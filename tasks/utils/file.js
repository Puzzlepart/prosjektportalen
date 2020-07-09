'use strict';
var fs = require('fs');

var exports = module.exports = {};

exports.write = (path, contents) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, contents, err => {
            if (err) reject(err);
            resolve();
        });
    });
};
