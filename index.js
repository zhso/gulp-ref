
const fs = require('fs');
const path = require('path');
const { obj } = require('through2');
const util = require('gulp-util');

const PLUGIN_NAME = 'gulp-ref';
function getAsserts(file, that) {
  const content = file.contents.toString();
  const regexps = [
    /<script[^>]+src="((?!http:\/\/)[^"]+)"[^>]*><\/script>/g,
    /<img[^>]+src="((?!http:\/\/)[^"]*)"[^>]*>/g,
    /url\(((?!http:\/\/)[^)]+)\)/g,
    /<link[^>]+href="((?!http:\/\/)[^"]+)"[^>]*>/g,
  ];
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
  keys.forEach((assetName) => {
    const assetPath = path.join(path.dirname(path.join(file.base, file.relative)), assetName);
    try {
      const stat = fs.statSync(assetPath);
      if (stat && stat.isFile()) {
        const newFileContent = fs.readFileSync(assetPath);
        const newFile = new util.File({
          path: assetPath,
          contents: Buffer.from(newFileContent),
        });
        newFile.base = file.base;
        if (path.extname(assetName) === '.css') {
          getAsserts(newFile, that);
        }
        that.push(newFile);
      }
    } catch (err) {
      // console.log(err.message);
    }
  });
}
module.exports = () => obj(function findRef(file, enc, cb) {
  if (!file) {
    throw new util.pluginError(PLUGIN_NAME, 'Missing file or files.');
  }
  if (file.isBuffer()) {
    const that = this;
    getAsserts(file, that);
  }
  cb(null, file);
});
