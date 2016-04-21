"use strict";
const fs = require("fs");
const path = require("path");
const obj = require("through2").obj;
const util = require("gulp-util");
const PLUGIN_NAME = "gulp-ref";
module.exports = ()=> obj(function (file, enc, cb) {
    if (!file) {
        throw new util.pluginError(PLUGIN_NAME, 'Missing file or files.');
    }
    if (file.isBuffer()) {
        const content = file.contents.toString();
        const regexps = [
            /<script[^>]+src="([^"]+)"[^>]+><\/script>/g,
            /<img[^>]+src="((?!http:\/\/)[^"]+)">/g,
            /url\(((?!http:\/\/)[^\)]+)\)/g,
            /<link[^>]+href="((?!http:\/\/)[^"]+)">/g
        ];
        const sources = new Set();
        while (regexps.length > 0) {
            let regexp = regexps.pop();
            let source = regexp.exec(content);
            while (source) {
                sources.add(source[1]);
                console.log(source[1]);
                source = regexp.exec(content);
            }
        }
        const keys = [...sources];
        //console.log(keys);
        keys.forEach(assetName=> {
            const assetPath = path.join(file.base, assetName);
            try {
                const stat = fs.statSync(assetPath);
                if (stat && stat.isFile()) {
                    const newFileContent = fs.readFileSync(assetPath);
                    const newFile = new util.File({
                        "path": assetPath,
                        "contents": new Buffer(newFileContent)
                    });
                    newFile.base = file.base;
                    this.push(newFile);
                }
            } catch (err) {
                console.log("#" + assetPath);
                //console.log(err.path);
            }
        });
    }
    cb(null, file);
});