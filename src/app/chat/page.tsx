'use client'
import { useEffect, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}
import { Mic, Pause } from "lucide-react";

const VoiceInput = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  let recognition: any;

  useEffect(()=>{
      if (window && "webkitSpeechRecognition" in window as any) {
        recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
    
        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setText(speechResult);
        };
      }

  }, [])

  const handleMicClick = () => {
    if (recognition) {
      recognition.start();
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  };

  const handlePauseClick = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full p-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or speak..."
      />
      <button
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-black"
        onClick={listening ? handlePauseClick : handleMicClick}
      >
        {listening ? <Pause className="text-red-500" /> : <Mic className="text-gray-600" />}
      </button>
    </div>
  );
};

export default VoiceInput;
