"use strict";
const gulp = require("gulp");
const ref = require("./");
gulp.task("default", ()=> gulp
    .src("C:\\Users\\shaozh\\Documents\\common-fragments\\app\\**\\*")
    .pipe(ref())
    //.pipe(gulp.dest("dist"))
);