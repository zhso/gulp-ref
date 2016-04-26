"use strict";
const gulp = require("gulp");
const ref = require("./");
const useref = require("gulp-useref");
const obj = require("through2").obj;
const usemin = require("gulp-usemin");
const del = require("del");
gulp.task("default", ()=> gulp
    .src("app/index.html")
    .pipe(useref())
    .pipe(ref())
    .pipe(obj((file, enc, cb)=> {
        console.log("1st.: " + file.path);
        cb(null, file);
    }))
    .pipe(ref())
    .pipe(obj((file, enc, cb)=> {
        //console.log("2nd.: " + file.path);
        cb(null, file);
    }))
    .pipe(gulp.dest("dist"))
);