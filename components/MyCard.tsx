"use client"

import { IconType } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { ReactNode, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ArrowExpand01RoundFilled, ArrowExpand01Sharp, ChangeScreenModeFilled, CircleArrowExpand01Round, CircleArrowExpand01SharpFilled } from 'asem-icons'
import { VisuallyHidden } from 'radix-ui'

export default function MyCard({
  children,
  Icon,
  title,
  actions,
  className,
  expandable = false,
  modalStyle,
}: {
  children: ReactNode
  Icon?: IconType
  title?: string
  actions?: ReactNode
  className?: string
  expandable?: boolean
  modalStyle?: string
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <div
        className={cn("relative overflow-hidden rounded-[60px] squircle border w-full h-full border-white p-4 pb-6 bg-white/50 backdrop-blur-3xl", className)}
      >
        <div className=" h-full flex flex-col">
          <div className="w-full flex items-start justify-between ">
            <div className="flex items-center gap-x-2 mb-4">
              {Icon &&
                <div className={` p-2.5 rounded-full bg-black`}>
                  <Icon className={`size-4.5 text-white`} />
                </div>
              }
              <p className="text-base font-medium">{title}</p>
            </div>
            <div className="flex items-center gap-2">
              {actions && (
                <div>
                  {actions}
                </div>
              )}
              {expandable && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className=" p-2 bg-white/50 rounded-full"
                  aria-label="Genişlet"
                >
                  <ArrowExpand01RoundFilled className="size-4  hover:bg-white/70 transition-colors" />
                </button>
              )}
            </div>
          </div>
          <div className="h-full px-2 relative   ">
            {children}
          </div>
        </div>
      </div>

      {expandable && (
        <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
          <DialogContent className={cn("p-0 bg-transparent border-none shadow-none", modalStyle)}>
            <VisuallyHidden.Root>
              <DialogTitle>modeli genişlet</DialogTitle>
            </VisuallyHidden.Root>
            <div className={cn("relative overflow-hidden rounded-[60px] squircle border w-full h-full border-white p-4 pb-6 bg-[#f6f2ea] backdrop-blur-3xl", className)}>
              <div className="h-full flex flex-col">
                <div className="w-full flex items-start justify-between">
                  <div className="flex items-center gap-x-2 mb-4">
                    {Icon &&
                      <div className={`p-2.5 rounded-full bg-black`}>
                        <Icon className={`size-4.5 text-white`} />
                      </div>
                    }
                    <p className="text-base font-medium">{title}</p>
                  </div>
                  {actions && (
                    <div>
                      {actions}
                    </div>
                  )}
                </div>
                <div className="h-full px-2 relative overflow-auto">
                  {children}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
