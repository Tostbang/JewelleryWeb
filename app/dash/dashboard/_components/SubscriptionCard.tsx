"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useGetActivePackage } from "../_services/queries"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, X } from "lucide-react"
import { MyButton } from "@/components/buttons/MyButton"
import Link from "next/link"
import { CreditCardNotFound } from "asem-icons"

const chartConfig = {
  remaining: {
    label: "Kalan",
    color: "#6d94cf",
  },
  used: {
    label: "Kullanılan",
    color: "var(--my-orange)",
  },
} satisfies ChartConfig

export function SubscribtionCard() {
  const { data: packageData, isLoading } = useGetActivePackage()

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[200px] w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  // If no active package
  if (!packageData?.packageId) {
    return (
      <div className="flex flex-col items-center justify-center h-[200px] text-center space-y-3">
        <div className="p-4 rounded-full bg-gray-200">
          <CreditCardNotFound className="size-4 " />
        </div>
        <div>
          <p className="font-medium text-gray-900">Aktif Paket Yok</p>
          <p className="text-sm text-muted-foreground">{"Henüz bir paket seçilmedi"}</p>
          <MyButton className="h-11 mt-1" asChild>
            <Link href={"/dash/packages"}>
              Paket Al
            </Link>
          </MyButton>
        </div>
      </div>
    )
  }

  const totalDays = packageData.totalDays || 0
  const remainingDays = packageData.remainingDays || 0
  const usedDays = totalDays - remainingDays

  const chartData = [{
    used: usedDays,
    remaining: remainingDays
  }]

  return (
    <div className="space-y-4">
      <ChartContainer
        config={chartConfig}
        className="mx-auto h-[200px] !w-full !max-w-full"
      >
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={140}
          outerRadius={180}
          cy={170}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 28}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {remainingDays}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground text-base"
                      >
                        Kalan Gün
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="used"
            stackId="a"
            cornerRadius={990}
            fill="var(--color-used)"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="remaining"
            fill="var(--color-remaining)"
            cornerRadius={990}
            stackId="a"
            // cornerRadius={5}
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>

      <div className="space-y-3 px-2">
        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-sm font-medium">Paket Adı</span>
          <span className="text-sm text-muted-foreground">{packageData.name}</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-sm font-medium">Toplam Gün</span>
          <span className="text-sm text-muted-foreground">{totalDays} gün</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-sm font-medium">Kullanılan</span>
          <span className="text-sm text-muted-foreground">{usedDays} gün</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-sm font-medium">Maks. Cihaz</span>
          <span className="text-sm text-muted-foreground">{packageData.maxDeviceCount}</span>
        </div>

        <div className="flex items-center justify-between pb-2 border-b">
          <span className="text-sm font-medium">Mobil Erişim</span>
          <span className="text-sm">
            {packageData.allowMobile ? (
              <Check className="size-4 text-green-500" />
            ) : (
              <X className="size-4 text-red-500" />
            )}
          </span>
        </div>

        <div className="flex items-center justify-between pb-2">
          <span className="text-sm font-medium">İzin Verilen Yarıçap</span>
          <span className="text-sm text-muted-foreground">{packageData.allowedRadiusKm} km</span>
        </div>

        {packageData.endsAt && (
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm font-medium">Bitiş Tarihi</span>
            <span className="text-sm text-muted-foreground">
              {new Date(packageData.endsAt).toLocaleDateString('tr-TR')}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}