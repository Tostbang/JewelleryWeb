import React from "react";
import { AnimationProps, motion } from "motion/react";

export const Beam = ({
  top,
  left,
  transition = {},
}: {
  top: number;
  left: number;
  transition?: AnimationProps["transition"];
}) => {
  return (
    <motion.div
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        y: 32 * 8,
      }}
      transition={{
        ease: "easeInOut",
        duration: 3,
        repeat: Infinity,
        repeatDelay: 1.5,
        ...transition,
      }}
      style={{
        top,
        left,
      }}
      className="absolute z-10 h-[64px] w-[1px] bg-gradient-to-b from-my-pink/0 via-my-lavender/80 to-my-pink/0 shadow-lg shadow-my-lavender/50"
    />
  );
};
