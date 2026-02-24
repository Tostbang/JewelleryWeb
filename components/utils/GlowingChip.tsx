import { IconType } from "@/lib/types";
import React from "react";

export const GlowingChip = ({ children, Icon }: { children: string, Icon?: IconType }) => {
  return (
    <span className="relative flex items-center gap-x-1 z-10 mb-4 rounded-full border  bg-my-pink border-gray-400 backdrop-blur-xl px-3 py-1.5 text-xs text-zinc-800 md:mb-0 md:text-sm shadow-lg">
      {children}
      {Icon && (
        <Icon className="size-5.5" />
      )}
      <span className="absolute bottom-0 left-3 right-3 h-[1px] bg-gradient-to-r from-my-orange/0 via-my-lavender to-my-orange/0" />
    </span>
  );
};
