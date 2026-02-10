import React from "react";
import { motion } from "motion/react";

export const GradientGrid = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2.5,
        ease: "easeInOut",
      }}
      className="absolute inset-0 z-0"
    >
      <div className="absolute inset-0 z-0 bg-grid opacity-30" style={{ backgroundColor: '#c8a3ed' }} />
      <div className="absolute inset-0 z-0 bg-linear-to-b from-white/90 via-my-pink/10 to-white " />
    </motion.div>
  );
};
