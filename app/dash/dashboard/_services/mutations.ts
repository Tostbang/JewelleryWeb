"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { toNumberSafe } from "@/lib/helpers"

export interface LaborCostRequest {
  karat: string
  cost: string
}

export interface LaborCostResponse {
  laborCost: number
  totalCost: number
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
