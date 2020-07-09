'use strict'
const fs = require('fs')
const format = require('string-format')
const load = ['./.tasks']

load.forEach(path => {
    fs.readdirSync(path).forEach(function (file) {
        if (file.endsWith('.js')) {
            require(format('{0}/{1}', path, file));
        }
    });
})