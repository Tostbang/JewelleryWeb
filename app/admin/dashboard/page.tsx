
"use client"

import { Bar, BarChart, Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { AlignBoxBottomCenter, User02, TradeMark, UserLock01, Bitcoin, BitcoinCircle, BitcoinFilled, BitcoinSquare, BitcoinSquareFilled, Chart, Coins01Filled, Gem, GemFilled, Package, PackageAdd, ShoppingCart01, TruckReturn, TruckReturnFilled, UserAccount, PackageFilled, Desk, Desk01, Desk02Filled, Football, Basketball02Filled, PackageReceiveFilled, UserMultipleFilled, AnalyticsUpFilled, Analytics01Filled, ArrowExpand01Sharp, BorderFullFilled, Calculator01Filled, IrisScanFilled, Sparkles, TimeQuarterPassFilled, GoldIngotsFilled, TimeHalfPassFilled, GoldFilled } from "asem-icons"
import { UserMinus } from "lucide-react"
import { cn } from "@/lib/utils"
import MyCard from "@/components/MyCard"
import { formatDistanceToNow } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetLiveBuySell } from "@/app/dash/dashboard/_services/queries"

function LiveDataSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[180px] rounded-[60px]" />
      ))}
    </div>
  )
}

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

const salesData = [
  { month: "Jan", sales: 45000, orders: 23 },
  { month: "Feb", sales: 52000, orders: 28 },
  { month: "Mar", sales: 48000, orders: 25 },
  { month: "Apr", sales: 61000, orders: 32 },
  { month: "May", sales: 55000, orders: 29 },
  { month: "Jun", sales: 67000, orders: 35 },
]

const inventoryData = [
  { category: "Rings", value: 450, fill: "#3b82f6" },
  { category: "Necklaces", value: 320, fill: "#eab308" },
  { category: "Earrings", value: 280, fill: "#8b5cf6" },
  { category: "Bracelets", value: 184, fill: "#10b981" },
]

const goldPriceData = [
  { day: "Mon", price: 6420 },
  { day: "Tue", price: 6435 },
  { day: "Wed", price: 6428 },
  { day: "Thu", price: 6445 },
  { day: "Fri", price: 6438 },
  { day: "Sat", price: 6450 },
]

const chartConfig = {
  sales: {
    label: "Sales (₹)",
    color: "#3b82f6",
  },
  orders: {
    label: "Orders",
    color: "#10b981",
  },
  price: {
    label: "Price (₹/g)",
    color: "#eab308",
  },
}

