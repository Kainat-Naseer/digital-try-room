import React, { useRef, useCallback, useState } from "react"
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";

import helperImage from '../../images/helper.jpg';

const videoConstraints = {
  facingMode: "user"
};

const FirstImageCapture = (props) => {
  const [isResult, setIsResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempImage, setTempImage] = useState('');
  const [canvasShow, setCanvasShow] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
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

    setCanvasShow(true);
    imageUploadSuccess();
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

  const imageUploadSuccess = () => {
    setTimeout(() => { setIsImageUpload(true) }, 3000);
    setIsImageUpload(false);
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
        <>
          <div className="parent">
            <div id="guide-image" className="child1">
              <img src={helperImage} />
            </div>

            <div className="child2">
              <Webcam
                audio={false}
                ref={webcamRef}
                id="webcam-preview"
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
            </div>
          </div>
          <button className="button-hover capture-buttons" onClick={() => { capture(); runBodySegment(); }}>Capture photo</button>
        </>
      ) : (
          canvasShow &&
          <>
            {!isImageUpload &&
              <div>upload successful</div>}
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
            <button className="next-button-image-capture button-hover" onClick={props.nextStep}>Next Step</button>
          </>
        )}

      <img id="temp-image" src={tempImage} style={{ display: "none" }} />
    </div>
  )
}

export default FirstImageCapture;