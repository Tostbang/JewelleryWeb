"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/utils/Card"
import { NavLogo } from "@/components/navbar/NavLogo"
import { useRouter } from "next/navigation"
import { BubbleButton } from "@/components/buttons/BubbleButton"
import { ArrowLeft01Sharp } from "asem-icons"
import { useLogin } from "./_services/mutations"
import Link from "next/link"
import { toast } from "sonner"
import MyCard from "../MyCard"
import { MyButton } from "../buttons/MyButton"
import { Role } from "@/lib/types"

const loginSchema = z.object({
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const router = useRouter()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const loginMutation = useLogin()

  // Get user location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.warn("Location access denied:", error)
          // Set default location if user denies permission
          setLocation({ lat: 0, lng: 0 })
        }
      )
    } else {
      // Set default location if geolocation is not supported
      setLocation({ lat: 0, lng: 0 })
    }
  }, [])

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = loginMutation.mutate({
        email: data.email,
        password: data.password,
        lat: location?.lat || 0,
        lng: location?.lng || 0,
      })

    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Giriş başarısız. Lütfen tekrar deneyin.")
    }
  }

  return (
    <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      <BubbleButton
        onClick={() => router.push("/")}
        className="mb-8 "
      >
        <ArrowLeft01Sharp className="size-4" />
        Geri dön
      </BubbleButton>

      <MyCard className="">
        <div className="mb-6">

          <div className="mt-8 space-y-2 text-center">
            <h1 className="text-3xl font-bold ">
              Tekrar Hoş Geldiniz
            </h1>
            <p className="text-muted-foreground text-sm">
              Kuyumculuk hesabınıza giriş yapın
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <FormInput
            type="text"
            name="email"
            label="E-posta Adresi"
            control={control}
            placeholder="ornek@eposta.com"
            autoComplete="email"
            className="bg-white/40 h-10"
          />

          <FormInput
            type="password"
            name="password"
            label="Şifre"
            control={control}
            placeholder="Şifrenizi girin"
            autoComplete="current-password"
            className="bg-white/40 h-10"
          />

          <MyButton
            type="submit"
            className="w-full h-11 mt-8 shadow-lg shadow-my-blue/20 hover:shadow-xl hover:shadow-my-blue/30 transition-all duration-300"
            disabled={loginMutation.isPending || !location}
          >
            {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          </MyButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Hesabınız yok mu?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-my-blue font-medium hover:underline transition-all"
            >
              Kayıt Ol
            </button>
          </p>
        </div>

        <p className="mt-4 text-xs text-muted-foreground text-center leading-relaxed px-2">
          Giriş yaparak{" "}
          <span className="text-my-blue font-medium cursor-pointer hover:underline">
            <Link href="/terms">Şartlar ve Koşullarımızı</Link>
          </span>
          {" "}ve{" "}
          <span className="text-my-blue font-medium cursor-pointer hover:underline">
            <Link href="/privacy">Gizlilik Politikamızı</Link>
          </span>
          {" "}kabul etmiş olursunuz.
        </p>
      </MyCard>
    </div>
  )
}
