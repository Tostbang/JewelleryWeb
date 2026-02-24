"use client"

import { useQuery } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { DurationType } from "@/lib/types"

export interface AdminPackage {
  packageId: number
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  price: number
  status: boolean
  durationValue: number
  durationType: DurationType
  createdDate: string
  modifiedDate: string | null
  deleteDate: string | null
}

export interface AdminPackagesResponse {
  packages: AdminPackage[]
  code: string
  message: string
  errors: string[]
}

export interface PackageUser {
  userId: number
  fullName: string
  email: string
  isActiveMembership: boolean
}

export interface PackageDetail {
  packageId: number
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  price: number
  status: boolean
  durationValue: number
  durationType: DurationType
  createdDate: string
  modifiedDate: string | null
  deletedDate: string | null
  activeUserCount: number
  passiveUserCount: number
  users: PackageUser[]
}

export interface PackageDetailResponse {
  code: string
  message: string
  errors: string[]
  package: PackageDetail
}

export const useGetAdminPackages = () => {
  return useQuery<AdminPackagesResponse>({
    queryKey: ["admin-packages"],
    queryFn: () => FetchData("Admin/Packages", { secure: true }),
  })
}

export const useGetPackageDetail = (packageId: number, enabled: boolean = true) => {
  return useQuery<PackageDetailResponse>({
    queryKey: ["admin-package-detail", packageId],
    queryFn: () => FetchData(`Admin/Packages/${packageId}`, { secure: true }),
    enabled,
  })
}
