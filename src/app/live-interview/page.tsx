import { MicOff, VideoOff, ScreenShare, PhoneOff } from "lucide-react";

const VideoCall = () => {
  return (
    <div className="min-h-screen bg-black px-4 relative">

      <div className="flex gap-5 flex-col justify-center md:flex-row  md:justify-center md:items-center h-screen ">
        <div className="bg-red-900 rounded-lg p-4 flex flex-col justify-center items-center w-full h-[200px] md:w-[474px] md:h-[458px] relative">
          <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="noha.png"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-2">Noha AI Interviewer</p>
        </div>
        <div className="bg-red-900 rounded-lg p-4 flex flex-col justify-center items-center w-full h-[200px] md:w-[474px] md:h-[458px] relative">
          <div className="w-20 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
            <img
              src="noha.png"
              alt="John Doe"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white mt-2">Noha AI Interviewer</p>
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
