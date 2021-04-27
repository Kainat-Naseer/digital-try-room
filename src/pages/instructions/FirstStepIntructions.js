import React from "react";

import GuideImage from '../../images/guide.jpeg'

const FirstStepIntructions = (props) => {
  return (
    <div>
      <p>FirstStepIntructions</p>
      <img className="guide-image" src={GuideImage}></img>
      <div>
        <button onClick={props.nextStep}>Next Step</button>
      </div>
    </div>
  )
}

export default FirstStepIntructions;