"use strict";
const fs = require("fs");
const path = require("path");
const obj = require("through2").obj;
const util = require("gulp-util");
const es = require("event-stream");
const vinyl = require("vinyl-fs");
const PLUGIN_NAME = "gulp-ref";
module.exports = ()=> obj((file, enc, cb)=> {
    if (!file) {
        throw new util.pluginError(PLUGIN_NAME, 'Missing file or files.');
    }
    if (file.isBuffer()) {
        const content = file.contents.toString();
        let regexps = [
            /<script[^>]+src="(^(?!http:\/\/)[^"]+)"/g,
            /<img[^>]+src="((?!http:\/\/)[^"]+)"/g,
            /url\(((?!http:\/\/)[^\)]+)\)/g,
            /<link[^>]+href="((?!http:\/\/)[^"]+)"/g
        ];
        let sources = new Set();
        let source;
        while (regexps.length > 0) {
            let regexp = regexps.pop();
            while (source = regexp.exec(content)) {
                sources.add(source[1]);
            }
        }
        let files = [];
        let keys = [...sources];
        keys.forEach(assetName=> {
            let assetPath = path.join(file.base, assetName);
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
            var stat = fs.statSync(assetPath);
            if (stat && stat.isFile()) {
                files.push(assetPath);
            }
        });
        return es.duplex(obj(), es.merge(vinyl.src.apply(vinyl.src, files), obj()));
    }
    //cb(null, file);
});