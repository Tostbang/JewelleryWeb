"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface BuyPackageRequest {
  packageId: number
}

export interface BuyPackageResponse {
  code: string
  message: string
  errors: string[]
}

// export const useBuyPackage = () => {
//   const queryClient = useQueryClient()

//   return useMutation<BuyPackageResponse, Error, BuyPackageRequest>({
//     mutationFn: (data: BuyPackageRequest) =>
//       FetchData("Membership/BuyPackage", {
//         method: "POST",
//         secure: true,
//         body: data,
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["active-package"] })
//       queryClient.invalidateQueries({ queryKey: ["packages"] })
//     },
//   })
// }

export async function returnCheckout(token: string): Promise<CheckoutReturnResponse> {
  return await FetchData("Payment/iyzico-callback", {
    method: "POST",
    secure: true,
    body: { token },
  });
}

export function useReturnCheckout(token: string | undefined) {
  return useQuery({
    queryKey: ["return"],
    queryFn: () => returnCheckout(token as string),
    enabled: !!token
  });
}