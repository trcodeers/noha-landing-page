'use client'
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import { useState } from "react";

const MyPage = () => {

    const [interviewId, setInterviewId] = useState<null | string>(null)
    const [details, setDetails] = useState({} as any)

    const handleSubmit = (data: { name: string; email: string }) => {
        console.log("Submitted Data:", data);
        setInterviewId('12345')
        setDetails({...data})
    };

    return (interviewId === null ? 
        <InterviewDetails onSubmit={handleSubmit} />
        :
        <LiveInterview name={details.name} />
    );
};

export default MyPage;
