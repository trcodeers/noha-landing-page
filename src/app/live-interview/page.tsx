import { MicOff, VideoOff, ScreenShare, PhoneOff } from "lucide-react";

const VideoCall = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4 relative">
      {/* Video Containers */}
      <div className="flex flex-col md:flex-row justify-center items-center w-full max-w-5xl gap-4">
        {/* AI Interviewer Card */}
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-center w-full md:w-1/2 h-56">
          <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="noha.png"
              alt="Noha AI Interviewer"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-2">Noha AI Interviewer</p>
        </div>

        {/* User Card */}
        <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-center w-full md:w-1/4 h-56 relative">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="user.png"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-2">John Doe</p>

          {/* Mic Off Icon */}
          <MicOff className="absolute top-4 right-4 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Call Controls */}
      <div className="absolute bottom-6 flex space-x-4 p-3 rounded-full">
        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          <MicOff className="text-white w-6 h-6" />
        </button>
        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          <VideoOff className="text-white w-6 h-6" />
        </button>
        <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 transition">
          <ScreenShare className="text-white w-6 h-6" />
        </button>
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-500 transition">
          <PhoneOff className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
