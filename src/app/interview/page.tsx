'use client'
import CustomDropdown from "@/components/DropDownInput";
// import DropInput from "@/components/dropinput";
import React, { useState } from "react";

interface Option {
    value: string;
    label: string;
}

const FullPageLayout = () => {
    // State to store selected values from dropdowns
    const [formData, setFormData] = useState({
        role: "",
        competency: "",
        bar: ""
    });

    // Handle change in dropdown values
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Form Data Submitted:", formData);
    };


    const barOptions: Option[] = [ // New options for Bar
        { value: "", label: "Choose an option" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    const competencyOptions: Option[] = [
        { value: "", label: "Choose an option" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ]

    const roleOptions: Option[] = [
        { value: "", label: "Choose an option" },
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ]

    return (
        <div className="flex h-screen m-[24px]">
            {/* Left Section - Image (Hidden on Small Screens) */}
            <div className="hidden md:block w-1/2 h-full">
                <div className="w-[26px] h-[26px] bg-[#D9D9D9] rounded-full absolute top-[44px] left-[46px]"></div>
                <img
                    src="image (10).webp"
                    alt="Left Half"
                    className="w-full h-full object-cover rounded-[30px]"
                />
            </div>

            {/* Right Section - Form (Takes Full Width on Small Screens) */}
            <div className="w-full md:w-1/2 flex flex-col p-6">
                <h1 className="text-[28px] mb-6 font-semibold text-gray-800">
                    Your intelligent conversational interviewer
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                   
                    <CustomDropdown
                        id="role"
                        name="role"
                        options={roleOptions}
                        label="Select Role"
                        placeholder="Choose an option"
                        value={formData.role}
                        onChange={(value: string) => setFormData({ ...formData, role: value })}
                        width="md:w-1/2 sm:w-full" 
                    />

                    <CustomDropdown
                        id="competency"
                        name="competency"
                        options={competencyOptions}
                        label="Select Competency"
                        placeholder="Choose an option"
                        value={formData.competency}
                        onChange={(value: string) => setFormData({ ...formData, competency: value })}
                        width="md:w-1/2 sm:w-full" 
                    />

                    <CustomDropdown
                        id="bar"
                        name="bar"
                        options={barOptions}
                        label="Select Bar"
                        placeholder="Choose an option"
                        value={formData.bar}
                        onChange={(value: string) => setFormData({ ...formData, bar: value })}
                        width="md:w-1/2 sm:w-full" 
                    />
                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="py-3 rounded-full focus:outline-none bg-gradient-to-r from-[#0D99FF] to-[#0A5992] text-white px-5"
                        >
                            Start Interview
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FullPageLayout;
