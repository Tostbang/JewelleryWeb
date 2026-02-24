"use client"

import { useQuery } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"

export interface Ticket {
  ticketId: number
  userId: number
  fullName: string
  email: string
  title: string
  description: string
  isClosed: boolean
  status: boolean
  createdDate: string
}

export interface TicketsResponse {
  code: string
  message: string
  errors: string[]
  tickets: Ticket[]
  page: number
  pageSize: number
  totalCount: number
  totalPages: number
}

export interface TicketDetail {
  code: string
  message: string
  errors: string[]
  ticketId: number
  userId: number
  firstName: string
  lastName: string
  email: string
  title: string
  description: string
  isClosed: boolean
  closedAt: string | null
  status: boolean
  createdDate: string
  modifiedDate: string | null
  deletedDate: string | null
}

export interface TicketsSearchRequest {
  page?: number
  pageSize?: number
}

export const useGetTickets = (searchParams?: TicketsSearchRequest) => {
  return useQuery<TicketsResponse>({
    queryKey: ["admin-tickets", searchParams],
    queryFn: () =>
      FetchData("Admin/Tickets/Search", {
        method: "POST",
        secure: true,
        body: searchParams || {},
      }),
  })
}

export const useGetTicketDetail = (ticketId: number, enabled: boolean = true) => {
  return useQuery<TicketDetail>({
    queryKey: ["admin-ticket-detail", ticketId],
    queryFn: () => FetchData(`Admin/Tickets/${ticketId}`, { secure: true }),
    enabled,
  })
}
