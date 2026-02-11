"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { useProfileStore } from "@/lib/store/profile-store"

export interface UpdateProfileRequest {
  // userId: number
  firstName: string
  lastName: string
  email: string
  // registerLat: number
  // registerLng: number
}

export interface UpdateProfileResponse {
  code: string
  message: string
  errors: string[]
  userId: number
}

export interface ResetPasswordRequest {
  email: string
  resetCode: string
  newPassword: string
}

export interface ResetPasswordResponse {
  code: string
  message: string
  errors: string[]
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const setProfile = useProfileStore((state) => state.setProfile)

  return useMutation<UpdateProfileResponse, Error, UpdateProfileRequest>({
    mutationFn: (data: UpdateProfileRequest) =>
      FetchData("Auth/UpdateMyProfile", {
        method: "PUT",
        secure: true,
        body: data,
      }),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["Profile"] })
      // Update the profile store with new data
      setProfile({
        email: variables.email,
        firstName: variables.firstName,
        lastName: variables.lastName,
        registerLat: variables.registerLat,
        registerLng: variables.registerLng,
        roleId: useProfileStore.getState().profile?.roleId || 0,
        isApproved: useProfileStore.getState().profile?.isApproved || false,
      })
    },
  })
}

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: (data: ResetPasswordRequest) =>
      FetchData("Auth/ResetPassword", {
        method: "POST",
        secure: true,
        body: data,
      }),
  })
}
