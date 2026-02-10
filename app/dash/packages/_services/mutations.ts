"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface BuyPackageRequest {
  packageId: number
}

export interface BuyPackageResponse {
  code: string
  message: string
  errors: string[]
}

export const useBuyPackage = () => {
  const queryClient = useQueryClient()

  return useMutation<BuyPackageResponse, Error, BuyPackageRequest>({
    mutationFn: (data: BuyPackageRequest) =>
      FetchData("Membership/BuyPackage", {
        method: "POST",
        secure: true,
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["active-package"] })
      queryClient.invalidateQueries({ queryKey: ["packages"] })
    },
  })
}
