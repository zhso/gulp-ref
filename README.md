# gulp-ref
[![NPM](https://nodei.co/npm/gulp-ref.png?downloads=true&downloadRank=true&stars=true)][npm-url][![NPM](https://nodei.co/npm-dl/gulp-ref.png?height=3&months=6)][npm-url]

[![npm](https://img.shields.io/npm/v/gulp-ref.svg)][npm-url] [![npm](https://img.shields.io/npm/dm/gulp-ref.svg)][npm-url] [![npm](https://david-dm.org/zhso/gulp-ref.svg)][npm-url] [![npm](https://img.shields.io/npm/l/gulp-ref.svg)][npm-url]

[![bitHound Overall Score](https://www.bithound.io/github/zhso/gulp-ref/badges/score.svg)](https://www.bithound.io/github/zhso/gulp-ref) [![Inline docs](http://inch-ci.org/github/zhso/gulp-ref.svg?branch=master&style=shields)](http://inch-ci.org/github/zhso/gulp-ref) [![Build Status](https://travis-ci.org/zhso/gulp-ref.svg?branch=master)](https://travis-ci.org/zhso/gulp-ref) [![Coverage Status](https://coveralls.io/repos/github/zhso/gulp-ref/badge.svg?branch=master)](https://coveralls.io/github/zhso/gulp-ref?branch=master)

[![GitHub stars](https://img.shields.io/github/stars/zhso/gulp-ref.svg?style=social&label=Star)](https://github.com/zhso/gulp-ref/stargazers) [![GitHub watchers](https://img.shields.io/github/watchers/zhso/gulp-ref.svg?style=social&label=Watch)](https://github.com/zhso/gulp-ref/subscription)

[npm-url]: https://npmjs.org/package/gulp-ref

Find reference asserts, join stream pipe to next.

Example

```
-app
 -index.html
 -js
  -script.js
 -css
  -style.css
 -images
  -logo.png
```
```html
<!--index.html-->
<link href="css/style.css" rel="stylesheet">
<script src="js/invalid.js"></script>
<div class="logo"></div>
```
```css
//style.css
.logo { background: url(../images/logo.png); }
```
```js
var ref=require("gulp-ref");
//some task here
gulp.src("app/*.html")
    .pipe(ref())
    .pipe(ref()) // do it again for the .logo image ref find
    .pipe(gulp.dest("dist"));
```
```
-dist
 -index.html
 -css
  -style.css
 -images
  -logo.png
```