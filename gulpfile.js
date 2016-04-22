"use strict";
const gulp = require("gulp");
const ref = require("./");
const obj = require("through2").obj;
const usemin = require("gulp-usemin");
gulp.task("default", ()=> gulp
    .src("C:\\Users\\shaozh\\Documents\\common-fragments\\app\\*.html")
    .pipe(usemin()).pipe(ref())
    .pipe(ref())
    .pipe(obj((file, enc, cb) => {
        console.log(file.relative);
        cb(null, file);
    }))

    .pipe(gulp.dest("dist"))
);