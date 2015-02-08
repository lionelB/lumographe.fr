"use strict";

var React = require("react");
var BubbleQuote = require("./bubbleQuote");

var Intro = React.createClass({
  propTypes: {
    quotes: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    markup: React.PropTypes.string.isRequired
  },
  render() {
    return (
      <section className="block__container">
        <BubbleQuote quotes={this.props.quotes} />
        <div dangerouslySetInnerHTML={{__html: this.props.markup}} />
      </section>
    );
  }
});

module.exports = Intro;
