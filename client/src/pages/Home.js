import React, { useState } from "react";
import StepWizard from 'react-step-wizard';

import FirstStepIntructions from "./instructions/FirstStepIntructions";
import FirstImageCapture from "./imageCapture/FirstImageCapture";
import SecondStepInstructions from "./instructions/SecondStepIntructions";
import SecondImageCapture from "./imageCapture/SecondImageCapture";
import Nav from "../components/nav";
import Measurements from "./Measurements";

const Home = (props) => {
  const [measurements, setMeasurements] = useState({});

  const measurementsresult = (value) => {
    setMeasurements(value);
  }

  return (
    <div className="body-container">
      <StepWizard initialStep={1} nav={<Nav />}>
        <FirstStepIntructions />
        <FirstImageCapture measurementsresult={measurementsresult}/>

        <SecondStepInstructions />
        <SecondImageCapture />
        <Measurements measurements={measurements} />
      </StepWizard>
    </div>
  )
}

export default Home;