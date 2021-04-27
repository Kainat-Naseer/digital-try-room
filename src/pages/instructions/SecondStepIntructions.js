import React from "react";

import GuideImage from '../../images/guide1.jpeg'

const SecondStepInstructions = (props) => {
  return (
    <div>
      <p>SecondStepInstructions</p>
      <img className="guide-image" src={GuideImage}></img>
      <div>
        <button onClick={props.nextStep}>Next Step</button>
      </div>
    </div>
  )
}

export default SecondStepInstructions;