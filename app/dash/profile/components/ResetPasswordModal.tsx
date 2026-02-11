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
import { useResetPassword } from "../_services/mutations"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Geçerli bir email adresi giriniz"),
  resetCode: z.string().min(1, "Sıfırlama kodu gereklidir"),
  newPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  confirmPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
})

type FormValues = z.infer<typeof formSchema>

interface ResetPasswordModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email?: string
}

export default function ResetPasswordModal({ open, onOpenChange, email }: ResetPasswordModalProps) {
  const mutation = useResetPassword()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await mutation.mutateAsync({
        email: data.email,
        resetCode: data.resetCode,
        newPassword: data.newPassword,
      })

      toast.success(response.message || "Şifreniz sıfırlandı")
      reset()
      onOpenChange(false)
    } catch (error: any) {
      toast.error(error.message || "Şifre sıfırlanamadı")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Şifre Sıfırla</DialogTitle>
          <DialogDescription>
            Email adresinize gönderilen kodu kullanarak şifrenizi sıfırlayın
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            type="text"
            name="email"
            label="Email"
            control={control}
            placeholder="ornek@email.com"
          />
          <FormInput
            type="password"
            name="newPassword"
            label="Yeni Şifre"
            control={control}
            placeholder="••••••••"
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Yeni Şifre (Tekrar)"
            control={control}
            placeholder="••••••••"
          />
          <DialogFooter className="">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
