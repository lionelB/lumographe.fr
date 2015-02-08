"use strict";

var React = require("react");

var Header = React.createClass({
  render() {
    return (
      <header className="header-home wrapper pt3">
        <div className="logo-home js-logo">
          <div className="logo-pills"></div>
          <div className="logo-flame"></div>
        </div>
        <hgroup className=" test-anim--start">
          <h1 className="logo-h1">Lumographe</h1>
          <h2 className="logo-h2">Développement web &amp; mobile</h2>
        </hgroup>
      </header>
    );
  }
});

module.exports = Header;
