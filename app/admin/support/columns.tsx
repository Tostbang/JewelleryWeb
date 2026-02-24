"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Ticket } from "./_services/queries"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const truncateText = (text: string, maxLength: number = 50) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

export const createColumns = (
  onViewDetails: (ticket: Ticket) => void
): ColumnDef<Ticket>[] => [
    {
      accessorKey: "ticketId",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">#{row.getValue("ticketId")}</div>,
    },
    {
      accessorKey: "fullName",
      header: "Ad Soyad",
      cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
    },
    {
      accessorKey: "email",
      header: "E-posta",
      cell: ({ row }) => <div className="text-sm">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "title",
      header: "Konu",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "description",
      header: "Açıklama",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground max-w-xs">
          {truncateText(row.getValue("description"), 50)}
        </div>
      ),
    },
    // {
    //   accessorKey: "isClosed",
    //   header: "Durum",
    //   cell: ({ row }) => {
    //     const isClosed = row.getValue("isClosed") as boolean
    //     return (
    //       <Badge variant={isClosed ? "secondary" : "default"}>
    //         {isClosed ? "Kapalı" : "Açık"}
    //       </Badge>
    //     )
    //   },
    // },
    // {
    //   accessorKey: "status",
    //   header: "Aktiflik",
    //   cell: ({ row }) => {
    //     const status = row.getValue("status") as boolean
    //     return (
    //       <Badge variant={status ? "default" : "destructive"}>
    //         {status ? "Aktif" : "Pasif"}
    //       </Badge>
    //     )
    //   },
    // },
    {
      accessorKey: "createdDate",
      header: "Oluşturma Tarihi",
      cell: ({ row }) => {
        return (
          <div className="text-sm">
            {format(new Date(row.getValue("createdDate")), "dd MMM yyyy HH:mm")}
          </div>
        )
      },
    },
    {
      id: "actions",
      header: "İşlemler",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetails(row.original)}
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ]
