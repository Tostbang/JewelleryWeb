"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { toNumberSafe } from "@/lib/helpers"

export interface LaborCostRequest {
  karat: number | string
  cost: string
}

export interface LaborCostResponse {
  laborCost: number
  totalCost: number
  gram: number
  code: string
  message: string
  errors: string[]
}

export const useCalculateLaborCost = () => {
  const queryClient = useQueryClient()

  return useMutation<LaborCostResponse, Error, LaborCostRequest>({
    mutationFn: (data: LaborCostRequest) =>
      FetchData("Trade/LaborCost", {
        method: "POST",
        secure: true,
        body: {
          karat: toNumberSafe(data.karat),
          cost: toNumberSafe(data.cost)
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trade-history"] })
    },
  })
}

export interface CompareKaratsRequest {
  karat1: number
  karat2: number
  gram: number
}

export interface CompareKaratsResponse {
  karat1: number
  karat2: number
  gram: number
  purityPercent1: number
  purityPercent2: number
  pureGoldGram1: number
  pureGoldGram2: number
  gramPriceTl1: number
  gramPriceTl2: number
  totalPriceTl1: number
  totalPriceTl2: number
  totalPriceDiffTl: number
  code: string
  message: string
  errors: string[]
}

export const useCompareKarats = () => {
  return useMutation<CompareKaratsResponse, Error, CompareKaratsRequest>({
    mutationFn: (data) =>
      FetchData("Trade/compare-karats", {
        method: "POST",
        secure: true,
        body: data,
      }),
  })
}

export interface ConvertWeightRequest {
  value: number
  fromUnit: number
  toUnit: number
}

export interface ConvertWeightResponse {
  inputValue: number
  fromUnit: number
  toUnit: number
  resultValue: number
  code: string
  message: string
  errors: string[]
}

export const useConvertWeight = () => {
  return useMutation<ConvertWeightResponse, Error, ConvertWeightRequest>({
    mutationFn: (data) =>
      FetchData("Trade/ConvertWeight", {
        method: "POST",
        secure: true,
        body: data,
      }),
  })
}

export interface UpdateManualGoldPriceRequest {
  gramBuyTl: number
  gramSellTl: number
  ceyrekAltin: number
  yarimAltin: number
  tamAltin: number
  karatPrices: {
    gram14kTl: number
    gram18kTl: number
    gram22kTl: number
    gram24kTl: number
  }
}

export interface UpdateManualGoldPriceResponse {
  code: string
  message: string
  errors: string[]
  priceId: number
  createdDate: string
  modifiedDate: string
  gramBuyTl: number
  gramSellTl: number
  ceyrekAltin: number
  yarimAltin: number
  tamAltin: number
  karatPrices: {
    gram14kTl: number
    gram18kTl: number
    gram22kTl: number
    gram24kTl: number
  }
}

export const useUpdateManualGoldPrice = () => {
  const queryClient = useQueryClient()

  return useMutation<UpdateManualGoldPriceResponse, Error, UpdateManualGoldPriceRequest>({
    mutationFn: (data) =>
      FetchData("ManualGoldPrice/Set", {
        method: "POST",
        secure: true,
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manual-gold-prices"] })
    },
  })
}

export interface ManualLaborCostRequest {
  karat: number | string
  cost: string
}

export const useCalculateManualLaborCost = () => {
  const queryClient = useQueryClient()

  return useMutation<LaborCostResponse, Error, ManualLaborCostRequest>({
    mutationFn: (data: ManualLaborCostRequest) =>
      FetchData("ManualGoldPrice/ManualLaborCost", {
        method: "POST",
        secure: true,
        body: {
          karat: toNumberSafe(data.karat),
          cost: toNumberSafe(data.cost),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manual-history"] })
    },
  })
}
