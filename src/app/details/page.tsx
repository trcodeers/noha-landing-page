import { X } from "lucide-react";

const InterviewModal = () => {
    return (
        <>

            <div className="fixed inset-0 flex justify-center bg-gradient-to-br from-[#3600FF] to-[#361899] p-6">
                <button className="absolute right-4 top-4 text-white">
                    <X size={24} />
                </button>
                <div className="relative mt-10 w-full max-w-lg bg-transparent rounded-2xl p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white">
                        Meet Noha: Your intelligent conversational interviewer
                    </h2>
                    <p className="text-gray-300 mt-2">
                        Begin by providing your interview details.
                    </p>

                    {/* Input Section */}
                    <div className="mt-20">
                        <p className="text-white font-medium text-lg">What is your name?</p>
                        <div className="mt-3 flex flex-col items-center">
                            <input
                                type="text"
                                placeholder="Type here..."
                                className="w-full max-w-md px-5 py-3 rounded-full bg-white text-gray-900 shadow-md outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="mt-4 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 19v2"></path>
                                    <rect x="9" y="2" width="6" height="11" rx="3"></rect>
                                    <path d="M5 10a7 7 0 0 0 14 0"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InterviewModal;
