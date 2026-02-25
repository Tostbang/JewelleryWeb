"use client"

import { useQuery } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

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
