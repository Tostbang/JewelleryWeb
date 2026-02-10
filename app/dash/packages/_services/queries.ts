"use client"

import { useQuery } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface Package {
  packageId: number
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  price: number
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
