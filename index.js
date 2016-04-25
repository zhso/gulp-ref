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
            /<script[^>]+src="((?!http:\/\/)[^"]+)"[^>]*><\/script>/g,
            /<img[^>]+src="((?!http:\/\/)[^"]*)">/g,
            /url\(((?!http:\/\/)[^\)]+)\)/g,
            /<link[^>]+href="((?!http:\/\/)[^"]+)"[^>]*>/g
        ];
        //TODO: Support http block build
        const sources = new Set();
        const regexp = /gulp/;
        while (regexps.length > 0) {
            regexp.compile(regexps.pop());
            let source = regexp.exec(content);
            while (source) {
                sources.add(source[1]);
                source = regexp.exec(content);
            }
        }
        const keys = [...sources];
        //console.log(keys);
        keys.forEach(assetName=> {
            console.log(">>>>>>>>>>>>>>>>>>");
            console.log(file.base);
            console.log(file.relative);
            console.log(assetName);
            console.log(file.path);
            console.log(file.cwd);
            console.log("<<<<<<<<<<<<<<<");
            const assetPath = path.join(path.dirname(path.join(file.base, file.relative)), assetName);
            //console.log(assetPath);
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
                //console.log(`#${assetPath}`);
                //console.log(err.path);
            }
        });
    }
    cb(null, file);
});