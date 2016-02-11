import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPage } from "../shared/reducers"
import { Link } from "react-router"

import Header from "./Header";
import Bio from "./Bio";
import Title from "./Title";

import "./home.css";

class HomePage extends Component {
  componentDidMount(){
    this.props.fetchPage("index")
  }

  render() {
    return (
      <div className="Home">
        <div className="TopBorder"/>  
        <Header />
        <Bio content={this.props.meta.bio} />
        <Title value={"Outils & Technologie"} />
        <Title value={"Quelques & Travaux récents"} multiline />
        <Link to="/project/toto.html">toto</Link>
      </div>
    )
  }
}

HomePage.propTypes = {
  fetchPage: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps = (dispatch) => ({
  fetchPage: (page) => dispatch(fetchPage(page))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
