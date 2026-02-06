"use client"

import { Bar, BarChart, Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { AlignBoxBottomCenter, User02, TradeMark, UserLock01, Bitcoin, BitcoinCircle, BitcoinFilled, BitcoinSquare, BitcoinSquareFilled, Chart, Coins01Filled, Gem, GemFilled, Package, PackageAdd, ShoppingCart01, TruckReturn, TruckReturnFilled, UserAccount, PackageFilled, Desk, Desk01, Desk02Filled, Football, Basketball02Filled, PackageReceiveFilled, UserMultipleFilled, AnalyticsUpFilled, Analytics01Filled, ArrowExpand01Sharp, BorderFullFilled, Calculator01Filled, IrisScanFilled, Sparkles, TimeQuarterPassFilled } from "asem-icons"
import { UserMinus } from "lucide-react"
import { cn } from "@/lib/utils"
import MyCard from "@/components/MyCard"
import PriceCalculatorForm from "./components/PriceCalculatorForm"
import { useGetHistory } from "./_services/queries"
import { formatDistanceToNow } from "date-fns"
import { ScrollArea } from "@/components/ui/scroll-area"

const statsCards = [
  {
    title: "Today's Sales",
    value: "₹1,24,500",
    change: "+12.5%",
    trend: "up",
    icon: Coins01Filled,
    bgColor: "bg-my-orange",
    iconColor: "fill-blue-600",
  },
  {
    title: "Gold Rate (24K)",
    value: "₹6,450/g",
    change: "+0.8%",
    trend: "up",
    icon: AnalyticsUpFilled,
    bgColor: "bg-my-blue",
    iconColor: "text-yellow-600",
  },
  {
    title: "Total Inventory",
    value: "₹45.2L",
    change: "1,234 items",
    trend: "neutral",
    icon: PackageReceiveFilled,
    bgColor: "bg-my-lavender",
    iconColor: "text-purple-600",
  },
  {
    title: "Active Customers",
    value: "847",
    change: "+23 today",
    trend: "up",
    icon: UserMultipleFilled,
    bgColor: "bg-my-pink",
    iconColor: "text-green-500",
  },
  {
    title: "Pending Orders",
    value: "32",
    change: "5 urgent",
    trend: "neutral",
    icon: PackageReceiveFilled,
    bgColor: "bg-my-orange2",
    iconColor: "text-orange-600",
  },
  {
    title: "Silver Rate",
    value: "₹82.5/g",
    change: "-0.3%",
    trend: "down",
    icon: IrisScanFilled,
    bgColor: "bg-my-lavender2",
    iconColor: "text-gray-600",
  },
]

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
  const { data: historyData, isLoading } = useGetHistory()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className=''>
          </div>
          <h1 className="text-3xl font-bold">Jewellery Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your business metrics</p>
        </div>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <MyCard title="Bussiness Summary" Icon={BorderFullFilled} >
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
                      {card.trend === 'up' && '↑'}
                      {card.trend === 'down' && '↓'}
                      {card.change}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </MyCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <MyCard title="Quick Price Calculator" Icon={Calculator01Filled}>
          <PriceCalculatorForm />
        </MyCard>

        <MyCard title="Recent Activity" Icon={TimeQuarterPassFilled}>
          <ScrollArea className="space-y-3 h-50 pr-3">
            {isLoading ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Loading history...
              </div>
            ) : historyData && historyData.items && historyData.items.length > 0 ? (
              historyData.items.slice(0, 5).map((history) => (
                <div key={history.historyId} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium">{history.karat}K Calculation</p>
                    <p className="text-xs text-muted-foreground">
                      Cost: ₹{history.cost.toLocaleString()} • Labor: ₹{history.laborCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">₹{history.totalCost.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(history.createdDate), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No history available
              </div>
            )}
          </ScrollArea>
        </MyCard>

      </div>
    </div>
  )
}
