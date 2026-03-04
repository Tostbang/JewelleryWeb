"use client"

import { useState } from "react"
import { useGetAdminUsers, AdminUser, useDeleteAdminUser } from "./_services/queries"
import { DataTable } from "@/components/data-table"
import { createColumns } from "./columns"
import { Filter } from "lucide-react"
import MyCard from "@/components/MyCard"
import { User02Filled } from "asem-icons"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/lib/useGlobalStore"
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"

function UsersTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export default function AdminUsersPage() {
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data: usersData, isLoading } = useGetAdminUsers({
    ...(statusFilter !== undefined && { status: statusFilter }),
    page: currentPage,
    pageSize: pageSize,
  })
  const { mutate: deleteUser } = useDeleteAdminUser()
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const handleViewDetails = (user: AdminUser) => {
    setSelectedUser(user)
    setIsDetailsDialogOpen(true)
  }

  const handleDeleteUser = (user: AdminUser) => {
    Alert({
      AlertTitle: "Kullanıcıyı Sil",
      AlertDescription: `${user.firstName} ${user.lastName} adlı kullanıcıyı silmek istediğinizden emin misiniz?`,
      ConfirmLabel: "Sil",
      CancelLabel: "İptal",
      onConfirm: () => deleteUser(user.userId),
    })
  }

  const columns = createColumns(handleViewDetails, handleDeleteUser)

  const handleFilterChange = (value: string) => {
    setCurrentPage(1)
    if (value === "all") {
      setStatusFilter(undefined)
    } else if (value === "active") {
      setStatusFilter(true)
    } else {
      setStatusFilter(false)
    }
  }

  const totalPages = usersData?.totalPages || 0

  const generatePageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("ellipsis")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("ellipsis")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Tüm kullanıcıları görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      <MyCard title="Tüm Kullanıcılar" Icon={User02Filled} actions={
        <div className="flex items-center gap-2 ">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={
              statusFilter === undefined
                ? "all"
                : statusFilter
                  ? "active"
                  : "inactive"
            }
            onValueChange={handleFilterChange}
          >
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Durum Filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tümü</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="inactive">Pasif</SelectItem>
            </SelectContent>
          </Select>
        </div>

      }>
        {isLoading ? (
          <UsersTableSkeleton />
        ) : usersData && usersData.users && usersData.users.length > 0 ? (
          <>
            <DataTable columns={columns} data={usersData.users} />
            {totalPages > 1 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        text="Önceki"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {generatePageNumbers().map((page, index) =>
                      page === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              setCurrentPage(page)
                            }}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        text="Sonraki"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages)
                            setCurrentPage(currentPage + 1)
                        }}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Kullanıcı bulunamadı.
          </div>
        )}
      </MyCard>

      {/* User Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kullanıcı Detayları</DialogTitle>
            <DialogDescription>
              Kullanıcının detaylı bilgilerini görüntüleyin
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Ad:</span>
                <span className="col-span-2">{selectedUser.firstName}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Soyad:</span>
                <span className="col-span-2">{selectedUser.lastName}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">E-posta:</span>
                <span className="col-span-2 text-sm">{selectedUser.email}</span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Rol:</span>
                <span className="col-span-2">
                  <Badge variant={selectedUser.roleId === 1 ? "default" : "secondary"}>
                    {selectedUser.roleId === 1 ? "Admin" : "Kullanıcı"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Onay Durumu:</span>
                <span className="col-span-2">
                  <Badge variant={selectedUser.isApproved ? "default" : "destructive"}>
                    {selectedUser.isApproved ? "Onaylı" : "Bekliyor"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Durum:</span>
                <span className="col-span-2">
                  <Badge variant={selectedUser.status ? "default" : "destructive"}>
                    {selectedUser.status ? "Aktif" : "Pasif"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Kayıt Tarihi:</span>
                <span className="col-span-2 text-sm">
                  {format(new Date(selectedUser.createdDate), "dd MMM yyyy HH:mm")}
                </span>
              </div>

              {selectedUser.modifiedDate && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <span className="font-medium">Güncelleme:</span>
                  <span className="col-span-2 text-sm">
                    {format(new Date(selectedUser.modifiedDate), "dd MMM yyyy HH:mm")}
                  </span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
