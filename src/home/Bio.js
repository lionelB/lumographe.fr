import React from "react";

const Bio = (props) => { 
  return (
    <div className="Content Bio">
      <p dangerouslySetInnerHTML={{__html: props.content}}></p>
    </div>
  )
}

Bio.propTypes = {
  content: React.PropTypes.string.isRequired
}

export default Bio;

