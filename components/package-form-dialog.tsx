
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FormInput from "@/components/FormInput"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { AdminPackage } from "@/app/admin/packages/_services/queries"
import { CreatePackageRequest, UpdatePackageRequest, useCreatePackage, useUpdatePackage } from "@/app/admin/packages/_services/mutations"
import { PropertyView, PropertyViewFilled, SmartPhone01 } from "asem-icons"
import { cn } from "@/lib/utils"

const packageSchema = z.object({
  name: z.string().min(1, "Paket adı gereklidir"),
  price: z.number().min(0, "Fiyat 0'dan büyük olmalıdır"),
  maxDeviceCount: z.number().min(1, "En az 1 cihaz olmalıdır"),
  allowedRadiusKm: z.number().min(0, "Yarıçap 0'dan büyük veya eşit olmalıdır"),
  allowMobile: z.boolean(),
  status: z.boolean().optional(),
})

type PackageFormValues = z.infer<typeof packageSchema>

interface PackageFormDialogProps {
  onOpenChange: (status: boolean) => void,
  packageToEdit?: AdminPackage | null
  onSuccess?: () => void
}

export function PackageFormDialog({
  onOpenChange,
  packageToEdit,
  onSuccess,
}: PackageFormDialogProps) {
  const createMutation = useCreatePackage()
  const updateMutation = useUpdatePackage()
  const isEditing = !!packageToEdit

  const { control, handleSubmit, reset, watch, setValue } = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: "",
      maxDeviceCount: 1,
      allowMobile: true,
      allowedRadiusKm: 10,
      price: 0,
      status: true,
    },
  })

  const allowMobile = watch("allowMobile")
  const status = watch("status")

  useEffect(() => {
    if (packageToEdit) {
      reset({
        name: packageToEdit.name,
        maxDeviceCount: packageToEdit.maxDeviceCount,
        allowMobile: packageToEdit.allowMobile,
        allowedRadiusKm: packageToEdit.allowedRadiusKm,
        price: packageToEdit.price,
        status: packageToEdit.status,
      })
    } else {
      reset({
        name: "",
        maxDeviceCount: 1,
        allowMobile: true,
        allowedRadiusKm: 10,
        price: 0,
        status: true,
      })
    }
  }, [packageToEdit, reset])

  const onSubmit = async (data: PackageFormValues) => {
    try {
      if (isEditing) {
        const updateData: UpdatePackageRequest = {
          packageId: packageToEdit.packageId,
          name: data.name,
          maxDeviceCount: data.maxDeviceCount,
          allowMobile: data.allowMobile,
          allowedRadiusKm: data.allowedRadiusKm,
          price: data.price,
          status: data.status ?? true,
        }
        await updateMutation.mutateAsync(updateData)
      } else {
        const createData: CreatePackageRequest = {
          name: data.name,
          maxDeviceCount: data.maxDeviceCount,
          allowMobile: data.allowMobile,
          allowedRadiusKm: data.allowedRadiusKm,
          price: data.price,
        }
        await createMutation.mutateAsync(createData)
      }
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error("Error saving package:", error)
    }
  }

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 pb-5">
        <FormInput
          type="text"
          name="name"
          label="Paket Adı"
          control={control}
          placeholder="Paket adını girin"
        />

        <FormInput
          type="number"
          name="price"
          label="Fiyat (₺)"
          control={control}
          placeholder="0.00"
          step="0.01"
          min="0"
        />

        <FormInput
          type="number"
          name="maxDeviceCount"
          label="Maksimum Cihaz Sayısı"
          control={control}
          min="1"
        />

        <FormInput
          type="number"
          name="allowedRadiusKm"
          label="İzin Verilen Yarıçap (km)"
          control={control}
          min="0"
        />

        <div className="mt-5">
          <Label htmlFor="allowMobile" className={cn("font-normal cursor-pointer w-full  flex items-center justify-between space-x-2  h-13  rounded-md border py-1 pl-2 pr-1 transition-colors", allowMobile && "border-gray-300")}>
            <div className="flex items-center gap-x-2">
              <div className="rounded-sm shadow-sm p-1.5">
                <SmartPhone01 />
              </div>
              <div>
                <h2 className="font-medium ">
                  Mobil Erişime İzin Ver
                </h2>
                <p className="text-muted-foreground pt-1">Mobil cihazlardan sisteme erişimi açar.</p>
              </div>
            </div>
            <Switch
              id="allowMobile"
              checked={allowMobile}
              onCheckedChange={(checked) => setValue("allowMobile", checked)}
            />
          </Label>
        </div>

        {isEditing && (
          <div className="">
            <Label htmlFor="status" className={cn("font-normal cursor-pointer w-full flex items-center justify-between space-x-2  h-13 py-1 pl-2 pr-1 rounded-md border transition-colors", status && "border-gray-300")}>
              <div className="flex items-center gap-x-2">
                <div className="rounded-sm shadow-sm p-1.5">
                  <PropertyView />
                </div>
                <div>
                  <h2 className="font-medium ">Aktif Durum</h2>
                  <p className="text-muted-foreground pt-1">Kaydın sistemde aktif olmasını sağlar.</p>
                </div>
              </div>
              <Switch
                id="status"
                checked={status ?? true}
                onCheckedChange={(checked) => setValue("status", checked)}
              />
            </Label>
          </div>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild >
          <Button
            type="button"
            variant="outline"
          >
            İptal
          </Button>
        </DialogClose>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Paketi Güncelle" : "Paket Oluştur"}
        </Button>
      </DialogFooter>
    </form>
  )
}