export default function DashboardPage() {
  // const { data: historyData, isLoading } = useGetHistory()
  const { data: liveData, isLoading: isLiveDataLoading } = useGetLiveBuySell()
  const [selectedKarat, setSelectedKarat] = useState("14")

  const getKaratPrice = () => {
    if (!liveData) return "..."
    switch (selectedKarat) {
      case "14":
        return `₺${liveData.karatPrices.gram14kTl.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "18":
        return `₺${liveData.karatPrices.gram18kTl.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "22":
        return `₺${liveData.karatPrices.gram22kTl.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      case "24":
        return `₺${liveData.karatPrices.gram24kTl.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
      default:
        return "..."
    }
  }

  const statsCards = [
    {
      title: "Gram Alış (TL)",
      value: liveData ? `₺${liveData.gramBuyTl.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "...",
      change: liveData?.timestamp ? new Date(liveData.timestamp * 1000).toLocaleTimeString('tr-TR') : "",
      trend: "neutral" as const,
      icon: Coins01Filled,
      bgColor: "bg-my-orange",
      iconColor: "fill-blue-600",
    },
    {
      title: "Gram Satış (TL)",
      value: liveData ? `₺${liveData.gramSellTl.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "...",
      change: liveData?.timestamp ? new Date(liveData.timestamp * 1000).toLocaleTimeString('tr-TR') : "",
      trend: "neutral" as const,
      icon: AnalyticsUpFilled,
      bgColor: "bg-my-blue",
      iconColor: "text-yellow-600",
    },
    {
      title: "Çeyrek Altın",
      value: liveData ? `₺${liveData.ceyrekAltin.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "...",
      change: "Çeyrek",
      trend: "neutral" as const,
      icon: TimeQuarterPassFilled,
      bgColor: "bg-my-lavender",
      iconColor: "text-purple-600",
    },
    {
      title: "Yarım Altın",
      value: liveData ? `₺${liveData.yarimAltin.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "...",
      change: "Yarım",
      trend: "neutral" as const,
      icon: TimeHalfPassFilled,
      bgColor: "bg-my-pink",
      iconColor: "text-green-500",
    },
    {
      title: "Tam Altın",
      value: liveData ? `₺${liveData.tamAltin.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "...",
      change: "Tam",
      trend: "neutral" as const,
      icon: GoldIngotsFilled,
      bgColor: "bg-my-orange2",
      iconColor: "text-orange-600",
    },
    {
      title: "Has Altın",
      value: liveData ? `₺${liveData.hasAltin.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "...",
      change: "Has",
      trend: "neutral" as const,
      icon: GoldIngotsFilled,
      bgColor: "bg-my-lavender2",
      iconColor: "text-gray-600",
    },
  ]

  return (
    <div className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className=''>
          </div>
          <h1 className="text-3xl font-bold">Kuyumculuk Paneli</h1>
          <p className="text-muted-foreground mt-1">İşletmenizin genel görünümü</p>
        </div>
        <div suppressHydrationWarning={true} className="text-sm text-muted-foreground">
          Son güncelleme: {new Date().toLocaleTimeString('tr-TR')}
        </div>
      </div>

      <MyCard title="İş Özeti" Icon={BorderFullFilled} >
        {isLiveDataLoading ? (
          <LiveDataSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {statsCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={index}
                  className={cn("relative overflow-hidden rounded-[60px] squircle border bg-card p-3 transition-all hover:shadow-md hover:scale-[1.02]", card.bgColor)}
                >
                  <div className="">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <div className={` p-3 rounded-full bg-white/40 `}>
                          <Icon className={`size-4 `} />
                        </div>
                        <p className="text-sm font-medium">{card.title}</p>
                      </div>
                      <div className={` p-3 rounded-full bg-white/40 `}>
                        <ArrowExpand01Sharp className={`size-3 `} />
                      </div>
                    </div>
                    <div className="flex-1 px-2">
                      <div className="min-h-20 flex items-end">
                        <h3 className="text-2xl font-bold mt-2 ">{card.value}</h3>
                      </div>
                      <p className="text-xs mt-2 flex items-center gap-1 text-black">
                        {card.change}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Karat Prices Card with Selector */}
            <div className="relative overflow-hidden rounded-[60px] squircle border bg-card p-3 transition-all hover:shadow-md hover:scale-[1.02] bg-my-orange">
              <div className="">
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-x-2">
                    <div className="p-3 rounded-full bg-white/40">
                      <GoldFilled className="size-4" />
                    </div>
                    <Select value={selectedKarat} onValueChange={setSelectedKarat}>
                      <SelectTrigger className="h-8 w-30 border-none bg-white/40 text-sm font-medium">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="14">14K Altın</SelectItem>
                        <SelectItem value="18">18K Altın</SelectItem>
                        <SelectItem value="22">22K Altın</SelectItem>
                        <SelectItem value="24">24K Altın</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-3 rounded-full bg-white/40">
                    <ArrowExpand01Sharp className="size-3" />
                  </div>
                </div>
                <div className="flex-1 px-2">
                  <div className="min-h-20 flex items-end">
                    <h3 className="text-2xl font-bold mt-2">{getKaratPrice()}</h3>
                  </div>
                  <p className="text-xs mt-2 flex items-center gap-1 text-black">
                    {selectedKarat} Karat
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </MyCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3  ">
        {/* <MyCard title="Hızlı Fiyat Hesaplayıcı" Icon={Calculator01Filled} className="">
          <PriceCalculatorForm />
        </MyCard> */}

        {/* <MyCard title="Son Aktiviteler" Icon={TimeQuarterPassFilled}>
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
        </MyCard> */}

      </div>
    </div>
  )
}
