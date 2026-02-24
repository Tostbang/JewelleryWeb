"use client"

import { Area, AreaChart, CartesianGrid, Line, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Calendar01 } from "asem-icons"

const chartConfig = {
  priceGramTry: {
    label: "Altın Fiyatı",
    color: "var(--my-orange)",
  },
} satisfies ChartConfig

interface ChartDataItem {
  date: string
  priceGramTry: number
}

interface GoldPriceChartProps {
  data: ChartDataItem[]
}

export function GoldPriceChart({ data }: GoldPriceChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center text-muted-foreground">
        Veri yükleniyor...
      </div>
    )
  }

  const prices = data.map(d => d.priceGramTry)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const padding = 100

  return (
    <ChartContainer key={data.length} config={chartConfig} className="h-[200px] w-full">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 20, right: 12 }}
      >
        <CartesianGrid vertical={false} stroke="rgba(100,100,100,0.10)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => format(new Date(value), "dd MMM", { locale: tr })}
        />

        <YAxis
          domain={[min - padding, max + padding]}
          tickLine={false}
          axisLine={false}
          hide
        />

        <ChartTooltip
          cursor={false}
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null

            const data = payload[0].payload
            const formattedDate = format(new Date(data.date), "dd MMM", { locale: tr })
            const formattedPrice = `₺${data.priceGramTry.toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}`

            return (
              <div className="rounded-md flex gap-x-1 shadow-md border bg-background p-2 ">
                <div className="h-8 w-2 bg-[var(--my-orange)] rounded-sm" />
                <div className="grid gap-2">
                  <div className="flex flex-col">
                    <div className="flex gap-x-1">
                      <Calendar01 className="text-gray-500 size-4" />
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {formattedDate}
                      </span>
                    </div>
                    <span className="font-bold text-foreground">
                      {formattedPrice}
                    </span>
                  </div>
                </div>
              </div>
            )
          }}
        />
        {/* <Line
          dataKey="priceGramTry"
          type="natural"
          stroke="var(--color-my-blue)"
          strokeWidth={2}
          dot={false}
        /> */}
        <Area
          dataKey="priceGramTry"
          type="natural"
          fill="var(--color-priceGramTry)"
          fillOpacity={0.6}
          stroke="var(--color-priceGramTry)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
