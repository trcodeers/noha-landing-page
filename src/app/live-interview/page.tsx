import { MicOff, VideoOff, ScreenShare, PhoneOff } from "lucide-react";

const VideoCall = () => {
  return (
    <div className="min-h-screen bg-black px-4 relative">
      
      {/* Video Containers */}
      <div className="flex flex-col md:flex-row justify-center   gap-4">
        
        {/* AI Interviewer Card */}
        <div className="bg-red-900 rounded-lg p-4 flex flex-col justify-center items-center w-full md:w-[474px] h-[458px] relative">
          <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="noha.png"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-2">Noha AI Interviewer</p>
        </div>

        <div className="bg-red-900 rounded-lg p-4 flex flex-col justify-center items-center w-full md:w-[474px] h-[458px] relative">
          <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="user.png"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-2">Noha AI Interviewer</p>
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
