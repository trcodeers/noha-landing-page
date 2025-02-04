"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const VideoInterview = () => {
    const [backendServiceLink] = useState<any>("http://localhost:2000");
    const [userSocket, setUserSocket] = useState<any>(null);
    const [isRecording, setIsRecording] = useState<any>(false);
    const [isMuted, setIsMuted] = useState<any>(false);

    const mediaRecorderRef : any = useRef(null);
    const audioStreamRef : any = useRef(null);
    const audioTrackRef : any = useRef(null);

    useEffect(() => {
        startConnection();
    }, []);

    const startConnection = async () => {
        const socketConnection = io(backendServiceLink + "/guest", {
            transports: ["websocket"],
        });
        setUserSocket(socketConnection);
    };

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

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioStreamRef.current = stream;
            audioTrackRef.current = stream.getAudioTracks()[0]; // Save the track for mute/unmute

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && userSocket && !isMuted) {
                    userSocket.emit("audioStream", event.data);
                }
            };

            mediaRecorder.start(500); // Send audio chunks every 500ms
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Failed to access microphone. Please check browser settings and allow microphone access.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track: any) => track.stop());
        }
        
        setIsRecording(false);
        setIsMuted(false);

        // Notify backend to stop recording and process audio
        if (userSocket) {
            userSocket.emit("stopRecording");
        }
    };

    const toggleMute = () => {
        if (audioTrackRef.current) {
            const newMuteState = !isMuted;
            audioTrackRef.current.enabled = !newMuteState; // Toggle audio track
            setIsMuted(newMuteState);
        }
    };

    return (
        <div>
            <p>FROM VIDEO</p>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {/* {isRecording && (
                <button onClick={toggleMute} style={{ marginLeft: "10px" }}>
                    {isMuted ? "Unmute Mic" : "Mute Mic"}
                </button>
            )} */}
        </div>
    );
};

export default VideoInterview;
