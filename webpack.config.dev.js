"use strict";

var webpack = require("webpack");
var path = require("path");

var devConfig = {
  context: path.join(__dirname, "src"),
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:3001",
      "webpack/hot/dev-server",
      "./main.js"
    ],
    lib: ["react", "react-router"]
  },
  output: {
    filename: "[name].js",
    path: __dirname , // not use when using react-hot
    publicPath: "http://localhost:3001/js/"
  },

  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ["react-hot", "jsx?harmony"], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("lib", "lib.js"),
    new webpack.NoErrorsPlugin()
  ],
  devtools: "eval", // for faster rebuilding
  devServer: {
    port: 3001,
    quiet: true,
    hot: true,
    stats: {
      colors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};

module.exports = devConfig;
