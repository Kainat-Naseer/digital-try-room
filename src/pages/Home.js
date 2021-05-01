import React from "react";
import StepWizard from 'react-step-wizard';

import FirstStepIntructions from "./instructions/FirstStepIntructions";
import FirstImageCapture from "./imageCapture/FirstImageCapture";
import SecondStepInstructions from "./instructions/SecondStepIntructions";
import SecondImageCapture from "./imageCapture/SecondImageCapture";
import Nav from "../components/nav";
import Measurements from "./Measurements";

const Home = (props) => {
  console.log("home props", props);

  return (
    <div className="body-container">
      <StepWizard initialStep={1} nav={<Nav />}>
        <FirstStepIntructions />
        <FirstImageCapture />

        <SecondStepInstructions />
        <SecondImageCapture />
        <Measurements />
      </StepWizard>
    </div>
  )
}

export default Home;