"use strict";
const obj = require("through2").obj;
const pluginError = require("gulp-util").PluginError;
const PLUGIN_NAME = "gulp-ref";
module.exports = ()=> {
    return obj((file, enc, cb)=> {
        if (!file) {
            throw new pluginError(PLUGIN_NAME, 'Missing file or files.');
        }
        if (file.isBuffer()) {
            console.log(file.contents.toString().match(/<link[^\\>]+href=['"]([^"']+)["']/gi));
            console.log(file.relative);
        }
        cb(null, file);
    })
};