"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormInput from "@/components/FormInput"
import { Button } from "@/components/ui/button"
import { SelectItem } from "@/components/ui/select"
import { WeightUnit, WeightUnitLabels } from "@/lib/types"
import { useConvertWeight, ConvertWeightResponse } from "../_services/mutations"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { WeightScale02 } from "asem-icons"

const formSchema = z.object({
  value: z.number({ required_error: "Değer zorunludur", invalid_type_error: "Değer zorunludur" }).positive("Değer 0'dan büyük olmalıdır"),
  fromUnit: z.number({ required_error: "Birim seçimi zorunludur", invalid_type_error: "Birim seçimi zorunludur" }).min(1),
  toUnit: z.number({ required_error: "Birim seçimi zorunludur", invalid_type_error: "Birim seçimi zorunludur" }).min(1),
})

type FormValues = z.infer<typeof formSchema>

const UNIT_OPTIONS = Object.values(WeightUnit)
  .filter((v) => typeof v === "number")
  .map((v) => ({ value: String(v), label: WeightUnitLabels[v as WeightUnit] }))

export default function WeightConverterForm() {
  const [result, setResult] = useState<ConvertWeightResponse | null>(null)
  const [open, setOpen] = useState(false)
  const mutation = useConvertWeight()

  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { value: 100, fromUnit: WeightUnit.Gram, toUnit: WeightUnit.Kilogram },
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
        <FormInput type="number" name="value" Icon={WeightScale02} label="Değer" control={control} placeholder="200" />
        <div className="grid grid-cols-2 gap-3">
          <FormInput type="select" name="fromUnit" label="Birim (Kaynak)" control={control}>
            {UNIT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </FormInput>
          <FormInput type="select" name="toUnit" label="Birim (Hedef)" control={control}>
            {UNIT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </FormInput>
        </div>
        <Button type="submit" className="w-full h-10" disabled={mutation.isPending}>
          {mutation.isPending ? "Dönüştürülüyor..." : "Dönüştür"}
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dönüşüm Sonucu</DialogTitle>
            <DialogDescription>{result?.message}</DialogDescription>
          </DialogHeader>

          {result && (
            <div className="flex items-center justify-between rounded-lg bg-primary/10 border-2 border-primary px-4 py-5">
              <div className="text-sm text-muted-foreground">
                {result.inputValue.toLocaleString("tr-TR")} {WeightUnitLabels[result.fromUnit as WeightUnit]}
              </div>
              <div className="text-2xl font-bold text-primary">
                {result.resultValue.toLocaleString("tr-TR", { maximumFractionDigits: 6 })} {WeightUnitLabels[result.toUnit as WeightUnit]}
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
