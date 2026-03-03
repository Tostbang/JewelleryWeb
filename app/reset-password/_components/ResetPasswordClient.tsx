"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"
import FormInput from "@/components/FormInput"
import MyCard from "@/components/MyCard"
import { MyButton } from "@/components/buttons/MyButton"
import { NavLogo } from "@/components/navbar/NavLogo"
import { useRouter, useSearchParams } from "next/navigation"
import { BubbleButton } from "@/components/buttons/BubbleButton"
import { ArrowLeft01Sharp } from "asem-icons"
import { toast } from "sonner"
import { useResetPassword } from "../_services/mutations"

const resetPasswordSchema = z
  .object({
    resetCode: z.string().length(6, "Sıfırlama kodu 6 haneli olmalıdır"),
    newPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const { control, handleSubmit } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      resetCode: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const resetPasswordMutation = useResetPassword()

  useEffect(() => {
    if (!email) {
      toast.error("E-posta adresi bulunamadı")
      router.push("/forgot-password")
    }
  }, [email, router])

  const onSubmit = async (data: ResetPasswordFormValues) => {
    if (!email) {
      toast.error("E-posta adresi bulunamadı")
      return
    }

    try {
      await resetPasswordMutation.mutateAsync({
        email,
        resetCode: data.resetCode,
        newPassword: data.newPassword,
      })

      toast.success("Şifreniz başarıyla sıfırlandı! Giriş yapabilirsiniz.")
      router.push("/login")
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Şifre sıfırlama başarısız. Lütfen tekrar deneyin."
      )
    }
  }

  if (!email) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-my-gradient p-4">
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <BubbleButton
          onClick={() => router.push("/forgot-password")}
          className="mb-8 text-sm hover:scale-105 transition-transform"
        >
          <ArrowLeft01Sharp className="size-4" />
          Geri dön
        </BubbleButton>

        <MyCard>
          <div className="mb-6">

            <div className=" space-y-2 text-center">
              <h1 className="text-3xl font-bold">Şifre Sıfırla</h1>
              <p className="text-muted-foreground text-sm">
                {email} adresine gönderilen 6 haneli kodu ve yeni şifrenizi girin
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center">
              <FormInput
                type="pin"
                name="resetCode"
                label="Sıfırlama Kodu"
                control={control}
                autoComplete="one-time-code"
                className="w-full"
              />
            </div>

            <FormInput
              type="password"
              name="newPassword"
              label="Yeni Şifre"
              control={control}
              placeholder="Yeni şifrenizi girin"
              autoComplete="new-password"
              className="bg-white/80 h-9.5"
            />

            <FormInput
              type="password"
              name="confirmPassword"
              label="Yeni Şifre Tekrar"
              control={control}
              placeholder="Yeni şifrenizi tekrar girin"
              autoComplete="new-password"
              className="bg-white/80 h-9.5"
            />

            <MyButton
              type="submit"
              className="w-full mt-5 h-11 shadow-lg shadow-my-blue/20 hover:shadow-xl hover:shadow-my-blue/30 transition-all duration-300"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"}
            </MyButton>
          </form>
        </MyCard>
      </div>
    </div>
  )
}
