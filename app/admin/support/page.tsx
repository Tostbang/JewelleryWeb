"use client"

import { useState } from "react"
import { useGetTickets, Ticket } from "./_services/queries"
import { DataTable } from "@/components/data-table"
import { createColumns } from "./columns"
import MyCard from "@/components/MyCard"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { CustomerSupportFilled } from "asem-icons"
import { ScrollArea } from "@/components/ui/scroll-area"

function TicketsTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export default function AdminSupportPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10

  const { data: ticketsData, isLoading } = useGetTickets({
    page: currentPage,
    pageSize: pageSize,
  })
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

  const handleViewDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket)
    setIsDetailsDialogOpen(true)
  }

  const columns = createColumns(handleViewDetails)

  const totalPages = ticketsData?.totalPages || 0

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
          <h1 className="text-3xl font-bold">Destek Talepleri</h1>
          <p className="text-muted-foreground mt-1">
            Tüm destek taleplerini görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      <MyCard title="Tüm Destek Talepleri" Icon={CustomerSupportFilled}>
        {isLoading ? (
          <TicketsTableSkeleton />
        ) : ticketsData && ticketsData.tickets && ticketsData.tickets.length > 0 ? (
          <>
            <DataTable columns={columns} data={ticketsData.tickets} />
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
            Destek talebi bulunamadı.
          </div>
        )}
      </MyCard>

      {/* Ticket Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <ScrollArea className="h-[80vh] pr-2">
            <DialogHeader>
              <DialogTitle>Destek Talebi Detayları</DialogTitle>
              <DialogDescription>
                Destek talebinin detaylı bilgilerini görüntüleyin
              </DialogDescription>
            </DialogHeader>

            {selectedTicket && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-5 items-center gap-4">
                  <span className="font-medium">Talep ID:</span>
                  <span className="col-span-3">#{selectedTicket.ticketId}</span>
                </div>

                <div className="grid grid-cols-5 items-center gap-4">
                  <span className="font-medium">Ad Soyad:</span>
                  <span className="col-span-2">{selectedTicket.fullName}</span>
                </div>

                <div className="grid grid-cols-5 items-center gap-4">
                  <span className="font-medium">E-posta:</span>
                  <span className="col-span-2 text-sm">{selectedTicket.email}</span>
                </div>

                <div className="grid grid-cols-5 items-center gap-4">
                  <span className="font-medium">Konu:</span>
                  <span className="col-span-4 font-medium">{selectedTicket.title}</span>
                </div>

                <div className="grid grid-cols-5 items-start gap-4">
                  <span className="font-medium">Açıklama:</span>
                  <span className="col-span-4 text-sm whitespace-pre-wrap">
                    {selectedTicket.description}
                  </span>
                </div>

                {/* <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Talep Durumu:</span>
                <span className="col-span-2">
                  <Badge variant={selectedTicket.isClosed ? "secondary" : "default"}>
                    {selectedTicket.isClosed ? "Kapalı" : "Açık"}
                  </Badge>
                </span>
              </div>

              <div className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium">Aktiflik:</span>
                <span className="col-span-2">
                  <Badge variant={selectedTicket.status ? "default" : "destructive"}>
                    {selectedTicket.status ? "Aktif" : "Pasif"}
                  </Badge>
                </span>
              </div> */}

                <div className="grid grid-cols-5 items-center gap-4">
                  <span className="font-medium">Oluşturma Tarihi:</span>
                  <span className="col-span-2 text-sm">
                    {format(new Date(selectedTicket.createdDate), "dd MMM yyyy HH:mm")}
                  </span>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div >
  )
}
