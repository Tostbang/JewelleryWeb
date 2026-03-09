"use client"
import MyCard from '@/components/MyCard'
import React, { SetStateAction, useState } from 'react'
import PriceCalculatorForm from '../dashboard/_components/PriceCalculatorForm'
import ManualPriceCalculatorForm from '../dashboard/_components/ManualPriceCalculatorForm'
import KaratCompareForm from '../dashboard/_components/KaratCompareForm'
import WeightConverterForm from '../dashboard/_components/WeightConverterForm'
import { Calculator01Filled, TimeQuarterPassFilled, JusticeScale01Filled, BodyWeightFilled, Calendar04, GoldIngotsFilled } from 'asem-icons'
import { useGetHistory, HistoryItem, HistoryParams, useGetManualHistory, ManualHistoryItem, ManualHistoryParams } from '../dashboard/_services/queries'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from '@/components/data-table'
import { createHistoryColumns } from './columns'
import { Filter } from 'lucide-react'
import { format, formatDate } from 'date-fns'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { tr } from 'date-fns/locale'

function HistoryTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  )
}

const KARAT_OPTIONS = [
  { value: "14", label: "14K" },
  { value: "18", label: "18K" },
  { value: "22", label: "22K" },
  { value: "24", label: "24K" },
]

export default function CalculatePage() {
  const [karatFilter, setKaratFilter] = useState<number | undefined>(undefined)
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [selectedItem, setSelectedItem] = useState<HistoryItem | ManualHistoryItem | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [historySource, setHistorySource] = useState<"normal" | "manual">("normal")

  const params: HistoryParams = {
    ...(karatFilter !== undefined && { karat: karatFilter }),
    ...(startDate && { startDate: startDate.toISOString() }),
    ...(endDate && { endDate: endDate.toISOString() }),
  }

  const { data: historyData, isLoading } = useGetHistory(params)
  const { data: manualHistoryData, isLoading: isManualLoading } = useGetManualHistory(params)

  const activeData = historySource === "normal" ? historyData : manualHistoryData
  const activeLoading = historySource === "normal" ? isLoading : isManualLoading

  const handleViewDetails = (item: HistoryItem | ManualHistoryItem) => {
    setSelectedItem(item)
    setDetailOpen(true)
  }

  const columns = createHistoryColumns(handleViewDetails)

  return (
    <div className='p-2 md:p-6'>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3 ">
        <div className={cn("hidden md:absolute size-100 left-10 top-0 blur-[100px] rounded-full opacity-30 bg-my-blue")}></div>
        <div className={cn("hidden md:absolute size-100 right-10 top-0 blur-[100px] rounded-full opacity-30 bg-my-lavender")}></div>
        <MyCard title="Fiyat Hesaplayıcı" Icon={Calculator01Filled}>
          <PriceCalculatorForm />
        </MyCard>
        <MyCard title="Manuel Fiyat Hesaplayıcı" Icon={GoldIngotsFilled}>
          <ManualPriceCalculatorForm />
        </MyCard>
        <MyCard title="Karat Karşılaştırması" Icon={JusticeScale01Filled}>
          <KaratCompareForm />
        </MyCard>
        <MyCard title="Ağırlık Dönüştürücü" Icon={BodyWeightFilled}>
          <WeightConverterForm />
        </MyCard>
      </div>
      <MyCard
        title="Son Aktiviteler"
        Icon={TimeQuarterPassFilled}
        actions={
          // <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:w-auto">
          //   <Select value={historySource} onValueChange={(v) => setHistorySource(v as "normal" | "manual")}>
          //     <SelectTrigger className="w-full sm:w-40 h-8 text-xs">
          //       <SelectValue />
          //     </SelectTrigger>
          //     <SelectContent>
          //       <SelectItem value="normal">Fiyat Hesaplayıcı</SelectItem>
          //       <SelectItem value="manual">Manuel Hesaplayıcı</SelectItem>
          //     </SelectContent>
          //   </Select>
          //   <div className="flex items-center gap-2 w-full sm:w-auto">
          //     <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
          //     <Select
          //       value={karatFilter !== undefined ? String(karatFilter) : "all"}
          //       onValueChange={(v) => setKaratFilter(v === "all" ? undefined : Number(v))}
          //     >
          //       <SelectTrigger className="flex-1 sm:w-32 h-8 text-xs">
          //         <SelectValue placeholder="Karat" />
          //       </SelectTrigger>
          //       <SelectContent>
          //         <SelectItem value="all">Tümü</SelectItem>
          //         {KARAT_OPTIONS.map((o) => (
          //           <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          //         ))}
          //       </SelectContent>
          //     </Select>
          //   </div>
          //   <div className='flex gap-x-2 w-full sm:w-68'>
          //     <div className='w-1/2'>
          //       <DateInput date={startDate} setDate={setStartDate} placeholder="Başlangıç" />
          //     </div>
          //     <div className='w-1/2'>
          //       <DateInput date={endDate} setDate={setEndDate} placeholder="Bitiş" />
          //     </div>
          //   </div>
          // </div>
          <div></div>
        }
      >
        {activeLoading ? (
          <HistoryTableSkeleton />
        ) : activeData && activeData.items && activeData.items.length > 0 ? (
          <DataTable columns={columns} data={activeData.items} />
        ) : (
          <div className="text-center py-8 text-sm text-muted-foreground">
            Geçmiş bulunamadı
          </div>
        )}
      </MyCard>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>İşlem Detayı</DialogTitle>
            <DialogDescription>Hesaplama kaydının detayları</DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="grid gap-3 py-2">
              {[
                { label: "Karat", value: `${selectedItem.karat}K` },
                { label: "Maliyet", value: `₺${selectedItem.cost.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}` },
                { label: "Gram Fiyatı", value: `₺${selectedItem.gramPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}` },
                { label: "İşçilik", value: `₺${selectedItem.laborCost.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}` },
                { label: "Toplam", value: `₺${selectedItem.totalCost.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}`, bold: true },
                { label: "Tarih", value: format(new Date(selectedItem.createdDate), "dd MMM yyyy HH:mm") },
              ].map(({ label, value, bold }) => (
                <div key={label} className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium text-sm">{label}:</span>
                  <span className={`col-span-2 text-sm ${bold ? "font-bold text-primary" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}



export function DateInput({ date, setDate, placeholder }: { date: Date | undefined, setDate: (date: Date | undefined) => void, placeholder: string }) {
  const [open, setOpen] = useState(false)

  return <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant={'outline'}
        className={cn(
          'w-full pl-3 text-left font-normal text-xs h-9 rounded-full bg-input/30',
          !date && 'text-muted-foreground'
        )}
      >
        {date ? format(date, "dd MMM yyyy", { locale: tr }) : <span>{placeholder}</span>}
        <Calendar04 className="ml-auto h-4 w-4 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        // disabled={{ before: new Date() }}
        mode="single"
        selected={date}
        onSelect={(date) => {
          // const formattedDate = format(date as Date, 'dd/MM/yyyy');
          console.log(date)
          if (date) {
            setDate(date);
            setOpen(false)
          }
        }}
        initialFocus
      />
    </PopoverContent>
  </Popover>
}