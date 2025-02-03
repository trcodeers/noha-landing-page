"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const VideoInterview = () => {
    const [backendServiceLink] = useState("http://localhost:2000");
    const [userSocket, setUserSocket] = useState<any>(null);
    const [isRecording, setIsRecording] = useState<any>(false);
    let mediaRecorder: any = null;

    useEffect(() => {
        startConnection();
    }, []);

    const startConnection = async () => {
        const socketConnection = io(backendServiceLink + "/guest", {
            transports: ["websocket"],
        });

        setUserSocket(socketConnection);
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event: any) => {
                if (event.data.size > 0 && userSocket) {
                    userSocket.emit("audioStream", event.data);
                }
            };

            mediaRecorder.start(500); // Send audio chunks every 500ms
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        setIsRecording(false);
    };

    return (
        <div>
            <p>FROM VIDEO</p>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
        </div>
    );
};

export default VideoInterview;
