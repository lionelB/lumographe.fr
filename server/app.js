global.__DEV__ = (process.env.NODE_ENV === "development");
global.__SERVER__ = true;
global.__CLIENT__ = false;

import path from "path";
import fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { RoutingContext, match } from "react-router";
import { createLocation } from "history";
import { createStore } from "redux";
import { Provider } from "react-redux";

import routes from "../src/routes";
import markdown from "markdown-it";
import yamlParser from "gray-matter";
import express from "express";
import favicon from "serve-favicon";

import { reducer } from "../src/shared/page-loader";

var app = express();

// Static middleware
var staticDir = path.join(__dirname, "..", "statics");
var  staticOpt = {
  etag: true,
  lastModified: true,
  maxAge: 24 * 60 * 60 * 1000
};

app.use(favicon(`${staticDir}/favicon.ico`));
app.use(express.static(staticDir, staticOpt));

// if (__DEV__) {
//   let webpack = require("webpack");
//   let webpackDevMiddleware = require("webpack-dev-middleware");
//   let webpackHotMiddleware = require("webpack-hot-middleware");
//   let webpackConfig = require("../webpack.config.dev");

//   let compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler, {
//     noInfo: true,
//     publicPath: webpackConfig.output.publicPath
//   }));
//   app.use(webpackHotMiddleware(compiler));
// } else {
//   app.use("/static/", express.static(path.join(__dirname, "..", "build")));
// }

let files = fs.readdirSync(path.join(__dirname, "..", "md"));
const mdCache = files.reduce((acc, file) => {
  var content = fs.readFileSync(path.join(__dirname, "..", "md", file));
  var yaml = yamlParser(content.toString());
  acc[file] = {
    head: yaml.data,
    content: markdown().render(yaml.content)
  };
  return acc;
}, {});

app.get("*", function(req, res) {
  let location = createLocation(req.url);
  match({ routes, location}, (err, redirectLocation, renderProps) => {

    if (err) {
      console.log("match route error", err);
      return res.status("500").end("Internal Server Error 500");
    }
    if (redirectLocation) {
      console.log("redirect", redirectLocation);
    }
    if (!renderProps) {
      return res.status(404).end("Not found, 404");
    }
    console.log("match", req.url, path.basename(req.url));
    let initialState = mdCache[path.basename(req.url)];
    const store = createStore(reducer, initialState);
    const componentTree = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );
    const html = renderToString(componentTree);
    res.send(html);
  });
});

// app.use(function(req, res, next) {
//   let err = new Error("krasuula");
//   err.status = 404;
//   next(err);
// });

// app.use(function(req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });


module.exports = app;

