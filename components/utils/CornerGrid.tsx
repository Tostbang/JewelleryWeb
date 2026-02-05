import React from "react";

export const CornerGrid = () => {
  return (
    <div className="absolute right-0 top-0 z-0 size-[50vw] bg-grid text-my-lavender/40 opacity-50">
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(255,255,255,0), rgba(255,255,255,0.95))",
        }}
        className="absolute inset-0 backdrop-blur-sm"
      />
    </div>
  );
};
