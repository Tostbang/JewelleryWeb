"use client"

import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { updateToken } from "@/lib/helpers"
import { toast } from "sonner"
import { Role } from "@/lib/types"

export interface LoginRequest {
  email: string
  password: string
  lat: number
  lng: number
}

export interface LoginResponse {
  code: string
  message: string
  errors: string[]
  userId: number
  email: string
  roleId: number
  sessionToken: string
  token: string
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) =>
      FetchData("Auth/Login", {
        method: "POST",
        secure: false,
        body: {
          email: data.email,
          password: data.password,
          lat: data.lat,
          lng: data.lng,
        },
      }),
    onSuccess: (data) => {
      // Save token to cookie
      if (data.token) {
        updateToken(data.token)
      }
      toast.success("Giris basarili!")

      // Redirect to dashboard
      if (data.roleId === Role.Admin) {
        window.location.href = "/admin/dashboard"
      } else if (data.roleId === Role.User) {
        window.location.href = "/dash/dashboard"
      }
    },
  })
}
