import React from "react";

export const GlowingChip = ({ children }: { children: string }) => {
  return (
    <span className="relative z-10 mb-4 inline-block rounded-full border border-white/60 bg-gradient-to-r from-my-orange/40 via-my-pink/40 to-my-lavender/40 backdrop-blur-xl px-3 py-1.5 text-xs text-zinc-800 md:mb-0 md:text-sm shadow-lg">
      {children}
      <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-my-orange/0 via-my-lavender to-my-orange/0" />
    </span>
  );
};
