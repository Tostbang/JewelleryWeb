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
import { useCalculateLaborCost, LaborCostResponse } from "../_services/mutations"
import { SelectItem } from "@/components/ui/select"
import { Tag01 } from "asem-icons"

const formSchema = z.object({
  karat: z.number({
    required_error: "Karat seçimi zorunludur",
    invalid_type_error: "Karat seçimi zorunludur",
  }).min(1, "Karat seçimi zorunludur"),
  cost: z.string({
    message: "Maliyet zorunludur",
  }).min(1, "Maliyet 0'dan büyük olmalıdır"),
})

type FormValues = z.infer<typeof formSchema>

export default function PriceCalculatorForm() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<LaborCostResponse | null>(null)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      karat: 14,
      cost: "0",
    },
  })

  const mutation = useCalculateLaborCost()

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await mutation.mutateAsync(data)
      setResult(response)
      setOpen(true)
    } catch (error) {
      console.error("Error calculating labor cost:", error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between w-full h-full  ">
        <div className="grid grid-cols-1 gap-3">
          <FormInput
            type="text"
            Icon={Tag01}
            name="cost"
            label="Maliyet"
            control={control}
            placeholder="10000"
          />
          <FormInput
            type="select"
            name="karat"
            label="Karat"
            control={control}
          >
            <SelectItem value="24">24K</SelectItem>
            <SelectItem value="22">22K</SelectItem>
            <SelectItem value="18">18K</SelectItem>
            <SelectItem value="14">14K</SelectItem>
          </FormInput>
        </div>
        <Button type="submit" className="w-full h-10" disabled={mutation.isPending}>
          {mutation.isPending ? "Hesaplanıyor..." : "Fiyat Hesapla"}
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hesaplama Sonucu</DialogTitle>
            <DialogDescription>
              {result?.message}
            </DialogDescription>
          </DialogHeader>
          {result && (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="font-medium">Gram:</span>
                <span className="text-lg font-bold">{result.gram.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}g</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="font-medium">İşçilik Maliyeti:</span>
                <span className="text-lg font-bold">₺{result.laborCost.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-primary/10 rounded-md border-2 border-primary">
                <span className="font-medium">Toplam Maliyet:</span>
                <span className="text-xl font-bold text-primary">₺{result.totalCost.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => setOpen(false)}>
              Tamam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
