"use client"

import { AlertCircle, CheckmarkCircle02, InformationCircle, Loading, MultiplicationSignCircle } from "asem-icons"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <CheckmarkCircle02 strokeWidth={2} className="size-4" />
        ),
        info: (
          <InformationCircle strokeWidth={2} className="size-4" />
        ),
        warning: (
          <AlertCircle strokeWidth={2} className="size-4" />
        ),
        error: (
          <MultiplicationSignCircle strokeWidth={2} className="size-4" />
        ),
        loading: (
          <Loading strokeWidth={2} className="size-4 animate-spin" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
