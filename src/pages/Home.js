import React, { useRef, useCallback } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";
import logo from '../images/moaviz.jpeg';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const Home = () => {
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  var imageSrc;

  const runBodysegment = async () => {
    const net = await bodyPix.load();
    console.log("BodyPix model loaded.");
    //  Loop and detect hands
    var image = document.getElementById("usman");

    const segmentation = await net.segmentPersonParts(image, {
      flipHorizontal: false,
      internalResolution: 'medium',
      segmentationThreshold: 0.7
    });
    console.log(segmentation);

    const coloredPartImage = bodyPix.toColoredPartMask(segmentation);
    const opacity = 0.7;
    const flipHorizontal = false;
    const maskBlurAmount = 0;
    const canvas = document.getElementById('canvas');
    // Draw the colored part image on top of the original image onto a canvas.
    // The colored part image will be drawn semi-transparent, with an opacity of
    // 0.7, allowing for the original image to be visible under.
    bodyPix.drawMask(
      canvas, image, coloredPartImage, opacity, maskBlurAmount,
      flipHorizontal);
  }

  const capture = useCallback(
    () => {
      imageSrc = webcamRef.current.getScreenshot();
      console.log("debugging", imageSrc)

      var image = new Image();
      image.src = imageSrc;
      image.id = "usman"
      document.body.appendChild(image);
    },
    [webcamRef]
  );

  const handleButtonClick = () => {
    runBodysegment();
  }

  return (
    <header className="App-header">

      <button onClick={handleButtonClick}>submit</button>

      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>

      <canvas
        id="canvas"
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
          width: 640,
          height: 480,
        }}
      />
    </header>
  )
}

export default Home;