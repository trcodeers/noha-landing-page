'use client'
import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Phone } from "lucide-react";

const LiveInterview = ({ name }: { name: string }) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoStreamRef = useRef<MediaStream | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);

  // Toggle Camera
  const toggleCamera = async () => {
    if (isCameraOn) {
      // Stop the camera
      videoStreamRef.current?.getTracks().forEach(track => track.stop());
      if (videoRef.current) videoRef.current.srcObject = null;
      videoStreamRef.current = null;
      setIsCameraOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        videoStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraOn(true);
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    }
  };

  // Toggle Mic
  const toggleMic = async () => {
    if (isMicOn) {
      audioStreamRef.current?.getTracks().forEach(track => track.stop());
      audioStreamRef.current = null;
      setIsMicOn(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioStreamRef.current = stream;
        setIsMicOn(true);
      } catch (error) {
        console.error("Error accessing the microphone:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 relative text-center flex flex-col justify-center items-center">

      <div className="flex gap-5 flex-col justify-center md:flex-wrap md:flex-row md:justify-center md:items-center">
        
        {/* Noha AI Interviewer */}
        <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col justify-center items-center w-full h-[200px] md:w-[474px] md:h-[458px] relative">
          <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img src="noha.png" alt="Noha AI Interviewer" className="w-full h-full object-cover" />
          </div>
          <p className="text-white mt-2">Noha AI Interviewer</p>
        </div>

        {/* User Video */}
        <div className="bg-[#1F1F1F] rounded-lg p-4 flex flex-col justify-center items-center w-full h-[200px] md:w-[474px] md:h-[458px] relative">
          {isCameraOn ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
              <img src="user.png" alt="User" className="w-full h-full object-cover" />
            </div>
          )}
          <p className="text-white mt-2">{name}</p>
          {!isMicOn && <MicOff className="absolute top-4 right-4 text-gray-400 w-5 h-5" />}
        </div>
      </div>

      {/* Call Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 p-3 bg-black/50 rounded-full">
        {/* Mic Button */}
        <button onClick={toggleMic} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          {isMicOn ? <Mic className="text-white w-6 h-6" /> : <MicOff className="text-white w-6 h-6" />}
        </button>

        {/* Camera Button */}
        <button onClick={toggleCamera} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          {isCameraOn ? <Video className="text-white w-6 h-6" /> : <VideoOff className="text-white w-6 h-6" />}
        </button>

        {/* End Call Button */}
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-500 transition">
          <Phone className="text-white w-6 h-6" />
        </button>
      </div>

    </div>
  );
};

export default LiveInterview;
