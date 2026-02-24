"use client"

import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface ConfirmEmailRequest {
  email: string
  pin: string
}

export interface ConfirmEmailResponse {
  code: string
  message: string
  errors: string[]
}

export const useConfirmEmail = () => {
  return useMutation<ConfirmEmailResponse, Error, ConfirmEmailRequest>({
    mutationFn: (data: ConfirmEmailRequest) =>
      FetchData("Auth/VerifyEmail", {
        method: "POST",
        secure: false,
        body: {
          email: data.email,
          code: data.pin,
        },
      }),
  })
}

export interface ResendVerificationCodeRequest {
  email: string
}

export interface ResendVerificationCodeResponse {
  code: string
  message: string
  errors: string[]
  remainingSeconds: number
}

export const useResendVerificationCode = () => {
  return useMutation<ResendVerificationCodeResponse, Error, ResendVerificationCodeRequest>({
    mutationFn: (data: ResendVerificationCodeRequest) =>
      FetchData("Auth/ResendVerificationCode", {
        method: "POST",
        secure: false,
        body: { email: data.email },
      }),
  })
}
