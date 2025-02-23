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
    const [backendServiceLink] = useState("http://34.47.237.162:8000");
    const [userSocket, setUserSocket] = useState<any>(null);
    const [chats, setChats] = useState<Array<any>>([]);

    const [isMicOn, setIsMicOn] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcribedText, setTranscribedText] = useState("");

    const recognitionRef = useRef<any>(null);
    const fullTranscriptRef = useRef<string>(""); // Stores the full transcript

    const startConnection = async (userDetails: any) => {
        const socketConnection = io(backendServiceLink, { transports: ["websocket"] });
        const greetMsg: string = `Hi ${userDetails.name}, Find an index in an array where the sum of elements to the left equals the sum to the right.`;

        socketConnection.on("connect", () => {
            console.log('Connected');
            if (!interviewStarted) speakText(greetMsg);
            setInterviewStarted(true);
            updateChats(greetMsg);
        });

        socketConnection.on("disconnect", () => {
            console.log("Client disconnected from server");
        });

        socketConnection.on("streamBack", (data) => {
            console.log('Received AI response');
            updateChats(data);
            speakText(data);
        });

        setUserSocket(socketConnection);
    };

    const updateChats = (msg: string, sender = "Noha AI") => {
        setChats((prevChats) => [
            { name: sender, message: msg },
            ...prevChats,
        ]);
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
        setIsTranscribing(false);
        setTranscribedText(""); // Reset previous transcript
        fullTranscriptRef.current = ""; // Reset full transcript storage

        if (!("webkitSpeechRecognition" in window)) {
            alert("Your browser does not support speech recognition. Please try Chrome.");
            return;
        }

        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false; // Store only final results
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript + " ";
                }
            }
            fullTranscriptRef.current += finalTranscript; // Append to full transcript
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopRecording = () => {
        if (!isRecording) return; // Prevent double calls

        setIsRecording(false);
        setIsMicOn(false);
        setIsTranscribing(true); // Show "Transcribing..." message

        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    useEffect(() => {
        if (!isRecording && isTranscribing) {
            setTimeout(() => {
                const finalText = fullTranscriptRef.current.trim();
                if (finalText !== "") {
                    console.log('Final Transcribed Text:', finalText);
                    userSocket?.emit('STOP', finalText);
                    updateChats(finalText, "Candidate");
                }
                setTranscribedText(finalText);
                setIsTranscribing(false); // Hide "Transcribing..." message
            }, 1000); // Simulate processing time
        }
    }, [isTranscribing]);

    const sendFeedback = async (rating: number) => {
        try {
            const response = await axios.post("http://localhost:5000/feedback", { rating });
            console.log("Response:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error submitting feedback:", error.response ? error.response.data : error.message);
            throw error;
        }
    };

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
                    isTranscribing={isTranscribing} // Pass to UI for "Transcribing..."
                />
            ))}
            {callEnded && <Feedback sendFeedback={sendFeedback} />}
        </>
    );
};

export default MyPage;
