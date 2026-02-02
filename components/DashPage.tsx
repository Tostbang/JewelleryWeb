"use client"
import React from 'react'
import { useSidebar } from './ui/sidebar'
import { ScrollArea } from './ui/scroll-area'

export default function DashPage({ children }: { children: React.ReactNode }) {
  const { isMobile } = useSidebar()
  return (
    // <ScrollArea className={`bg-[#f8fafd] flex border !w-full h-[calc(100%-56px)] rounded-xl  ${!isMobile && "dash-page"}  relative `}>
    //   <div className='w-[calc(100vw-16px)] pt-4 md:w-full'>
    //     {children}
    //   </div>
    // </ScrollArea>
    <ScrollArea className={`block h-[calc(100%-56px)] w-full bg-linear-to-r from-[#f8fafd] from-60% to-100% to-[#f2e9d8] border  rounded-xl  ${!isMobile && "dash-page"}  relative `}>
      <div className={` `}>
        {children}
      </div>
    </ScrollArea>
  )
}