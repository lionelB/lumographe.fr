import React, { Component } from "react";
import { Link } from "react-router";

export default class ProjectPage extends Component {
  render() {
    return (
      <div>
        <h2>Project</h2>
        <h3>{this.props.params.url}</h3>
        <Link to="/">Home</Link> - 
        <Link to="/" onlyActiveOnIndex={true}> index</Link>
      </div>
    );
  }
}
