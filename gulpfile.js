"use strict";

var gulp = require("gulp");
var gutil = require("gulp-util");

var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");
var livereload = require("livereload");

var server = livereload.createServer();
var opn = require("opn");


// default task: copy assest and build js
gulp.task("default", ["assets", "webpack-build"]);


gulp.task("dev", ["assets"], function(){
  livereload.watch( __dirname + "/dist");
});

gulp.task("webpack:build", function(done) {
  webpack(webpackConfig, function(err, stats) {
    if(err) {
      throw new gutil.PluginError("webpack:build", err);
    }
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));

    done();
  });
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

var fs = require("vinyl-fs");
var source = require("vinyl-source-stream");
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