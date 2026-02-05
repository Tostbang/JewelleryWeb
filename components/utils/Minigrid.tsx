import { Beams } from "@/components/utils/Beams";
import React from "react";

export const Minigrid = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-grid text-my-pink/30 opacity-40">
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/90 backdrop-blur-sm" />
      <Beams />
    </div>
  );
};
