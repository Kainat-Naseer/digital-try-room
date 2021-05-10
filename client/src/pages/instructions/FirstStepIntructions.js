import React from "react";

import GuideImage from '../../images/guide.jpeg'

const FirstStepIntructions = (props) => {
  return (
    <div>
      <img alt="Guide Image" className="guide-image" src={GuideImage}></img>
      <div>
        <button className="capture-buttons button-hover" onClick={props.nextStep}>Next Step</button>
      </div>
    </div>
  )
}

export default FirstStepIntructions;