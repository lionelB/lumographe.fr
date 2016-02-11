import React, { PropTypes } from "react"

const Title = (props) => {
  const [ start, end ] = props.value.split("&")
  const separatorClassModifier = props.multiline ? "SectionTitle--multiline" : "";
  return (
    <h2 className={`SectionTitle ${separatorClassModifier}`}>
      <div className="SectionTitle-content">
        <span className="SectionTitle-small"> 
          {start}
        </span>
        
        <span className="SectionTitle-separator">
          {!props.multiline ? "&" : ""}
        </span>
        
        <span className="SectionTitle-big">
          {end}
       </span>
      </div>
    </h2>
  )
}

Title.propTypes = {
  value: PropTypes.string.isRequired,
  multiline: PropTypes.bool
}

export default Title 

