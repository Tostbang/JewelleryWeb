"use client"

import { useMutation, useQuery } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { DurationType } from "@/lib/types"

export interface Package {
  packageId: number
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  price: number
  durationValue: number
  durationType: DurationType
}

export interface PackagesResponse {
  packages: Package[]
  code: string
  message: string
  errors: string[]
}

export interface ActivePackageResponse {
  code: string
  message: string
  errors: string[]
  packageId: number
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  totalDays: number
  remainingDays: number
  endsAt: string
}

export type CheckoutInitializeRequest = {
  packageId: number;
  callbackUrl: string;
}

export type CheckoutInitializeResponse = {
  code: string;
  message: string;
  errors: string[];
  token: string;
  conversationId: string;
  checkoutFormContent: string;
}

export const useGetAllPackages = () => {
  return useQuery<PackagesResponse>({
    queryKey: ["packages"],
    queryFn: () => FetchData("Membership/GetAllPackages", { secure: true }),
  })
}

export const useGetActivePackage = () => {
  return useQuery<ActivePackageResponse>({
    queryKey: ["active-package"],
    queryFn: () => FetchData("Membership/GetActivePackage", { secure: true }),
  })
}

export async function initializeCheckout(request: CheckoutInitializeRequest): Promise<CheckoutInitializeResponse> {
  return await FetchData("Payment/start-package-payment", {
    method: "POST",
    secure: true,
    body: request,
  });
}

export function useInitializeCheckout() {
  return useMutation({
    mutationFn: (request: CheckoutInitializeRequest) => initializeCheckout(request),
  });
}