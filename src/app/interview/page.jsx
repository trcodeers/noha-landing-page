'use client'
import React, { useRef, useState } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const stopRecording = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    videoRef.current.srcObject = null;
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline></video>
      <div>
        <button onClick={startRecording}>Start Video</button>
        <button onClick={stopRecording}>Stop Video</button>
      </div>
    </div>
  );
};

export default VideoRecorder;
