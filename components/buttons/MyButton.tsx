import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

type Props = {
  children: ReactNode;
  className?: string;
  ghost?: boolean
} & React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  };

export const MyButton = ({ children, className, ghost = false, ...rest }: Props) => {
  return (
    <Button
      variant={ghost ? "outline" : "default"}
      className={cn("px-6 h-12 font-extralight text-[15px] text-white", ghost && "text-black", className)}
      {...rest}
    >
      {children}
    </Button >
  );
};
