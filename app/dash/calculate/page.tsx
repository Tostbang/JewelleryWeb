"use client"
import MyCard from '@/components/MyCard'
import React from 'react'
import PriceCalculatorForm from '../dashboard/_components/PriceCalculatorForm'
import { Calculator01Filled, TimeQuarterPassFilled } from 'asem-icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import { useGetHistory } from '../dashboard/_services/queries'
import { Skeleton } from '@/components/ui/skeleton'

function HistorySkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between py-2 border-b">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-12 rounded" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-3 w-64" />
          </div>
          <div className="text-right space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function page() {
  const { data: historyData, isLoading } = useGetHistory()
  return (
    <div className='p-6 '>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3  ">
        <MyCard title="Hızlı Fiyat Hesaplayıcı" Icon={Calculator01Filled} className="">
          <PriceCalculatorForm />
        </MyCard>

        <MyCard title="Son Aktiviteler" Icon={TimeQuarterPassFilled}>
          <ScrollArea className="space-y-3 h-50 pr-3">
            {isLoading ? (
              <HistorySkeleton />
            ) : historyData && historyData.items && historyData.items.length > 0 ? (
              historyData.items.slice(0, 5).map((history) => (
                <div key={history.historyId} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        {history.karat}K
                      </span>
                      <p className="text-sm font-medium">Altın Hesaplama</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {history.gram ? `${history.gram.toLocaleString('tr-TR')}g • ` : ''}
                      Maliyet: ₺{history.cost.toLocaleString('tr-TR')} • İşçilik: ₺{history.laborCost.toLocaleString('tr-TR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">₺{history.totalCost.toLocaleString('tr-TR')}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(history.createdDate), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Geçmiş bulunamadı
              </div>
            )}
          </ScrollArea>
        </MyCard>

      </div>
    </div>



  )
}
