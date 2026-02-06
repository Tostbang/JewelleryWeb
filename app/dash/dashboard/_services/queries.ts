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
  createdDate: string
}

export interface HistoryResponse {
  items: HistoryItem[]
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
