import React, { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

export const Card = ({
  className,
  children,
  style = {},
}: {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  return (
    <motion.div
      initial={{
        filter: "blur(2px)",
      }}
      whileInView={{
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.25,
      }}
      style={style}
      className={twMerge(
        "relative h-full w-full overflow-hidden rounded-[60px] squircle border border-white/60 bg-gradient-to-br from-white/50 via-white/40 to-white/30 backdrop-blur-3xl p-6 shadow-xl shadow-my-blue/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
