import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"


const PROD = process.env.NODE_ENV === "production"

const devtools = ((_PROD_) => {
   return _PROD_ ? "source-map" : "cheap-module-eval-source-map";
})(PROD)

const plugins = ((_PROD_) => {
  var plugins = [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development")
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("style.css", "[name].[contenthash].css", {disable: !_PROD_})
  ]

  if (_PROD_) {
    plugins = plugins.concat([
      new webpack.optimize.CommonsChunkPlugin("lib", "lib.js"),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ])
  }

  return plugins
})(PROD)

export default { 
  entry: {
    app: [
      "./src/index"
    ],
    lib: ["react", "react-dom", "react-router", "redux", "redux-thunk", "react-redux", "history", "whatwg-fetch"]
  }, 
  output: {
    path: "dist",
    filename: "[name].js",
    publicPath: ""
  }, 
  resolve: {
    extensions: ["", ".js", ".jsx", ".json"]
  }, 
  devtools, 
  module: { 
    loaders: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      include: path.join(__dirname, 'src')
    }, {
      test: /\.js$/,
      loader: "eslint-loader",
      exclude: /node_modules/
    }, {
      test: /\.(png|svg|gif)($|\?)/,
      loader: "url-loader?limit=10000"
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
    }, {
      test: /\.(woff|woff2|ttf|eot)(\?\w+)?$/,
      loader: "file-loader?name=fonts/[path][name].[ext]&context=./src/fonts"
    }]
  }, 
  plugins, 
  postcss: () => [
    require("postcss-import")({
      addDependencyTo: webpack,
      path: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'src')
      ]
    }),
    require("postcss-url"),
    require("postcss-cssnext")
  ]
}
