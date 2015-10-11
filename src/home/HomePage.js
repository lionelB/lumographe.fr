import React, { Component } from "react";
import Header from "./Header";
import { Link } from "react-router";

export default class HomePage extends Component {
  render() {
    var url = "toto.html";

    console.log("paf", url);
    
    return (
      <div>
        <Header />
        <Link to={`/project/${url}`}> Projet Toto </Link>
      </div>
    );
  }
}
