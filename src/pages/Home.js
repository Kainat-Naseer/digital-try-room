import React from "react";
import StepWizard from 'react-step-wizard';

import FirstStepIntructions from "./instructions/FirstStepIntructions";
import FirstImageCapture from "./imageCapture/FirstImageCapture";
import SecondStepInstructions from "./instructions/SecondStepIntructions";
import SecondImageCapture from "./imageCapture/SecondImageCapture";

const Home = (props) => {
  console.log("home props", props);

  return (
    <div>

      <StepWizard initialStep={1}>
        <FirstStepIntructions />
        <FirstImageCapture />

        <SecondStepInstructions />
        <SecondImageCapture />
      </StepWizard>

    </div>
  )
}

export default Home;