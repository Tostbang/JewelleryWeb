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
import { toast } from "sonner"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
      const response = await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
        lat: location?.lat || 0,
        lng: location?.lng || 0,
      })

      toast.success("Login successful!")
      
      // Redirect to dashboard
      router.push("/dash/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.")
    }
  }

  return (
    <div className="relative z-10 w-full max-w-md">
      <BubbleButton
        onClick={() => router.push("/")}
        className="absolute -top-16 left-0 text-sm"
      >
        <ArrowLeft01Sharp className="size-4" />
        Go back
      </BubbleButton>

      <Card className="bg-my-lavender/30 dark:bg-my-lavender/15">
        <div className="mb-8">
          <NavLogo />
          <div className="mt-6 space-y-1.5">
            <h1 className="text-3xl font-bold bg-gradient-to-br from-my-blue to-my-lavender bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your jewellery account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            type="text"
            name="email"
            label="Email Address"
            control={control}
            placeholder="your.email@example.com"
            autoComplete="email"
          />
          
          <FormInput
            type="password"
            name="password"
            label="Password"
            control={control}
            placeholder="Enter your password"
            autoComplete="current-password"
          />

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-my-blue to-my-lavender hover:from-my-blue/90 hover:to-my-lavender/90" 
            disabled={loginMutation.isPending || !location}
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          By signing in, you agree to our Terms & Conditions and Privacy Policy.
        </p>
      </Card>
    </div>
  )
}
