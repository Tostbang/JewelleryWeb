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

export const useGetHistory = () => {
  return useQuery<HistoryResponse>({
    queryKey: ["trade-history"],
    queryFn: () => FetchData("Trade/MyHistory", { secure: true }),
  })
}

export const useGetLiveBuySell = () => {
  return useQuery<LiveBuySellResponse>({
    queryKey: ["live-buy-sell"],
    queryFn: () => FetchData("Trade/LiveBuySell", { secure: true }),
    refetchInterval: 60000, // Refetch every 60 seconds
  })
}
