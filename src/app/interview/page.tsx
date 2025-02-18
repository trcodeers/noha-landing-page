'use client'
import Feedback from "@/components/feedback";
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import { useRef, useState } from "react";
import { io } from "socket.io-client";

const MyPage = () => {

    const [interviewStarted, setInterviewStarted] = useState<boolean>(false)
    const [details, setDetails] = useState({} as any)

    const [callended, setCallEnded] = useState(false)

    const [backendServiceLink] = useState(
        "https://noha-be-python.onrender.com"
        // "http://localhost:2000"
        );
    const [userSocket, setUserSocket] = useState<any>(null);
    
    const startConnection = async () => {
        const socketConnection = io(backendServiceLink + "/guest", {
            transports: ["websocket"],
        });

        socketConnection.on("streamBack", (audioData: any) => {
            // console.log(audioData)
            queueAudioData(audioData);
        });

        setUserSocket(socketConnection);
    };

    const handleSubmit = (data: { name: string; email: string }) => {
        console.log("Submitted Data:", data);
        setInterviewStarted(true)
        setDetails({...data})
        startConnection()
    };

    const onCancelCall = () =>{
        stopRecording()
        console.log('klkl')
        setCallEnded(true)
        userSocket.disconnect()
    }

      const [isMicOn, setIsMicOn] = useState(false);
        
      const mediaRecorderRef = useRef<any>(null);
      const audioStreamRef = useRef<any>(null);
      const audioTrackRef = useRef<any>(null);
      const audioPlayerRef = useRef<any>(null);
      const mediaSourceRef = useRef<any>(null);
      const sourceBufferRef = useRef<any>(null);
      const audioQueueRef = useRef<any>([]);
      const [isRecording, setIsRecording] = useState(false);
      const [isSpeaking, setIsSpeaking] = useState(false);
      
      const checkMicrophonePermission = async () => {
          try {
              const permissionStatus = await navigator.permissions.query({ name: "microphone" });
              if (permissionStatus.state === "denied") {
                  alert("Microphone access is denied. Please allow access in your browser settings.");
                  return false;
              }
              return true;
          } catch (error) {
              console.warn("Microphone permission query not supported, trying direct access.");
              return true;
          }
      };
    
      const startRecording = async () => {
          const hasPermission = await checkMicrophonePermission();
          if (!hasPermission) return;

          setIsMicOn(true)
          setIsRecording(true);

          try {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
              audioStreamRef.current = stream;
              audioTrackRef.current = stream.getAudioTracks()[0];
    
              const mediaRecorder = new MediaRecorder(stream);
              mediaRecorderRef.current = mediaRecorder;
    
              mediaRecorder.ondataavailable = (event) => {
                  if (event.data.size > 0 && userSocket && !isMicOn) {
                      userSocket.emit("audioStream", event.data);
                  }
              };
    
              mediaRecorder.start(100);
              setIsSpeaking(true);
    
          } catch (error) {
              console.error("Error accessing microphone:", error);
              alert("Failed to access microphone. Please check browser settings.");
          }
      };
    
      const stopRecording = () => {
        try {
            
        setIsRecording(false)
          if (mediaRecorderRef.current) {
              mediaRecorderRef.current.stop();
          }
          if (audioStreamRef.current) {
              audioStreamRef.current.getTracks().forEach((track: any) => track.stop());
          }
    
          setIsSpeaking(false);
          mediaSourceRef?.current?.endOfStream()
    
          if (userSocket) {
              userSocket.emit("stopRecording");
          }
          setIsMicOn(false)
        } catch (error) {
            
        }
      };
    
      /** ✅ Handles continuous streaming by queueing and appending chunks */
      const queueAudioData = (audioData: any) => {
        try {
   
          if (!(audioData instanceof Uint8Array || audioData instanceof ArrayBuffer)) {
              console.error("Invalid audio data received:", audioData);
              return;
          }
    
          const uint8Array = new Uint8Array(audioData);
          audioQueueRef.current.push(uint8Array);
    
          if (!mediaSourceRef.current || mediaSourceRef.current.readyState !== "open") {
              initializeMediaSource();
          } else {
              appendAudioBuffer();
          }
                   
        } catch (error) {
            
        }
      };
    
      /** ✅ Initializes MediaSource for streaming playback */
      const initializeMediaSource = () => {
          if (!audioPlayerRef.current) return;
    
          mediaSourceRef.current = new MediaSource();
          audioPlayerRef.current.src = URL.createObjectURL(mediaSourceRef.current);
    
          mediaSourceRef.current.addEventListener("sourceopen", () => {
              const mediaSource = mediaSourceRef.current;
              if (!mediaSource) return;
    
              sourceBufferRef.current = mediaSource.addSourceBuffer('audio/webm; codecs="opus"');
    
              sourceBufferRef.current.addEventListener("updateend", appendAudioBuffer);
    
              appendAudioBuffer();
          });
    
          audioPlayerRef.current.play().catch((err: any) => console.log());
      };
    
      /** ✅ Appends buffered chunks to SourceBuffer */
      const appendAudioBuffer = () => {
          if (!sourceBufferRef.current || sourceBufferRef.current.updating || audioQueueRef.current.length === 0) {
              return;
          }
    
          const chunk = audioQueueRef.current.shift();
          sourceBufferRef.current.appendBuffer(chunk);
      };
    
      
    return (
        <>
        <audio ref={audioPlayerRef} controls style={{ display: "none" }}></audio>
        {!callended && (!interviewStarted ? 
            <InterviewDetails onSubmit={handleSubmit} />
                :
            <LiveInterview name={details.name} onCancelCall={onCancelCall} userSocket={userSocket} isMicOn={isMicOn} startRecording={startRecording} stopRecording={stopRecording} isRecording={isRecording} />)
        }
        {
            callended === true && <Feedback/>
        }
        </>
    );
};

export default MyPage;
