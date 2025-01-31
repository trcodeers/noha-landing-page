'use client'
import DropInput from "@/components/dropinput";
import React, { useState } from "react";

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

    return (
        <div className="flex h-screen m-[24px]">
        {/* Left Section - Image (Hidden on Small Screens) */}
        <div className="hidden md:block w-1/2 h-full">
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
            {/* Select Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-3/4 md:w-1/2 px-2 h-11 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 transition duration-200 ease-in-out"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
      
            {/* Select Competency */}
            <div>
              <label htmlFor="competency" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Competency
              </label>
              <select
                id="competency"
                name="competency"
                value={formData.competency}
                onChange={handleChange}
                className="w-3/4 md:w-1/2 px-2 h-11 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 transition duration-200 ease-in-out"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
      
            {/* Select Bar */}
            <div>
              <label htmlFor="bar" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Bar
              </label>
              <select
                id="bar"
                name="bar"
                value={formData.bar}
                onChange={handleChange}
                className="w-3/4 md:w-1/2 p-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-0 focus:border-gray-300 transition duration-200 ease-in-out"
              >
                <option value="">Choose an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
      
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
