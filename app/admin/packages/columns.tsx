"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AdminPackage } from "./_services/queries"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ToggleOn } from "asem-icons"

export const createColumns = (
  onEdit: (pkg: AdminPackage) => void,
  onDelete: (packageId: number) => void
): ColumnDef<AdminPackage>[] => [
    {
      accessorKey: "name",
      header: "Paket Adı",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("name")}</div>
      },
    },
    {
      accessorKey: "price",
      header: "Fiyat",
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"))
        const formatted = new Intl.NumberFormat("tr-TR", {
          style: "currency",
          currency: "TRY",
        }).format(price)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "maxDeviceCount",
      header: "Maks. Cihaz",
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("maxDeviceCount")}</div>
      },
    },
    {
      accessorKey: "allowMobile",
      header: "Mobil Erişim",
      cell: ({ row }) => {
        const allowMobile = row.getValue("allowMobile") as boolean
        return (
          <Badge variant={allowMobile ? "default" : "secondary"}>
            {allowMobile ? "Evet" : "Hayır"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "allowedRadiusKm",
      header: "Yarıçap (km)",
      cell: ({ row }) => {
        return <div className="text-center">{row.getValue("allowedRadiusKm")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Durum",
      cell: ({ row }) => {
        const status = row.getValue("status") as boolean
        return (
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Aktif" : "Pasif"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdDate",
      header: "Oluşturma Tarihi",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {format(new Date(row.getValue("createdDate")), "dd MMM yyyy")}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const pkg = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Menüyü aç</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(pkg)}>
                <Pencil className="h-4 w-4" />
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(pkg.packageId)}
              >
                <ToggleOn className="h-4 w-4" />
                Devre Dışı Bırak
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
