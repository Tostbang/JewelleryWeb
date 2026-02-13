"use client"
import { useState } from "react"
import { useGetAdminPackages } from "./_services/queries"
import { useDeletePackage } from "./_services/mutations"
import { AdminPackage } from "./_services/queries"
import { DataTable } from "@/components/data-table"
import { createColumns } from "./columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import MyCard from "@/components/MyCard"
import { PackageFilled } from "asem-icons"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert } from "@/lib/useGlobalStore"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PackageFormDialog } from "@/components/package-form-dialog"

function PackagesTableSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  )
}

export default function AdminPackagesPage() {
  const { data: packagesData, isLoading } = useGetAdminPackages()
  const deleteMutation = useDeletePackage()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [packageToEdit, setPackageToEdit] = useState<AdminPackage | null>(null)

  const handleEdit = (pkg: AdminPackage) => {
    setPackageToEdit(pkg)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (packageId: number) => {
    Alert({
      AlertTitle: "Paketi Devre Dışı Bırak",
      AlertDescription:
        "Bu paketi devre dışı bırakmak istediğinizden emin misiniz? Daha sonra tekrar aktif edebilirsiniz.",
      CancelLabel: "İptal",
      ConfirmLabel: "Devre Dışı Bırak",
      onConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(packageId)
        } catch (error) {
          console.error("Error deleting package:", error)
        }
      },
    })
  }

  const handleCreateNew = () => {
    setPackageToEdit(null)
    setIsDialogOpen(true)
  }


  const columns = createColumns(handleEdit, handleDelete)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Paket Yönetimi</h1>
          <p className="text-muted-foreground mt-1">
            Tüm abonelik paketlerini yönetin
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Paket Oluştur
        </Button>
      </div>

      <MyCard title="Tüm Paketler" Icon={PackageFilled}>
        {isLoading ? (
          <PackagesTableSkeleton />
        ) : packagesData && packagesData.packages && packagesData.packages.length > 0 ? (
          <DataTable columns={columns} data={packagesData.packages} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Paket bulunamadı. Başlamak için ilk paketinizi oluşturun.
          </div>
        )}
      </MyCard>
      <CreatePackageFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <EditPackageFormDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} EditValues={packageToEdit} />
    </div>
  )
}

interface PackageFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CreatePackageFormDialog({
  open,
  onOpenChange,
}: PackageFormDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Yeni Paket Oluştur
          </DialogTitle>
          <DialogDescription>
            Yeni bir paket oluşturmak için detayları doldurun.
          </DialogDescription>
        </DialogHeader>
        <PackageFormDialog
          onOpenChange={onOpenChange}
          packageToEdit={null}
        />
      </DialogContent>
    </Dialog>
  )
}

type EditPackageFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  EditValues: AdminPackage | null
}

function EditPackageFormDialog({
  open,
  onOpenChange,
  EditValues,
}: EditPackageFormDialogProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Paket Düzenle
          </DialogTitle>
          <DialogDescription>
            Paket detaylarını aşağıdan güncelleyin.
          </DialogDescription>
        </DialogHeader>
        <PackageFormDialog
          onOpenChange={onOpenChange}
          packageToEdit={EditValues}
        />
      </DialogContent>
    </Dialog>
  )
}