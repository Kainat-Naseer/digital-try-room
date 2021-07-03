import React, { useRef, useCallback, useState } from "react"
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";

import helperImage from '../../images/helper.jpg';
import pic from '../../images/huraira.jpeg';
// const heightInInches = 73.2;

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
  const [inputValue, setInputValue] = useState("60");
  // const canvasRef = useRef(null);

  var imageSrc;

  const eucDistance = (a, b) => {
    return a
      .map((x, i) => Math.abs(x - b[i]) ** 2) // square the difference
      .reduce((sum, now) => sum + now) // sum
      ** (1 / 2)
  }

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
      segmentationThreshold: 0.4
    });
    console.log("debugging segmentation", segmentation);

    var pixelsPerInch = (eucDistance(Object.values(segmentation.allPoses[0].keypoints[0].position), Object.values(segmentation.allPoses[0].keypoints[16].position)) + 5) / inputValue;

    var armsLength = eucDistance(Object.values(segmentation.allPoses[0].keypoints[5].position), Object.values(segmentation.allPoses[0].keypoints[9].position)) / pixelsPerInch;

    var legsLength = eucDistance(Object.values(segmentation.allPoses[0].keypoints[11].position), Object.values(segmentation.allPoses[0].keypoints[15].position)) / pixelsPerInch;

    var shoulderToWaist = eucDistance(Object.values(segmentation.allPoses[0].keypoints[5].position), Object.values(segmentation.allPoses[0].keypoints[11].position)) / pixelsPerInch;

    var shoulderWidth = eucDistance(Object.values(segmentation.allPoses[0].keypoints[5].position), Object.values(segmentation.allPoses[0].keypoints[6].position)) / pixelsPerInch;


    props.measurementsresult({ armsLength: armsLength, legsLength: legsLength, shoulderToWaist: shoulderToWaist, shoulderWidth: shoulderWidth });

    console.log("arms Length", armsLength);
    console.log("legs Length", legsLength);
    console.log("shoulderToWaist Length", shoulderToWaist);
    console.log("shoulderWidth Length", shoulderWidth);

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
      // console.log("debugging", imageSrc)
      setTempImage(imageSrc);
    },
    [webcamRef]
  );

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  return (
    <div>
      {isLoading && (
        <div>
          <div className="loader"></div>
          <p className="loding-text">Please wait for processing..</p>
        </div>
      )}

      {isResult === false ? (
        <>
          <div>
            <p>Enter Your Height in Inches:</p>
            <input id="height-input" type="number" placeholder="Enter Height In Inches" value={inputValue} onChange={handleChange} />
          </div>

          <div className="parent">
            <div id="guide-image" className="child1">
              <img alt="" src={helperImage} />
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

      {/* <img id="temp-image" src={pic} style={{ display: "none" }} crossOrigin='anonymous' /> */}
      
      <img id="temp-image" src={tempImage} style={{ display: "none" }} crossOrigin='anonymous' />
    </div>
  )
}

export default FirstImageCapture;
