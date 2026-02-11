import React from "react";

export const CornerGrid = () => {
  return (
    <div className="absolute left-0 bottom-0 z-0 h-[80vh] w-screen bg-grid text-my-lavender/40 opacity-30">
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 50% 0%, rgba(255,255,255,0), rgba(255,255,255,0.95))",
        }}
        className="absolute inset-0 backdrop-blur-sm"
      />
    </div>
  );
};
