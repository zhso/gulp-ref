"use strict";
const gulp = require("gulp");
const ref = require("./");
const obj = require("through2").obj;
const usemin = require("gulp-usemin");
gulp.task("default", ()=> gulp
    .src("app/index.html", {base: "app"})
    .pipe(obj((file, enc, cb) => {
        console.log(file.path);
        cb(null, file);
    }))
    .pipe(usemin())
    .pipe(obj((file, enc, cb) => {
        console.log(file.path);
        cb(null, file);
    }))
    /*.pipe(ref())
     .pipe(obj((file, enc, cb) => {
     console.log(file.relative);
     cb(null, file);
     }))
     */
    .pipe(gulp.dest("dist"))
);