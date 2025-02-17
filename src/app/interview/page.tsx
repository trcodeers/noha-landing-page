'use client'
import InterviewDetails from "@/components/InterviewDetails";
import LiveInterview from "@/components/LiveInterview";
import { useState } from "react";

const MyPage = () => {

    const [interviewId, setInterviewId] = useState<null | string>(null)

    const handleSubmit = (data: { name: string; email: string }) => {
        console.log("Submitted Data:", data);
        setInterviewId('12345')
    };

    return (interviewId === null ? 
        <InterviewDetails onSubmit={handleSubmit} />
        :
        <LiveInterview/>
    );
};

export default MyPage;
