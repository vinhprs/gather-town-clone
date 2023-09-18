import React from "react";
import "./CameraStream.css";
const CameraStream = () => {
  return (
    <div id="player-container">
      <video id="player-video" autoplay playsinline></video>
    </div>
  );
};

export default CameraStream;
