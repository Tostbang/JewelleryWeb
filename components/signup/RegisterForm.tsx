"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import MyCard from "../MyCard"
import { MyButton } from "../buttons/MyButton"
import { NavLogo } from "@/components/navbar/NavLogo"
import { useRouter } from "next/navigation"
import { BubbleButton } from "@/components/buttons/BubbleButton"
import { ArrowLeft01Sharp } from "asem-icons"
import { useRegister } from "./_services/mutations"
import Link from "next/link"
import { toast } from "sonner"

const registerSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
  confirmPassword: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Şifreler eşleşmiyor",
  path: ["confirmPassword"],
})

type RegisterFormValues = z.infer<typeof registerSchema>

export const RegisterForm = () => {
  const router = useRouter()
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  const { control, handleSubmit } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const registerMutation = useRegister()

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

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        lat: location?.lat || 0,
        lng: location?.lng || 0,
      })

      toast.success("Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.")

      // Redirect to confirm page with email
      router.push(`/confirm?email=${encodeURIComponent(data.email)}`)
    } catch (error) {
      console.error("Register error:", error)
      toast.error(error instanceof Error ? error.message : "Kayıt başarısız. Lütfen tekrar deneyin.")
    }
  }

  return (
    <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
      <BubbleButton
        onClick={() => router.push("/")}
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
            <h1 className="text-3xl font-bold ">
              Hoş Geldiniz
            </h1>
            <p className="text-muted-foreground text-sm">
              Yeni hesap oluşturun
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="text"
              name="firstName"
              label="Ad"
              control={control}
              placeholder="Adınız"
              autoComplete="given-name"
            />

            <FormInput
              type="text"
              name="lastName"
              label="Soyad"
              control={control}
              placeholder="Soyadınız"
              autoComplete="family-name"
            />
          </div>

          <FormInput
            type="text"
            name="email"
            label="E-posta Adresi"
            control={control}
            placeholder="ornek@eposta.com"
            autoComplete="email"
          />

          <FormInput
            type="password"
            name="password"
            label="Şifre"
            control={control}
            placeholder="Şifrenizi girin"
            autoComplete="new-password"
          />

          <FormInput
            type="password"
            name="confirmPassword"
            label="Şifre Tekrar"
            control={control}
            placeholder="Şifrenizi tekrar girin"
            autoComplete="new-password"
          />

          <MyButton
            type="submit"
            className="w-full h-11 mt-8 shadow-lg shadow-my-blue/20 hover:shadow-xl hover:shadow-my-blue/30 transition-all duration-300"
            disabled={registerMutation.isPending || !location}
          >
            {registerMutation.isPending ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </MyButton>
        </form>

        <div className="mt-3 text-center">
          <p className="text-sm text-muted-foreground">
            Zaten hesabınız var mı?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-my-blue font-medium hover:underline transition-all"
            >
              Giriş Yap
            </button>
          </p>
        </div>

        <p className="mt-2 text-xs text-muted-foreground text-center leading-relaxed px-2">
          Kayıt olarak{" "}
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
