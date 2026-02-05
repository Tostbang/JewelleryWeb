import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const GhostButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        "rounded-md px-4 py-2 text-lg text-zinc-900 transition-all hover:scale-[1.02] hover:bg-gradient-to-r hover:from-my-blue/10 hover:to-my-lavender/10 hover:backdrop-blur-sm hover:text-zinc-900 active:scale-[0.98]",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
