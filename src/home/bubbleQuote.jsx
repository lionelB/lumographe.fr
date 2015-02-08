"use strict";

var React = require("react");

var BubbleQuote = React.createClass({
  propTypes: {
    quotes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },
  render() {
    return (
      <blockquote className="right bulle" id="js-bulle">
        <p>{ this.props.quotes[0] }</p>
      </blockquote>
    );
  }
});

module.exports = BubbleQuote;
