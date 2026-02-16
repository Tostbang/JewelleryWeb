"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { format } from "date-fns"

export const description = "A simple area chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const items = [
  {
    date: "2026-02-12T00:00:00",
    priceGramTry: 7084.85
  },
  {
    date: "2026-02-13T00:00:00",
    priceGramTry: 6964.25
  },
  {
    date: "2026-02-14T00:00:00",
    priceGramTry: 7079.6456
  },
  {
    date: "2026-02-15T00:00:00",
    priceGramTry: 7079.7991
  },
  {
    date: "2026-02-16T00:00:00",
    priceGramTry: 7055.9318
  }
]

const chartConfig = {
  desktop: {
    label: "Altın",
    color: "var(--my-lavender)",
  },
} satisfies ChartConfig

export function GoldPriceChart() {
  const prices = items.map(d => d.priceGramTry)

  const min = Math.min(...prices)
  const max = Math.max(...prices)

  const padding = 100

  return (
    <>
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <AreaChart
          accessibilityLayer
          data={items}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => format(new Date(value), "dd MMM")}
          />

          <YAxis
            domain={[min - padding, max + padding]}
            tickLine={false}
            axisLine={false}
            hide
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          <Area
            dataKey="priceGramTry"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.7}
            stroke="var(--color-desktop)"
          />
        </AreaChart>
      </ChartContainer>
      {/* <div className="flex w-full items-start gap-2 text-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            January - June 2024
          </div>
        </div>
      </div> */}
    </>

  )
}
