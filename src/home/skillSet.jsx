"use strict";

var React = require("react");

var SkillSet = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    skills: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  },

  render() {
    var skills = this.props.skills.map((skill, index) => {
      return <li key={index}>{skill}</li>;
    });

    return (
      <li>
        <h2>{this.props.name}</h2>
        <ul>{skills}</ul>
      </li>
    );
  }
});

module.exports = SkillSet;
