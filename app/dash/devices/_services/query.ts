"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

interface Session {
  sessionId: number
  platform: "WEB" | "MOBILE"
  isActive: boolean
  expireAt: string
  createdDate: string
  ipAddress: string
  userAgent: string
}

interface SessionsResponse {
  sessions: Session[]
}

interface LogoutSessionRequest {
  sessionId: number
}

interface LogoutSessionResponse {
  code: string
  message: string
  errors: string[]
  sessionId: number
}

export const useGetSessions = () => {
  return useQuery<SessionsResponse>({
    queryKey: ["sessions"],
    queryFn: () => FetchData("Auth/MySessions", { secure: true }),
  })
}

export const useLogoutSession = () => {
  const queryClient = useQueryClient()

  return useMutation<LogoutSessionResponse, Error, LogoutSessionRequest>({
    mutationFn: (data: LogoutSessionRequest) =>
      FetchData("Auth/LogoutSession", {
        method: "POST",
        secure: true,
        body: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] })
    },
  })
}
