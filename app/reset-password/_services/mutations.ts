"use client"

import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

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

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: (data: ResetPasswordRequest) =>
      FetchData("Auth/ResetPassword", {
        method: "POST",
        secure: false,
        body: {
          email: data.email,
          resetCode: data.resetCode,
          newPassword: data.newPassword,
        },
      }),
  })
}
