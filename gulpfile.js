'use strict';
var fs = require('fs')
var format = require('string-format')
var load = ['./.tasks']

load.forEach(path => {
    fs.readdirSync(path).forEach(function (file) {
        if (file.endsWith('.js')) {
            require(format('{0}/{1}', path, file));
        }
    });
})