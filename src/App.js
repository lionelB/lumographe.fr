import React, { Component } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

class App extends Component {
  render() {
    return (
      <div id="app-view">
        <h1>Yo</h1>
        <Logo debug />
        <Link to="/" onlyActiveOnIndex>index</Link>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default App;
