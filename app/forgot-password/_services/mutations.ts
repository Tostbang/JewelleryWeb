"use client"

import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  code: string
  message: string
  errors: string[]
}

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordRequest>({
    mutationFn: (data: ForgotPasswordRequest) =>
      FetchData("Auth/ForgotPassword", {
        method: "POST",
        secure: false,
        body: { email: data.email },
      }),
  })
}
