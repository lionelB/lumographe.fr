"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;

var ProjectPreview = React.createClass({

  propTypes: {
    project: React.PropTypes.object.isRequired
  },

  render: function() {
    var thumbnails = this.props.project.vignettes.map( (url, index) => {
      return (
        <li key={index}>
          <Link to="project" params={this.props.project} title="voir le projet ${this.props.project.name}">
            <img src={url} alt="" />
          </Link>
        </li>
      );
    });

    return (
      <li>
        <h2>
          <Link to="project" params={this.props.project} title="voir le projet {{projet.name}}">
            {this.props.project.name}
          </Link>
          &nbsp;-&nbsp;
          <em>{this.props.project.year}</em>
        </h2>
          <p>{this.props.project.description}</p>
          <ul className="project-preview">
            {thumbnails}
          </ul>
      </li>
    );
  }

});

module.exports = ProjectPreview;
