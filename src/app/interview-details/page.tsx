'use client'
import { useState } from "react";
import { MicOff, VideoOff } from "lucide-react";

export default function JoinCall() {
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  return (
    <>

      <div className="
        bg-[url('/curve2.png')] bg-no-repeat bg-cover bg-center w-full
        flex flex-col justify-center items-center min-h-screen 
        bg-[#F6F5FF]
      ">

        <div className="bg-black text-white p-6 rounded-xl w-full max-w-md text-center">
          <p className="text-sm text-left mb-2">John Doe</p>
          <h2 className="text-lg font-semibold mb-2">Ready to join?</h2>
          <div className="flex flex-col gap-4 items-center mb-10">
            <img
              src="noha.png"
              alt="Noha AI Interviewer"
              className="w-12 h-12 rounded-full mb-2"
            />
            <p className="text-xs text-gray-300">Noha AI Interviewer is here</p>
          </div>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className="p-3 bg-purple-600 rounded-full"
              onClick={() => setMicMuted(!micMuted)}
            >
              <MicOff className="w-6 h-6 text-white" />
            </button>
            <button
              className="p-3 bg-purple-600 rounded-full"
              onClick={() => setVideoOff(!videoOff)}
            >
              <VideoOff className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <button className="w-[226px] h-[40px] rounded-full mt-4 cursor-pointer bg-gradient-to-r from-[#77FFF1] to-[#0B9284] text-white py-2">
          Join Now
        </button>
      </div>

    </>
  );
}
