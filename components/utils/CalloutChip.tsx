import React, { ReactNode } from "react";

export const CalloutChip = ({ children }: { children: ReactNode }) => {
  return (
    <span className="mb-4 inline-block w-fit rounded-full border border-white/60 bg-gradient-to-r from-my-orange/30 via-my-lavender/30 to-my-blue/30 backdrop-blur-xl px-2 py-0.5 text-xs font-medium uppercase text-zinc-800 shadow-md">
      {children}
    </span>
  );
};
