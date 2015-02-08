"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var ProjectHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <header className="header-projet">
        <Link className="logo-small" to="/">
          <div className="logo-pills"></div>
          <div className="logo-flame"></div>
        </Link>
        <Link to="/">
          <strong className="logo-h1">Lumographe</strong>
          <span className="logo-h2">Développement web &amp; mobile</span>
        </Link>
        <h1 className="h1-section"><Link to="/#projets">Projets</Link> / {this.props.title}</h1>
      </header>
    );
  }
});

module.exports = ProjectHeader;
