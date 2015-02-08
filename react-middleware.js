"use strict";

var React = require("react");
var Router = require("react-router");
var DocumentTitle = require("react-document-title");

var routes = require("./src/routes");
var Html = require("./src/html");


var meta = require("./package.json");

var assign = require("object-assign");


var HomeStore = require("./src/shared/HomeStore");
var ProjectStore = require("./src/shared/ProjectStore");
var actions = require("./src/shared/actions");


/**
 * Poor's man api
 */
var index = require("./dist/json/index.json");
var pages = index.meta.projects.reduce(function(pages, project) {
  var key = project.url.replace(".html", ".json");
  pages[key] = require("./dist/json/" + key );
  return pages;
}, {index: index});

function getViewData(req) {

  if (req.url === "/" ) {
    return pages.index;
  }
  if (/^\/projects/.test(req.url)) {
    var key = req.url.replace(/^\/projects\/(.*)\.html$/, "$1.json");
    return pages[key] || {};
  }
}

/**
 * a small react view middleware using react-router
 * @param  {Object}   req  http request
 * @param  {Object}   res  http response
 * @param  {Function} next middleware callback
 */
function is404(route){
  return route.name === "404";
}
function reactView(req, res, next) {
  Router.run(routes, req.url, function (Handler, state) {
    if (state.routes.some(is404)) {
      next();
      return;
    }

    var data = getViewData(req);
    var store;
    if (req.url === "/") {
      var store = new HomeStore();
      actions.initHome(data);
    }
    else {
      var store = new ProjectStore();
      actions.initProject(data);
    }

    var store = new HomeStore();
    actions.initHome(data);
    var title = DocumentTitle.rewind();
    var markup = React.renderToString(React.createElement(Handler, {title: title}));
    var props = assign({}, {markup: markup, title: title, data: JSON.stringify(data)}, meta.site);
    // Use react as template engine
    var html = React.renderToStaticMarkup(React.createElement(Html, props));

    res.send("<!DOCTYPE html>" + html);
  });
}





module.exports = reactView;