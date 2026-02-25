"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import MyCard from "../MyCard"
import { MyButton } from "../buttons/MyButton"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { FetchData } from "@/lib/fetchData"
import { Textarea } from "@/components/ui/textarea"
import { useFormContext, Controller } from "react-hook-form"

const supportSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  email: z.string().email("Lütfen geçerli bir e-posta adresi girin"),
})

type SupportFormValues = z.infer<typeof supportSchema>

interface SupportResponse {
  code: string
  message: string
  errors: string[]
  ticketId: number
}

export const SupportForm = () => {
  const { control, handleSubmit, reset } = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      title: "",
      description: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  })

  const supportMutation = useMutation({
    mutationFn: (data: SupportFormValues) =>
      FetchData("Support/Create", {
        method: "POST",
        body: data,
      }),
  })

  const onSubmit = async (data: SupportFormValues) => {
    try {
      const response = await supportMutation.mutateAsync(data)
      toast.success("Destek talebiniz başarıyla gönderildi!")
      reset()
    } catch (error) {
      console.error("Support error:", error)
      toast.error(
        error instanceof Error
          ? error.message
          : "Destek talebi gönderilemedi. Lütfen tekrar deneyin."
      )
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <MyCard className="p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Destek Talebi Oluştur</h2>
          <p className="text-muted-foreground text-sm mt-2">
            Sorularınız veya sorunlarınız için bize ulaşın
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            type="text"
            name="title"
            label="Konu Başlığı"
            control={control}
            placeholder="Sorunuzun konusu"
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Açıklama</label>
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <Textarea
                    {...field}
                    placeholder="Sorunuzu veya talebinizi detaylı olarak açıklayın"
                    className="min-h-[120px] resize-none"
                  />
                  {fieldState.error && (
                    <p className="text-sm text-destructive mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

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
            label="E-posta Adresi"
            control={control}
            placeholder="ornek@eposta.com"
          />

          <MyButton
            type="submit"
            className="w-full h-11 mt-6"
            disabled={supportMutation.isPending}
          >
            {supportMutation.isPending ? "Gönderiliyor..." : "Destek Talebi Gönder"}
          </MyButton>
        </form>
      </MyCard>
    </div>
  )
}
