"use client"

import { DollarSign, TrendingUp, Package, Users, ShoppingCart } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { IconAlignBoxBottomCenterFilled, IconCoinFilled, IconShoppingCartFilled } from "@tabler/icons-react"
import Gem from '@/icons/Solid/Game & Sports/Gem'

const statsCards = [
  {
    title: "Today's Sales",
    value: "₹1,24,500",
    change: "+12.5%",
    trend: "up",
    icon: IconCoinFilled,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Gold Rate (24K)",
    value: "₹6,450/g",
    change: "+0.8%",
    trend: "up",
    icon: IconAlignBoxBottomCenterFilled,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    title: "Total Inventory",
    value: "₹45.2L",
    change: "1,234 items",
    trend: "neutral",
    icon: Package,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Active Customers",
    value: "847",
    change: "+23 today",
    trend: "up",
    icon: Users,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Pending Orders",
    value: "32",
    change: "5 urgent",
    trend: "neutral",
    icon: IconShoppingCartFilled,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    title: "Silver Rate",
    value: "₹82.5/g",
    change: "-0.3%",
    trend: "down",
    icon: Gem,
    bgColor: "bg-gray-50",
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
                  <p className={`text-xs mt-2 flex items-center gap-1 ${card.trend === 'up' ? 'text-green-600' :
                    card.trend === 'down' ? 'text-red-600' :
                      'text-muted-foreground'
                    }`}>
                    {card.trend === 'up' && '↑'}
                    {card.trend === 'down' && '↓'}
                    {card.change}
                  </p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${card.iconColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Price Calculator</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Weight (grams)</label>
                <input type="number" placeholder="10" className="w-full mt-1 px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Purity</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md">
                  <option>24K</option>
                  <option>22K</option>
                  <option>18K</option>
                  <option>14K</option>
                </select>
              </div>
            </div>
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:opacity-90">
              Calculate Price
            </button>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { action: "New sale", item: "Gold necklace", amount: "₹45,000", time: "5 min ago" },
              { action: "Repair completed", item: "Silver ring", amount: "₹1,200", time: "23 min ago" },
              { action: "Custom order", item: "Diamond earrings", amount: "₹125,000", time: "1 hr ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.item}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{activity.amount}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
