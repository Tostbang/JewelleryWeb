"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import { SelectItem } from "@/components/ui/select"
import { useCompareKarats, CompareKaratsResponse } from "../_services/mutations"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

const formSchema = z.object({
  karat1: z.number({ required_error: "Karat 1 zorunludur", invalid_type_error: "Karat 1 zorunludur" }).min(1),
  karat2: z.number({ required_error: "Karat 2 zorunludur", invalid_type_error: "Karat 2 zorunludur" }).min(1),
  gram: z.number({ required_error: "Gram zorunludur", invalid_type_error: "Gram zorunludur" }).positive("Gram 0'dan büyük olmalıdır"),
})

type FormValues = z.infer<typeof formSchema>

const KARAT_OPTIONS = [
  { value: "8", label: "8K" },
  { value: "14", label: "14K" },
  { value: "18", label: "18K" },
  { value: "21", label: "21K" },
  { value: "22", label: "22K" },
  { value: "24", label: "24K" },
]

export default function KaratCompareForm() {
  const [result, setResult] = useState<CompareKaratsResponse | null>(null)
  const [open, setOpen] = useState(false)
  const mutation = useCompareKarats()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { karat1: 14, karat2: 18, gram: 100 },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await mutation.mutateAsync(data)
      setResult(res)
      setOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <FormInput type="select" name="karat1" label="Karat 1" control={control}>
            {KARAT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </FormInput>
          <FormInput type="select" name="karat2" label="Karat 2" control={control}>
            {KARAT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </FormInput>
          <FormInput type="number" name="gram" label="Gram" control={control} placeholder="100" />
        </div>
        <Button type="submit" className="w-full h-10" disabled={mutation.isPending}>
          {mutation.isPending ? "Karşılaştırılıyor..." : "Karşılaştır"}
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Karat Karşılaştırması Sonucu</DialogTitle>
            <DialogDescription>{result?.message}</DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{result.karat1}K</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saflık</span>
                    <span className="font-medium">%{result.purityPercent1}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saf Altın</span>
                    <span className="font-medium">{result.pureGoldGram1.toLocaleString("tr-TR", { maximumFractionDigits: 4 })}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gram Fiyatı</span>
                    <span className="font-medium">₺{result.gramPriceTl1.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2">
                    <span>Toplam</span>
                    <span className="text-primary">₺{result.totalPriceTl1.toLocaleString("tr-TR")}</span>
                  </div>
                </div>

                <div className="rounded-lg border p-3 space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{result.karat2}K</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saflık</span>
                    <span className="font-medium">%{result.purityPercent2}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saf Altın</span>
                    <span className="font-medium">{result.pureGoldGram2.toLocaleString("tr-TR", { maximumFractionDigits: 4 })}g</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Gram Fiyatı</span>
                    <span className="font-medium">₺{result.gramPriceTl2.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2">
                    <span>Toplam</span>
                    <span className="text-primary">₺{result.totalPriceTl2.toLocaleString("tr-TR")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-primary/10 border-2 border-primary px-4 py-3">
                <span className="text-sm font-medium">Fark ({result.karat2}K − {result.karat1}K)</span>
                <span className="text-lg font-bold text-primary">₺{result.totalPriceDiffTl.toLocaleString("tr-TR")}</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Tamam</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
