import React, { useRef, useCallback, useState } from "react"
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";

import helperImage from '../../images/helper.jpg';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};

const FirstImageCapture = (props) => {
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempImage, setTempImage] = useState('');
  const webcamRef = useRef(null);
  // const canvasRef = useRef(null);

  var imageSrc;

  const runBodySegment = async () => {
    setIsResult(true);
    setIsLoading(true);
    const net = await bodyPix.load();
    console.log("BodyPix model loaded.");
    //  Loop and detect hands
    var image = document.getElementById("temp-image");

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
      setTempImage(imageSrc);
    },
    [webcamRef]
  );

  return (
    <div>
      {isLoading && (
        <div>
          <div className="loader"></div>
          <p>Please wait for processing..</p>
        </div>
      )}

      {isResult === false ? (
        <div className="parent">
          <div className="child1">
            <img src={helperImage} style={{ width: "1000px", height: "550px" }} />
          </div>


          <div className="child2">
            <Webcam
              audio={false}
              height={550}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={1000}
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={() => { capture(); runBodySegment(); }}>Capture photo</button>
        </div>
      ) : (
          <>
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
            <button className="next-button-image-capture" onClick={props.nextStep}>Next Step</button>
          </>
        )}

      <img id="temp-image" src={tempImage} style={{ display: "none" }} />
    </div>
  )
}

export default FirstImageCapture;