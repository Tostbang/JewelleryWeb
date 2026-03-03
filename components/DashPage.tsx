"use client"
import React from 'react'
import { useSidebar } from './ui/sidebar'
import { ScrollArea } from './ui/scroll-area'

export default function DashPage({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar()
  return (
    <main className={`h-[calc(100%-56px)] overflow-y-auto w-full  custom-scroll border bg-gray-400/5 border-gray-300 squircle rounded-[40px] relative `}>
      {children}
    </main>
  )
}