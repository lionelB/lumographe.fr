"use strict";

/**
 * webpack hot
 */

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.dev.js");

var assign = require("object-assign");
var cors = require("express-cors");

function start(publicUrl, expressApp) {
  // Run the webpack dev server
  var compiler = webpack(webpackConfig);
  var devConfig = assign({}, webpackConfig.devServer, {
    contentBase: publicUrl,
    publicPath: webpackConfig.output.publicPath
  });

  new WebpackDevServer(compiler, devConfig)
    .listen(webpackConfig.devServer.port, "localhost", function (err) {
      if (err) {
        console.log(err);
      }
      else {
        console.log("Webpack server listening on port", webpackConfig.devServer.port);
      }
    });

  // add cors for hot reload server
  expressApp.use(cors({allowedOrigins: ["localhost" + ":" + webpackConfig.devServer.port]}));
  // use webpack dev server for serving js files
  expressApp.use("/js", function (req, res) {
    res.redirect( webpackConfig.output.publicPath.slice(0, -1) + req.path);
  });
}

module.exports.start = start;
