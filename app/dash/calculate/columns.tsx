"use client"

import { ColumnDef } from "@tanstack/react-table"
import { HistoryItem } from "../dashboard/_services/queries"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { GoogleDoc } from "asem-icons"
import { tr } from "date-fns/locale"

export const createHistoryColumns = (
  onViewDetails: (item: HistoryItem) => void,
): ColumnDef<HistoryItem>[] => [
    {
      accessorKey: "karat",
      header: "Karat",
      cell: ({ row }) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
          {row.getValue("karat")}K
        </span>
      ),
    },
    {
      accessorKey: "cost",
      header: "Maliyet",
      cell: ({ row }) => (
        <div className="text-sm">₺{(row.getValue("cost") as number).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</div>
      ),
    },
    {
      accessorKey: "gramPrice",
      header: "Gram Fiyatı",
      cell: ({ row }) => (
        <div className="text-sm">₺{(row.getValue("gramPrice") as number).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</div>
      ),
    },
    {
      accessorKey: "laborCost",
      header: "İşçilik",
      cell: ({ row }) => (
        <div className="text-sm">₺{(row.getValue("laborCost") as number).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</div>
      ),
    },
    {
      accessorKey: "totalCost",
      header: "Toplam",
      cell: ({ row }) => (
        <div className="text-sm font-semibold">₺{(row.getValue("totalCost") as number).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</div>
      ),
    },
    {
      accessorKey: "createdDate",
      header: "Tarih",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground flex">
          {format(new Date(row.getValue("createdDate")), "dd MMM yyyy", { locale: tr })}
        </div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(item)}>
                <GoogleDoc className="mr-1 h-4 w-4" />
                Detayları Gör
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
