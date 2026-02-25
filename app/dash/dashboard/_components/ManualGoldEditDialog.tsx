"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormInput from "@/components/FormInput"
import { MyButton } from "@/components/buttons/MyButton"
import { ManualGoldPriceItem } from "../_services/queries"
import { useUpdateManualGoldPrice } from "../_services/mutations"
import { toast } from "sonner"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Edit02, PenTool03 } from "asem-icons"

const schema = z.object({
  gramBuyTl: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  gramSellTl: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  ceyrekAltin: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  yarimAltin: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  tamAltin: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  gram14kTl: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  gram18kTl: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  gram22kTl: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
  gram24kTl: z.number({ invalid_type_error: "Geçerli bir değer giriniz" }).min(0, "0 veya daha büyük olmalı"),
})

type FormValues = z.infer<typeof schema>

interface Props {
  item: ManualGoldPriceItem
}

export function ManualGoldEditDialog({ item }: Props) {
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useUpdateManualGoldPrice()

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      gramBuyTl: item.gramBuyTl,
      gramSellTl: item.gramSellTl,
      ceyrekAltin: item.ceyrekAltin,
      yarimAltin: item.yarimAltin,
      tamAltin: item.tamAltin,
      gram14kTl: item.karatPrices.gram14kTl,
      gram18kTl: item.karatPrices.gram18kTl,
      gram22kTl: item.karatPrices.gram22kTl,
      gram24kTl: item.karatPrices.gram24kTl,
    },
  })

  const onSubmit = (values: FormValues) => {
    mutate(
      {
        priceId: item.priceId,
        gramBuyTl: values.gramBuyTl,
        gramSellTl: values.gramSellTl,
        ceyrekAltin: values.ceyrekAltin,
        yarimAltin: values.yarimAltin,
        tamAltin: values.tamAltin,
        karatPrices: {
          gram14kTl: values.gram14kTl,
          gram18kTl: values.gram18kTl,
          gram22kTl: values.gram22kTl,
          gram24kTl: values.gram24kTl,
        },
      },
      {
        onSuccess: () => {
          toast.success("Manuel altın fiyatı güncellendi")
          setOpen(false)
        },
        onError: (err) => {
          toast.error(err.message)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={(v) => {
      setOpen(v)
      if (v) reset({
        gramBuyTl: item.gramBuyTl,
        gramSellTl: item.gramSellTl,
        ceyrekAltin: item.ceyrekAltin,
        yarimAltin: item.yarimAltin,
        tamAltin: item.tamAltin,
        gram14kTl: item.karatPrices.gram14kTl,
        gram18kTl: item.karatPrices.gram18kTl,
        gram22kTl: item.karatPrices.gram22kTl,
        gram24kTl: item.karatPrices.gram24kTl,
      })
    }}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="text-[#272522] font-normal bg-input/30 border-gray-300 ">
          Güncelle <Edit02 className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Manuel Altın Fiyatını Güncelle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide pt-1">Gram Fiyatlar</p>
          <div className="grid grid-cols-2 gap-3">
            <FormInput type="number" name="gramBuyTl" label="Gram Alış (₺)" control={control} />
            <FormInput type="number" name="gramSellTl" label="Gram Satış (₺)" control={control} />
          </div>

          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide pt-2">Ziynet Altınları</p>
          <div className="grid grid-cols-3 gap-3">
            <FormInput type="number" name="ceyrekAltin" label="Çeyrek (₺)" control={control} />
            <FormInput type="number" name="yarimAltin" label="Yarım (₺)" control={control} />
            <FormInput type="number" name="tamAltin" label="Tam (₺)" control={control} />
          </div>

          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide pt-2">Karat Fiyatları</p>
          <div className="grid grid-cols-2 gap-3">
            <FormInput type="number" name="gram14kTl" label="14K (₺)" control={control} />
            <FormInput type="number" name="gram18kTl" label="18K (₺)" control={control} />
            <FormInput type="number" name="gram22kTl" label="22K (₺)" control={control} />
            <FormInput type="number" name="gram24kTl" label="24K (₺)" control={control} />
          </div>

          <div className="pt-4">
            <MyButton type="submit" disabled={isPending} className="w-full h-11">
              {isPending ? "Güncelleniyor..." : "Güncelle"}
            </MyButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
