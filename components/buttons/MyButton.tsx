import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  ghost?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const MyButton = ({ children, className, ghost = false, ...rest }: Props) => {
  return (
    <Button
      variant={ghost ? "outline" : "default"}
      className={cn("px-6 h-14 font-extralight text-[15px] text-white", ghost && "text-black", className)}
      {...rest}
    >
      {children}
    </Button >
  );
};
