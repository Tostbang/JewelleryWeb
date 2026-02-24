"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import FormInput from "@/components/FormInput"
import MyCard from "@/components/MyCard"
import { MyButton } from "@/components/buttons/MyButton"
import { NavLogo } from "@/components/navbar/NavLogo"
import { useRouter, useSearchParams } from "next/navigation"
import { BubbleButton } from "@/components/buttons/BubbleButton"
import { ArrowLeft01Sharp } from "asem-icons"
import { toast } from "sonner"
import { useConfirmEmail } from "./_services/mutations"

const confirmSchema = z.object({
  pin: z.string().length(6, "PIN 6 haneli olmalıdır"),
})

type ConfirmFormValues = z.infer<typeof confirmSchema>

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const [countdown, setCountdown] = useState(0)

  const { control, handleSubmit } = useForm<ConfirmFormValues>({
    resolver: zodResolver(confirmSchema),
    defaultValues: {
      pin: "",
    },
  })

  const confirmMutation = useConfirmEmail()

  useEffect(() => {
    if (!email) {
      toast.error("E-posta adresi bulunamadı")
      router.push("/signup")
    }
  }, [email, router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const onSubmit = async (data: ConfirmFormValues) => {
    if (!email) {
      toast.error("E-posta adresi bulunamadı")
      return
    }

    try {
      await confirmMutation.mutateAsync({
        email: email,
        pin: data.pin,
      })

      toast.success("E-posta adresiniz doğrulandı! Giriş yapabilirsiniz.")
      router.push("/login")
    } catch (error) {
      console.error("Confirm error:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Doğrulama başarısız. Lütfen PIN kodunu kontrol edin."
      )
    }
  }

  const handleResendPin = async () => {
    if (countdown > 0) return

    // TODO: Add resend PIN mutation when API is available
    toast.info("Yeni PIN kodu gönderildi")
    setCountdown(60)
  }

  if (!email) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-my-gradient p-4">
      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <BubbleButton
          onClick={() => router.push("/signup")}
          className="mb-8 text-sm hover:scale-105 transition-transform"
        >
          <ArrowLeft01Sharp className="size-4" />
          Geri dön
        </BubbleButton>

        <MyCard className="">
          <div className="mb-6">
            <div className="mb-6 flex justify-center">
              <NavLogo />
            </div>
            <div className="mt-8 space-y-2 text-center">
              <h1 className="text-3xl font-bold">E-posta Doğrulama</h1>
              <p className="text-muted-foreground text-sm">
                {email} adresine gönderilen 6 haneli PIN kodunu girin
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex justify-center ">
              <FormInput
                type="pin"
                name="pin"
                label="Doğrulama Kodu"
                control={control}
                autoComplete="one-time-code"
                className="w-full bg-yellow-300"
              />
            </div>

            <MyButton
              type="submit"
              className="w-full h-11 shadow-lg shadow-my-blue/20 hover:shadow-xl hover:shadow-my-blue/30 transition-all duration-300"
              disabled={confirmMutation.isPending}
            >
              {confirmMutation.isPending ? "Doğrulanıyor..." : "Doğrula"}
            </MyButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              PIN kodu almadınız mı?
            </p>
            <button
              onClick={handleResendPin}
              disabled={countdown > 0}
              className={`text-sm font-medium transition-all ${countdown > 0
                ? "text-muted-foreground cursor-not-allowed"
                : "text-my-blue hover:underline"
                }`}
            >
              {countdown > 0
                ? `Yeniden gönder (${countdown}s)`
                : "Yeniden gönder"}
            </button>
          </div>
        </MyCard>
      </div>
    </div>
  )
}
