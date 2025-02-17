'use client'
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ZoomEffect() {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsZoomed(true), 500); // Shrink after 0.5s
    setTimeout(() => setIsZoomed(false), 2000); // Expand after 2s
  }, []);

  return (
    <motion.div
      className="fixed top-1/2 left-1/2"
      style={{
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        borderRadius: isZoomed ? "50%" : "0%",
        width: isZoomed ? "150px" : "100vw",
        height: isZoomed ? "150px" : "100vh",
        backgroundColor: isZoomed ? "#141E61" : "#02006A",
      }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  );
}
