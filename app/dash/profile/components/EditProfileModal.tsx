"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useUpdateProfile, UpdateProfileRequest } from "../_services/mutations"
import { Profile } from "@/lib/store/profile-store"
import { toast } from "sonner"

const formSchema = z.object({
  firstName: z.string().min(1, "Ad gereklidir"),
  lastName: z.string().min(1, "Soyad gereklidir"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  // registerLat: z.number().optional(),
  // registerLng: z.number().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface EditProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: Profile
}

export default function EditProfileModal({ open, onOpenChange, profile }: EditProfileModalProps) {
  const mutation = useUpdateProfile()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      // registerLat: profile.registerLat || 0,
      // registerLng: profile.registerLng || 0,
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await mutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      })

      toast.success(response.message || "Profil bilgileri güncellendi")
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.message || "Profil güncellenemedi")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Profili Düzenle</DialogTitle>
          <DialogDescription>
            Profil bilgilerinizi güncelleyin
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="text"
              name="firstName"
              label="Ad"
              control={control}
              placeholder="Adınız"
            />
            <FormInput
              type="text"
              name="lastName"
              label="Soyad"
              control={control}
              placeholder="Soyadınız"
            />
          </div>
          <FormInput
            type="text"
            name="email"
            label="Email"
            control={control}
            placeholder="ornek@email.com"
          />
          {/* <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="number"
              name="registerLat"
              label="Enlem"
              control={control}
              placeholder="0.000000"
              className="h-11 bg-white"
            />
            <FormInput
              type="number"
              name="registerLng"
              label="Boylam"
              control={control}
              placeholder="0.000000"
              className="h-11 bg-white"
            />
          </div> */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Güncelleniyor..." : "Güncelle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
