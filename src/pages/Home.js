import React, { useRef, useCallback, useState } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";
import helperImage from '../images/1.jpg';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const Home = () => {
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  var imageSrc;

  const runBodysegment = async () => {
    setIsResult(true);
    setIsLoading(true);
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
    setIsLoading(false);
  }

  const capture = useCallback(
    () => {
      imageSrc = webcamRef.current.getScreenshot();
      console.log("debugging", imageSrc)

      var image = document.getElementById("temp-image");
      image.src = imageSrc;
      image.id = "usman"
    },
    [webcamRef]
  );

  return (
    <header className="App-header">

      {isLoading && <div>
        <div className="loader"></div>
        <p>Please wait for processing..</p>
      </div>
      }

      {isResult === false ? (
        <div className="parent">
          <div className="child1">
            <img src={helperImage} style={{width: "1280px", height:"720px"}}/>
          </div>


          <div className="child2">
            <Webcam
              audio={false}
              height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1280}
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={() => { capture(); runBodysegment(); }}>Capture photo</button>
        </div>
      ) : ""}



      <img id="temp-image" style={{ display: "none" }} />


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