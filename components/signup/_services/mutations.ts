"use client"

import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { updateToken } from "@/lib/helpers"

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  lat: number
  lng: number
}

export interface RegisterResponse {
  code: string
  message: string
  errors: string[]
}

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) =>
      FetchData("Auth/Register", {
        method: "POST",
        secure: false,
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          lat: data.lat,
          lng: data.lng,
        },
      }),
  })
}
