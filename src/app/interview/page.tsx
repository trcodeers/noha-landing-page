'use client'
import Feedback from "@/components/feedback";
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const MyPage = () => {


    const [interviewStarted, setInterviewStarted] = useState<boolean>(false)
    const [details, setDetails] = useState({} as any)

    const [callended, setCallEnded] = useState(false)

    const [backendServiceLink] = useState(
        "http://localhost:5000"
        );
    const [userSocket, setUserSocket] = useState<any>(null);
    
    const [chats, setChats] = useState([
        { name: "Noha AI", message: "Hello! Welcome to your interview. Can you introduce yourself?" },
        { name: "Candidate", message: "Hi, my name is Alex, and I have five years of experience in frontend development." },
        { name: "Noha AI", message: "Great! Can you tell me about a challenging project you've worked on recently?" },
        { name: "Candidate", message: "Sure! I recently built a scalable design system using React and Tailwind CSS for a SaaS platform." },
        { name: "Noha AI", message: "That sounds interesting. How did you handle component reusability?" },
        { name: "Candidate", message: "I created atomic components and used a central theme provider to ensure consistency across the app." },
        { name: "Noha AI", message: "Impressive! How do you optimize performance in a React application?" },
        { name: "Candidate", message: "I use React.memo, lazy loading, and optimize re-renders with useCallback and useMemo." }
    ]);

    const startConnection = async (userDetails: any) => {
        const socketConnection = io(backendServiceLink + "/guest", {
            transports: ["websocket"],
        });
        speakText(`hi ${userDetails.name} I'm Noha, I'll be conducting your interview today. Let's get started with your first question: Find an index in an array where the sum of elements to the left equals the sum to the right`)


        socketConnection.on('connect', ()=>{
            console.log('connected')
            setInterviewStarted(true)
            console.log(details)
        })

        socketConnection.on("streamBack", (audioData: any) => {
        });

        setUserSocket(socketConnection);
    };

    const speakText = (text: string): void => {
        if (!window.speechSynthesis) {
          console.error("Speech synthesis is not supported in this browser.");
          return;
        }
      
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-IN"; // You can change the language
        utterance.rate = 1; // Adjust speed (0.1 to 10, 1 is normal)
        utterance.pitch = 1; // Adjust pitch (0 to 2)
        
        window.speechSynthesis.speak(utterance);
    };
            

    const handleSubmit = (data: { name: string; email: string }) => {
        console.log("Submitted Data:", data);
        setDetails({...data})
        startConnection(data)
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
      const [isRecording, setIsRecording] = useState(false);
      const [isSpeaking, setIsSpeaking] = useState(false);
      
      const checkMicrophonePermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: "microphone" as any });
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
    
              mediaRecorder.start(10);
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

      
    return (
        <>
        <audio ref={audioPlayerRef} controls style={{ display: "none" }}></audio>
        {!callended && (!interviewStarted ? 
            <InterviewDetails onSubmit={handleSubmit} />
                :
            <LiveInterview chats={chats} name={details.name} onCancelCall={onCancelCall} userSocket={userSocket} isMicOn={isMicOn} startRecording={startRecording} stopRecording={stopRecording} isRecording={isRecording} />)
        }
        {
            callended === true && <Feedback/>
        }
        </>
    );
};

export default MyPage;
