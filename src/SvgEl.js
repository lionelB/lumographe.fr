import React, { Component } from "react";

class SvgEl extends Component {
  render(){
    return (
      <path d={this.props.path} {...this.props.style} />
    );
  }
}
SvgEl.propTypes = {
  style: React.PropTypes.object,
  path: React.PropTypes.string
} 

export default SvgEl;
