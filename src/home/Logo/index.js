import React, {Component} from "react";  
import SvgEl from "./SvgEl";
import normalize from "normalize-svg-path";
import parse from "parse-svg-path";
import { jellify, jellySettings, JellyPoint, pointsToString } from "./jellify";

const path = "M0,0 L75,0 150,0 150,25 150,50 75,50 0,50 0,25 Z";

const style = {
  "fill": "red",
  "strokeWidth": "1px",
  "stroke": "black"
};

const center = {
  x:75,
  y: 125
};

class Logo extends Component {
  constructor(props) {
    super(props);
    let points = normalize(parse(path)).map((el) => new JellyPoint(el, jellySettings));
    let curvePath = points.map((p) => p.toSVG()).join(" ");
    console.log(jellySettings);
    this.state = {
      hovered: false,
      style,
      mouseX: 0,
      mouseY: 0,
      path:curvePath,
      points: points
    };
  }
  updatePath() {
    this.state.points.forEach((p) => p.update(this.state.mouseX, this.state.mouseY));
    this.setState({
      path: this.state.points.map((p) => p.toSVG()).join(" ")
    });
    requestAnimationFrame(() => this.updatePath());
  }
  onMouseMove(event) {
    const svgRect = this.refs.svg.getDOMNode().getBoundingClientRect();
    const mouseX = Math.round(event.clientX - svgRect.left - center.x);
    const mouseY = Math.round(event.clientY - svgRect.top - center.y);
    this.state.points.forEach((p) => p.update(mouseX, mouseY));
    this.setState({
      hovered: true, 
      mouseX,
      mouseY,
    }); 

  }
 
  onMouseEnter(event) {
    this.setState({
      hovered: true,
      animationId: requestAnimationFrame(() => this.updatePath())
    }); 
  }
    
  onMouseLeave() {
    cancelAnimationFrame(this.state.animationId);
    this.setState({
      hovered: false,
      animationId: false
    });
  }
  
  render() {
    return (
      <svg
        ref="svg"
        viewBox={`-${center.x} -${center.y} 300 300`}
        onMouseEnter={(e) => this.onMouseEnter(e)}
        onMouseLeave={(e) => this.onMouseLeave(e)}
        onMouseMove={(e) => this.onMouseMove(e)}
        style={{...styles.svg, ...this.state.hovered && styles.hover}}>
        <rect x={-center.x} y={-center.y} width="300" height="300" fill="rgba(0, 125, 255, .3)" />
        <SvgEl path={this.state.path} style={this.state.style} />
        { 
          this.state.hovered && this.props.debug && <circle 
                                cx={this.state.mouseX} 
                                cy={this.state.mouseY} 
                                r={jellySettings.radius}
                                fill="none"
                                stroke="rgba(00, 125, 255, .5)" 
                                strokeWidth="1px" />
        }
      </svg>
    );
  }
}

const styles = {
  svg: {
    display: "block",
    width: "300px",
    height: "300px",
    margin: "0 auto"
  },
  hover: {
    boxShadow: "0px 0px 10px #00CCFF",
  }
}

export default Logo; 

