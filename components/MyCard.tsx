import { IconType } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export default function MyCard({ children, Icon, title, actions, className }: { children: ReactNode, Icon?: IconType, title?: string, actions?: ReactNode, className?: string }) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[60px] squircle border w-full h-full border-white p-4 pb-6 bg-white/50 backdrop-blur-3xl", className)}
    >
      <div className=" h-full flex flex-col">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-2 mb-4">
            {Icon &&
              <div className={` p-2.5 rounded-full bg-black`}>
                <Icon className={`size-4.5 text-white`} />
              </div>
            }
            <p className="text-base font-medium">{title}</p>
          </div>
          {actions && (
            <div className={` p-3 rounded-full bg-white/50 `}>
              {actions}
            </div>
          )}

        </div>
        <div className="h-full px-2 relative   ">
          {children}
        </div>
      </div>
    </div>
  )
}
