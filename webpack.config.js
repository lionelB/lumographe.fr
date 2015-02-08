"use strict";

var path = require("path");
var webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    lib: ["react", "react-router"],
    app: "./main"
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[id].js",
    path: path.join(__dirname, "dist/js"),
    publicPath: "/js/"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loaders: ["jsx?harmony"], exclude: /node_modules/}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production") // This has effect on the react lib size
      }
    }),
    new webpack.optimize.CommonsChunkPlugin("lib", "lib.js"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
