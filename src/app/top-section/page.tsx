import Link from "next/link";
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <div
      className="relative h-screen bg-[#361899] flex flex-col items-center bg-[url('/curve.png')] bg-no-repeat bg-cover bg-center"
    >
      {/* Navbar */}
      <nav className="w-full max-w-6xl mt-6 px-6 flex justify-between items-center bg-[#3224A2] rounded-full py-3 shadow-lg">
        <div className="text-white text-lg font-semibold px-6">Noha.ai</div>
        <div className="flex space-x-8 text-white">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Product</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Use cases</a>
        </div>
        <div className="flex space-x-4 pr-6">
          <button className="px-8 py-3 text-black font-semibold rounded-full bg-gradient-to-r from-[#77FFF1] to-[#0B9284] ">
            Try Noha
          </button>
          <button className="px-5 py-2 border border-[#77FFF1] text-white rounded-full shadow-md">
            Login
          </button>
        </div>
      </nav>


      {/* <img src="curve.png" width={"100%"} alt="" className="absolute mt-[14%]" /> */}


      {/* Hero Content */}
      <div className="flex flex-row h-screen justify-center gap-10 mt-[10%]">

        <div className="flex flex-col w-[50%] text-white max-w-4xl px-6">
          <h1 className="text-4xl font-bold">
            Noha.ai : Interview <br /> Smarter, Hire Better.
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            An AI-powered technical interviewer that conducts human-like,
            competency-based interviews to effortlessly identify top talent—no
            more manual interviews.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <Link href={"/details"}>
              <button className="px-8 py-3 text-black font-semibold rounded-full bg-gradient-to-r from-[#77FFF1] to-[#0B9284] ">
                Try Noha
              </button>
            </Link>
            <button className="px-6 py-3 border border-[#77FFF1] text-white rounded-full">
              Watch a demo
            </button>
          </div>
        </div>
        <div className="w-72 h-72 bg-[#16073D] rounded-full"></div>

      </div>

    </div>
  );
};

export default HeroSection;
