"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const VideoInterview = () => {
    const [backendServiceLink] = useState("http://localhost:2000");
    const [userSocket, setUserSocket] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioStreamRef = useRef(null);
    const audioTrackRef = useRef(null);
    const audioPlayerRef = useRef(null);

    useEffect(() => {
        startConnection();
    }, []);

    const startConnection = async () => {
        const socketConnection = io(backendServiceLink + "/guest", {
            transports: ["websocket"],
        });

        socketConnection.on("playAudio", (audioData) => {
            playReceivedAudio(audioData);
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
            audioTrackRef.current = stream.getAudioTracks()[0];

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && userSocket && !isMuted) {
                    userSocket.emit("audioStream", event.data);
                }
            };

            mediaRecorder.start(500);
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
            alert("Failed to access microphone. Please check browser settings.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track) => track.stop());
        }

        setIsRecording(false);
        setIsMuted(false);

        if (userSocket) {
            userSocket.emit("stopRecording");
        }
    };

    const toggleMute = () => {
        if (audioTrackRef.current) {
            const newMuteState = !isMuted;
            audioTrackRef.current.enabled = !newMuteState;
            setIsMuted(newMuteState);
        }
    };

    const playReceivedAudio = (audioData) => {
        try {
            if (!audioPlayerRef.current) return;
    
            // Ensure valid audio data (Uint8Array or ArrayBuffer)
            if (!(audioData instanceof Uint8Array || audioData instanceof ArrayBuffer)) {
                console.error("Invalid audio data received:", audioData);
                return;
            }
    
            // **Create a new Blob** and Object URL every time
            const blob = new Blob([audioData], { type: "audio/webm" });  // Change "audio/webm" to "audio/mp3" if needed
            const audioUrl = URL.createObjectURL(blob);
    
            // **Reset audio player to force reload**
            audioPlayerRef.current.pause();
            audioPlayerRef.current.currentTime = 0;
            audioPlayerRef.current.src = audioUrl;
            audioPlayerRef.current.load();  // Ensure fresh load
    
            // ✅ Ensure event listener runs every time
            console.log("Audio is ready to play!", audioData);
            console.log(audioPlayerRef.current.oncanplaythrough)
            audioPlayerRef.current.oncanplaythrough = () => {
    
                // Play the new audio
                audioPlayerRef.current.play().catch((err) => console.error("Playback error:", err));
                setIsSpeaking(true);
            };
    
            // **Reset speaking state when audio ends**
            audioPlayerRef.current.onended = () => setIsSpeaking(false);
    
        } catch (error) {
            console.error("Error while playing audio:", error);
        }
    };
    
    

    return (
        <div>
            <p>FROM VIDEO</p>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {isRecording && (
                <button onClick={toggleMute} style={{ marginLeft: "10px" }}>
                    {isMuted ? "Unmute Mic" : "Mute Mic"}
                </button>
            )}

            {isSpeaking && <p>AI is speaking...</p>}
            <audio ref={audioPlayerRef} controls style={{ display: "none" }}></audio>
        </div>
    );
};

export default VideoInterview;
