"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import MyCard from "@/components/MyCard"
import { MyButton } from "@/components/buttons/MyButton"
import { NavLogo } from "@/components/navbar/NavLogo"
import { useRouter } from "next/navigation"
import { BubbleButton } from "@/components/buttons/BubbleButton"
import { ArrowLeft01Sharp } from "asem-icons"
import { toast } from "sonner"
import { useForgotPassword } from "../_services/mutations"

const forgotPasswordSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordClient() {
  const router = useRouter()

  const { control, handleSubmit } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const forgotPasswordMutation = useForgotPassword()

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPasswordMutation.mutateAsync({ email: data.email })
      toast.success("Şifre sıfırlama kodu e-posta adresinize gönderildi.")
      router.push(`/reset-password?email=${encodeURIComponent(data.email)}`)
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "İşlem başarısız. Lütfen tekrar deneyin."
      )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-my-gradient p-4">
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <BubbleButton
          onClick={() => router.push("/login")}
          className="mb-8 text-sm hover:scale-105 transition-transform"
        >
          <ArrowLeft01Sharp className="size-4" />
          Geri dön
        </BubbleButton>

        <MyCard>
          <div className="mb-6">

            <div className=" space-y-2 text-center">
              <h1 className="text-3xl font-bold">Şifremi Unuttum</h1>
              <p className="text-muted-foreground text-sm">
                E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormInput
              type="text"
              name="email"
              label="E-posta Adresi"
              control={control}
              autoComplete="email"
              className="bg-white/80 "
            />

            <MyButton
              type="submit"
              className="w-full h-11 shadow-lg shadow-my-blue/20 hover:shadow-xl hover:shadow-my-blue/30 transition-all duration-300"
              disabled={forgotPasswordMutation.isPending}
            >
              {forgotPasswordMutation.isPending ? "Gönderiliyor..." : "Bağlantı Gönder"}
            </MyButton>
          </form>
        </MyCard>
      </div>
    </div>
  )
}
