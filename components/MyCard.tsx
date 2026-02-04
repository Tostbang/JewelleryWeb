import { IconType } from '@/lib/types'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

export default function MyCard({ children, Icon, title, actions }: { children: ReactNode, Icon: IconType, title: string, actions?: ReactNode }) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[60px] squircle border border-white p-4 pb-6 bg-white/40 backdrop-blur-2xl")}
    >
      <div className="">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-x-2 mb-4">
            <div className={` p-2.5 rounded-full bg-black`}>
              <Icon className={`size-4.5 text-white`} />
            </div>
            <p className="text-base font-medium">{title}</p>
          </div>
          {actions && (
            <div className={` p-3 rounded-full bg-white/50 `}>
              {actions}
            </div>
          )}

        </div>
        <div className="flex-1 px-2">
          {children}
        </div>
      </div>
    </div>
  )
}
