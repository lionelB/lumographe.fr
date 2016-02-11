import React, { Component } from "react"
import { connect } from "react-redux"

class App extends Component {
  render() {
    return (
      <div id="app-view">
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

export default connect((state) => state)(App)
