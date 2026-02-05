import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SplashButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-my-blue via-my-lavender to-my-pink px-4 py-2 text-lg text-white ring-2 ring-my-lavender/50 ring-offset-2 ring-offset-white transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-my-lavender/30 hover:ring-transparent active:scale-[0.98] active:ring-my-blue/70",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
