"use client"

import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface LaborCostRequest {
  karat: number
  cost: number
}

export interface LaborCostResponse {
  laborCost: number
  totalCost: number
  code: string
  message: string
  errors: string[]
}

export const useCalculateLaborCost = () => {
  return useMutation<LaborCostResponse, Error, LaborCostRequest>({
    mutationFn: (data: LaborCostRequest) =>
      FetchData("Trade/LaborCost", {
        method: "POST",
        secure: true,
        body: data,
      }),
  })
}
