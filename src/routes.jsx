"use strict";

var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var App = require("./app");
var Home = require("./home/homePage");
var Project = require("./project/projectPage");
var NotFound = require("./notFound");

var routes = (
  <Route path="/" handler={App}>
    <DefaultRoute name="index" handler={Home} />
    <Route name="project" path="/projects/:url" handler={Project} />
    <NotFoundRoute name="404" handler={NotFound} />
  </Route>
);

module.exports = routes;
