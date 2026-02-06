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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCalculateLaborCost, LaborCostResponse } from "../_services/mutations"
import { SelectItem } from "@/components/ui/select"

const formSchema = z.object({
  karat: z.string({
    message: "Karat is required",
  }).min(1, "Karat must be at least 1"),
  cost: z.string({
    message: "Cost is required",
  }).min(1, "Cost must be greater than 0"),
})

type FormValues = z.infer<typeof formSchema>

export default function PriceCalculatorForm() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<LaborCostResponse | null>(null)

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      karat: "14",
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            type="text"
            name="cost"
            label="Cost"
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
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Calculating..." : "Calculate Price"}
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calculation Result</DialogTitle>
            <DialogDescription>
              {result?.message}
            </DialogDescription>
          </DialogHeader>
          {result && (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="font-medium">Labor Cost:</span>
                <span className="text-lg font-bold">₹{result.laborCost}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted rounded-md">
                <span className="font-medium">Total Cost:</span>
                <span className="text-lg font-bold">₹{result.totalCost}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
