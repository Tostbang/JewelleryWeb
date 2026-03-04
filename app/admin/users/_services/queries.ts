"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface AdminUser {
  userId: number
  firstName: string
  lastName: string
  email: string
  roleId: number
  status: boolean
  isApproved: boolean
  createdDate: string
  modifiedDate: string | null
  deletedDate: string | null
}

export interface AdminUsersResponse {
  code: string
  message: string
  errors: string[]
  users: AdminUser[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface UserDetail {
  userId: number
  firstName: string
  lastName: string
  email: string
  roleId: number
  status: boolean
  isApproved: boolean
  registerLat: number
  registerLng: number
  createdDate: string
  modifiedDate: string | null
  deletedDate: string | null
}

export interface UserDetailResponse {
  code: string
  message: string
  errors: string[]
  user: UserDetail
}

export interface UsersSearchRequest {
  status?: boolean
  page?: number
  pageSize?: number
}

export const useGetAdminUsers = (searchParams?: UsersSearchRequest) => {
  return useQuery<AdminUsersResponse>({
    queryKey: ["admin-users", searchParams],
    queryFn: () => FetchData("Admin/Users/Search", {
      method: "POST",
      secure: true,
      body: searchParams || {}
    }),
  })
}

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: number) =>
      FetchData(`Admin/Users/${userId}`, { method: "DELETE", secure: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    },
  })
}
