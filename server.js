"use strict";

require("node-jsx").install({extension: ".jsx", harmony: true});

/**
 * web server
 */
var express = require("express");
var favicon = require("serve-favicon");
var reactView = require("./react-middleware");
var serverOpt = {
  url: "http://localhost",
  port: 8080
};


// Setup the connect server
var app = express()
  .use(favicon("./statics/favicon.ico"))
  .use(express.static("./statics"))
  .use(express.static("./dist/"));


if (app.get("env") === "development") {
  require("./dev-tools").start(serverOpt.url + ":" + serverOpt.port, app);
}

app.use(reactView);

var port = process.env.PORT || serverOpt.port;

app.listen(port);

console.log("server.js is listening on port " + port);
