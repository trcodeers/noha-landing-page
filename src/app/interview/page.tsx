'use client'
import Feedback from "@/components/feedback";
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const MyPage = () => {
    const [interviewStarted, setInterviewStarted] = useState<boolean>(false);
    const [details, setDetails] = useState({} as any);
    const [callEnded, setCallEnded] = useState(false);
    const [backendServiceLink] = useState(
        // "http://localhost:5000"
        "http://34.47.237.162:8000"    
        );
    const [userSocket, setUserSocket] = useState<any>(null);

    const [chats, setChats] = useState<Array<any>>([]);

    const [isMicOn, setIsMicOn] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");

    const recognitionRef = useRef<any>(null);

    const startConnection = async (userDetails: any) => {
        const socketConnection = io(backendServiceLink, { transports: ["websocket"] });
        const greetMsg: string = `Hi ${userDetails.name}, I'm Noha. I'll be conducting your interview today. Let's get started with your first question. Please introduce yourself`
        
        socketConnection.on("connect", () => {
            setInterviewStarted(true);
            setChats([
                { name: "Noha AI", message: greetMsg },
                ...chats
            ])
            speakText(greetMsg);
    
        });

        setUserSocket(socketConnection);
    };

    const speakText = (text: string): void => {
        if (!window.speechSynthesis) {
            console.error("Speech synthesis is not supported in this browser.");
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-IN";
        utterance.rate = 1;
        utterance.pitch = 1;

        window.speechSynthesis.speak(utterance);
    };

    const handleSubmit = (data: { name: string; email: string }) => {
        setDetails({ ...data });
        startConnection(data);
    };

    const onCancelCall = () => {
        stopRecording();
        setCallEnded(true);
        userSocket?.disconnect();
    };

    const startRecording = () => {
        setIsMicOn(true);
        setIsRecording(true);

        if (!("webkitSpeechRecognition" in window)) {
            alert("Your browser does not support speech recognition. Please try Chrome.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + " ";
                }
            }
            console.log('finalTranscript', finalTranscript)
            setTranscribedText(finalTranscript);
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        setIsMicOn(false);

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    useEffect(()=>{
        console.log(transcribedText)
        if (transcribedText.trim() !== "") {
            setChats((prevChats) => [ ...prevChats, { name: "Candidate", message: transcribedText } ]);
            setTranscribedText("");
        }
    }, [transcribedText])

    return (
        <>
            {!callEnded && (!interviewStarted ? (
                <InterviewDetails onSubmit={handleSubmit} />
            ) : (
                <LiveInterview
                    chats={chats}
                    name={details.name}
                    onCancelCall={onCancelCall}
                    userSocket={userSocket}
                    isMicOn={isMicOn}
                    startRecording={startRecording}
                    stopRecording={stopRecording}
                    isRecording={isRecording}
                />
            ))}
            {callEnded && <Feedback />}
        </>
    );
};

export default MyPage;
