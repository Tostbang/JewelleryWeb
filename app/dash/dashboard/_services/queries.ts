"use client"

import { useQuery } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface HistoryItem {
  historyId: number
  karat: number
  cost: number
  gramPrice: number
  laborCost: number
  totalCost: number
  gram?: number
  createdDate: string
}

export interface HistoryResponse {
  items: HistoryItem[]
  code: string
  message: string
  errors: string[]
}

export interface LiveBuySellResponse {
  gramBuyTl: number
  gramSellTl: number
  ceyrekAltin: number
  yarimAltin: number
  tamAltin: number
  hasAltin: number
  karatPrices: {
    gram14kTl: number
    gram18kTl: number
    gram22kTl: number
    gram24kTl: number
  }
  timestamp: number
  code: string
  message: string
  errors: string[]
}

export interface HistoryParams {
  karat?: number
  startDate?: string
  endDate?: string
}

export const useGetHistory = (params?: HistoryParams) => {
  return useQuery<HistoryResponse>({
    queryKey: ["trade-history", params],
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (params?.karat) searchParams.set("karat", String(params.karat))
      if (params?.startDate) searchParams.set("startDate", params.startDate)
      if (params?.endDate) searchParams.set("endDate", params.endDate)
      const qs = searchParams.toString()
      return FetchData(`Trade/MyHistory${qs ? `?${qs}` : ""}`, { secure: true })
    },
  })
}

export const useGetLiveBuySell = () => {
  return useQuery<LiveBuySellResponse>({
    queryKey: ["live-buy-sell"],
    queryFn: () => FetchData("Trade/LiveBuySell", { secure: true }),
    refetchInterval: 60000, // Refetch every 60 seconds
  })
}

export interface ActivePackageResponse {
  packageId: number | null
  name: string | null
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  totalDays: number | null
  remainingDays: number | null
  endsAt: string | null
  code: string
  message: string
  errors: string[]
}

export const useGetActivePackage = () => {
  return useQuery<ActivePackageResponse>({
    queryKey: ["active-package"],
    queryFn: () => FetchData("Membership/GetActivePackage", { secure: true }),
  })
}

export interface ChartDataItem {
  date: string
  priceGramTry: number
}

export interface ChartDataResponse {
  items: ChartDataItem[]
  code: string
  message: string
  errors: string[]
}

export const useGetChartData = (period: "5" | "30") => {
  return useQuery<ChartDataResponse>({
    queryKey: ["chart-data", period],
    queryFn: () => FetchData(`Trade/Last${period}Days`, { secure: true }),
  })
}

export interface ManualGoldKaratPrices {
  gram14kTl: number
  gram18kTl: number
  gram22kTl: number
  gram24kTl: number
}

export interface ManualGoldPriceItem {
  priceId: number
  createdDate: string
  modifiedDate: string
  gramBuyTl: number
  gramSellTl: number
  ceyrekAltin: number
  yarimAltin: number
  tamAltin: number
  karatPrices: ManualGoldKaratPrices
}

export interface ManualGoldPriceResponse {
  code: string
  message: string
  errors: string[]
  items: ManualGoldPriceItem[]
}

export const useGetManualGoldPrices = () => {
  return useQuery<ManualGoldPriceResponse>({
    queryKey: ["manual-gold-prices"],
    queryFn: () => FetchData("ManualGoldPrice/My", { method: "POST", body: {}, secure: true }),
  })
}