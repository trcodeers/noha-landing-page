'use client'
import Feedback from "@/components/feedback";
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import { useState } from "react";

const MyPage = () => {

    const [interviewId, setInterviewId] = useState<null | string>(null)
    const [details, setDetails] = useState({} as any)

    const [callended, setCallEnded] = useState(false)

    const handleSubmit = (data: { name: string; email: string }) => {
        console.log("Submitted Data:", data);
        setInterviewId('12345')
        setDetails({...data})
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
