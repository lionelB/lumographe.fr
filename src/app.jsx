"use strict";

var React = require("react");
var Router = require("react-router");

var {RouteHandler} = Router;

var App = React.createClass({

  render() {
    return (
      <RouteHandler {...this.props} />
    );
  }
});

module.exports = App;
