"use client";
import FrontPage from "@/components/FrontPage";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 1500); // Transition duration
  }, []);

  return (
    <div className="relative">
      {isAnimating && (
        <div className="absolute inset-0 z-50">
          {/* Blue Screen */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#361899]"
          />

          {/* White Screen */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.7 }}
            className="absolute inset-0 bg-white"
          />
        </div>
      )}

      {/* Actual Page Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }} // Delayed to match animation
        className={isAnimating ? "invisible" : "visible"}
      >
        <FrontPage />
      </motion.div>
    </div>
  );
};

export default Index;
