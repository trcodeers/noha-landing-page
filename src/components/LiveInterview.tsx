'use client'
import { useState, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, Phone } from "lucide-react";

const LiveInterview = ({ name, onCancelCall }: any) => {

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

  const videoRef = useRef<any>(null);
  const videoStreamRef = useRef<any>(null);

  const toggleCamera = async () => {
    if (isCameraOn) {
      videoStreamRef.current?.getTracks().forEach((track: any) => track.stop());
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
      setIsMicOn(isOn => !isOn)
    };
  

    
  return (
    <div className="min-h-screen bg-black px-4 flex flex-col justify-center items-center">
      <div className="flex gap-5 flex-col md:flex-row md:justify-center md:items-center">
        {/* AI Interviewer */}
        <div className="relative bg-[#1F1F1F] rounded-lg p-4 flex flex-col justify-center items-center w-full h-[200px] md:w-[474px] md:h-[458px]">
           <img src="noha.png" alt="Noha AI Interviewer" className="w-[226px] h-[226px] object-cover" />
          <p className="text-white mt-2 absolute left-3 bottom-2">Noha AI Interviewer</p>
        </div>

        {/* User Video */}
        <div className="relative bg-[#1F1F1F] rounded-lg p-4 flex flex-col justify-center items-center w-full h-[200px] md:w-[474px] md:h-[458px]">
           <video ref={videoRef} autoPlay playsInline muted className="w-full h-[90%] object-cover rounded-lg" />
          {!isCameraOn && <img src="user.png" alt="Noha AI Interviewer" className="w-[226px] h-[226px] object-cover mb-[45%]" />}
          <p className="text-white mt-2 absolute left-3 bottom-2">{name}</p>
        </div>
      </div>

      {/* Call Controls */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4 p-3 bg-black/50 rounded-full">
        {/* Mic Button */}
        <button onClick={toggleMic} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          {isMicOn ? <Mic className="text-white w-6 h-6" /> : <MicOff className="text-white w-6 h-6" />}
        </button>
        <button onClick={toggleCamera} className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          {isCameraOn ? <Video className="text-white w-6 h-6" /> : <VideoOff className="text-white w-6 h-6" />}
        </button>
        <button onClick={onCancelCall} className="p-3 rounded-full bg-red-600 hover:bg-red-500 transition">
          <Phone className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default LiveInterview;
