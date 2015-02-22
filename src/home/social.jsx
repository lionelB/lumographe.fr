"use strict";

var React = require("react");

var Social = React.createClass({
  propTypes: {
    links: React.PropTypes.array.isRequired
  },
  render: function() {
    var links = this.props.links.map( (link, index) => {
      return (<li key={index}>
        <i className={"icon-" + link.name}></i>&nbsp;
        <a href={link.url}>{link.value}</a>
      </li>);
    });

    return (
      <div>
        <h1 className="h1-section">Sur la toile</h1>
        <ul className="flat icons">
          {links}
        </ul>
      </div>
    );
  }

});

module.exports = Social;
