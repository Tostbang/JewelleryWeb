"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface CreatePackageRequest {
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  price: number
}

export interface UpdatePackageRequest {
  packageId: number
  name: string
  maxDeviceCount: number
  allowMobile: boolean
  allowedRadiusKm: number
  price: number
  status: boolean
}

export interface PackageMutationResponse {
  code: string
  message: string
  errors: string[]
  packageId: number
}

export const useCreatePackage = () => {
  const queryClient = useQueryClient()

  return useMutation<PackageMutationResponse, Error, CreatePackageRequest>({
    mutationFn: (data: CreatePackageRequest) =>
      FetchData("Admin/CreatePackage", {
        method: "POST",
        secure: true,
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] })
    },
  })
}

export const useUpdatePackage = () => {
  const queryClient = useQueryClient()

  return useMutation<PackageMutationResponse, Error, UpdatePackageRequest>({
    mutationFn: (data: UpdatePackageRequest) =>
      FetchData("Admin/UpdatePackage", {
        method: "PUT",
        secure: true,
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] })
    },
  })
}

export const useDeletePackage = () => {
  const queryClient = useQueryClient()

  return useMutation<PackageMutationResponse, Error, number>({
    mutationFn: (packageId: number) =>
      FetchData(`Admin/Packages/${packageId}`, {
        method: "DELETE",
        secure: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-packages"] })
    },
  })
}
