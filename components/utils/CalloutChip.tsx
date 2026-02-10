import React, { ReactNode } from "react";

export const CalloutChip = ({ children }: { children: ReactNode }) => {
  return (
    <span className="mb-4 inline-block w-fit rounded-full border border-white/60 bg-black text-white backdrop-blur-xl px-2 py-0.5 text-xs font-medium uppercase shadow-md">
      {children}
    </span>
  );
};
