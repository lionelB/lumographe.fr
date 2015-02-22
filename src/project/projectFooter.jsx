"use strict";

var React = require("react");

var ProjectFooter = React.createClass({

  render: function() {
    var year = (new Date()).getFullYear();
    return (
      <footer>
        <span>&copy; {year}</span>
        <strong>Lionel Breduillieard</strong>
        <a href="mailto:lionel@lumographe.fr" className="medium">lionel@lumographe.fr</a>
        <em className="medium">06 83 74 37 74</em>
      </footer>
    );
  }

});

module.exports = ProjectFooter;
