"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { Profile, useProfileStore } from "@/lib/store/profile-store"
import { deleteToken } from "@/lib/helpers"
import { Role } from "@/lib/types"

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
  currentPassword: string,
  newPassword: string,
  newPasswordConfirm: string
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
        // registerLat: variables.registerLat,
        // registerLng: variables.registerLng,
        roleId: useProfileStore.getState().profile?.roleId ?? Role.User,
        isApproved: useProfileStore.getState().profile?.isApproved || false,
      } as Profile)
    },
  })
}

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: (data: ResetPasswordRequest) =>
      FetchData("Auth/ChangeMyPassword", {
        method: "POST",
        secure: true,
        body: data,
      }),
  })
}


export const useDeleteAccount = () => {
  return useMutation<ResetPasswordResponse, Error>({
    mutationFn: () =>
      FetchData("Auth/DeleteMyAccount", {
        method: "DELETE",
        secure: true,
      }),
    onSuccess: () => {
      deleteToken()
      if (window) {
        window.location.href = "/login"
      }
    }
  })
}
