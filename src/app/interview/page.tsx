'use client'
import Feedback from "@/components/feedback";
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import { useState } from "react";
import { io } from "socket.io-client";

const MyPage = () => {

    const [interviewId, setInterviewId] = useState<null | string>(null)
    const [details, setDetails] = useState({} as any)

    const [callended, setCallEnded] = useState(false)


    const [backendServiceLink] = useState("http://localhost:2000");
    const [userSocket, setUserSocket] = useState<any>(null);
    
    const startConnection = async () => {
        const socketConnection = io(backendServiceLink + "/guest", {
            transports: ["websocket"],
        });

        socketConnection.on("streamBack", (audioData: any) => {
            console.log(audioData)
            // queueAudioData(audioData);
        });

        setUserSocket(socketConnection);
    };

    const handleSubmit = (data: { name: string; email: string }) => {
        console.log("Submitted Data:", data);
        setInterviewId('12345')
        setDetails({...data})
        startConnection()
    };

    const onCancelCall = () =>{
        console.log('klkl')
        setCallEnded(true)
    }

    return (
        <>
        {!callended && (interviewId === null ? 
            <InterviewDetails onSubmit={handleSubmit} />
                :
            <LiveInterview name={details.name} onCancelCall={onCancelCall} />)
        }
        {
            callended === true && <Feedback/>
        }
        </>
    );
};

export default MyPage;
