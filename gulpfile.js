"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");
var path = require("path");


gulp.task("dev", ["assets"], function(){
  livereload = livereload.createServer();
  livereload.watch( path.join(__dirname, "/dist"));
});


/**
 * assets tasks
 */
gulp.task("assets", ["assets:html", "assets:static", "markdown"]);

gulp.task("assets:static", function(){
  return gulp.src(["assets/**/*", "!assets/index.html"])
    .pipe(gulp.dest("dist/assets"));
});

gulp.task("assets:html", function(){
  return gulp.src("assets/index.html")
    .pipe(gulp.dest("dist/"));
});

gulp.task("markdown", function(){
  return gulp.src("md/*.md")
    .pipe(markdown())
    .pipe(gulp.dest("dist/json/"));
});

/**
 * markdown transformation task
 * @type {[type]}
 */
var through = require("through2");
var marked = require("meta-marked");

function markdown(options){
  return through.obj(function(file, enc, cb){
    var contents = file.contents.toString();

    var data = marked(contents, options );
    file.contents = new Buffer(JSON.stringify(data));
    file.path = gutil.replaceExtension(file.path, ".json");

    cb(null, file);
  });
}
