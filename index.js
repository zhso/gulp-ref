"use strict";
const fs = require("fs");
const path = require("path");
const obj = require("through2").obj;
const util = require("gulp-util");
const PLUGIN_NAME = "gulp-ref";
module.exports = ()=> obj((file, enc, cb)=> {
    if (!file) {
        throw new util.pluginError(PLUGIN_NAME, 'Missing file or files.');
    }
    if (file.isBuffer()) {
        const content = file.contents.toString();
        const regexps = [
            /<script[^>]+src="(^(?!http:\/\/)[^"]+)"/g,
            /<img[^>]+src="((?!http:\/\/)[^"]+)"/g,
            /url\(((?!http:\/\/)[^\)]+)\)/g,
            /<link[^>]+href="((?!http:\/\/)[^"]+)"/g
        ];
        const sources = new Set();
        while (regexps.length > 0) {
            const regexp = regexps.pop();
            let source = regexp.exec(content);
            while (source) {
                sources.add(source[1]);
                source = regexp.exec(content);
            }
        }
        const files = [];
        const keys = [...sources];
        keys.forEach(assetName=> {
            const assetPath = path.join(file.base, assetName);
            /*fs.stat(assetPath, (err, stat)=> {
             if (err) {
             //throw new util.pluginError(PLUGIN_NAME, 'File not found.');
             } else if (stat.isFile()) {
             fs.readFile(assetPath, (err, content)=> {
             let newFile = new util.File({
             "path": assetPath,
             "contents": new Buffer(content)
             });
             console.log(keys);
             });
             }
             });*/
            try {
                const stat = fs.statSync(assetPath);
                if (stat && stat.isFile()) {
                    files.push(assetPath);
                }
            } catch (err) {
                //console.log(err.path);
            }
        });
        console.log(files);
    }
    cb(null, file);
});