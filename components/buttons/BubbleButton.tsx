import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const BubbleButton = ({ children, className, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        `
            relative z-0 flex rounded-full items-center gap-2 overflow-hidden whitespace-nowrap 
            border border-white bg-white/40  backdrop-blur-2xl
           px-3 py-1.5
           text-zinc-900 transition-all duration-300 shadow-md
            before:absolute before:inset-0
            before:-z-10 before:translate-y-[200%]
            before:scale-[2.5]
            before:rounded-[100%] before:bg-my-pink
            before:transition-transform before:duration-500
            before:content-[""]
            hover:scale-105 hover:text-white hover:shadow-lg hover:shadow-my-lavender/30
            hover:before:translate-y-[0%]
            active:scale-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
