"use client"

import { Check, Smartphone, Monitor, MapPin, Calendar, Clock } from "lucide-react"
import { useGetAllPackages, useGetActivePackage, useInitializeCheckout } from "./_services/queries"
// import { useBuyPackage } from "./_services/mutations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MyCard from "@/components/MyCard"
import { PackageFilled } from "asem-icons"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert } from "@/lib/useGlobalStore"
import { DurationType, DurationTypeLabels } from "@/lib/types"
import { format } from "date-fns"
import { PaymentModal } from "./_components/PaymentModal"
import { useState } from "react"
import { toast } from "sonner"

function PackagesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border-2 p-6 space-y-4">
          <div>
            <Skeleton className="h-7 w-32 mb-2" />
            <div className="flex items-baseline gap-1">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <div className="space-y-3 py-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
          </div>
          <Skeleton className="h-10 w-full rounded" />
        </div>
      ))}
    </div>
  )
}

export default function PackagesPage() {
  const { data: packagesData, isLoading } = useGetAllPackages()
  const { data: activePackage } = useGetActivePackage()
  // const buyPackageMutation = useBuyPackage()
  const initializeCheckout = useInitializeCheckout()
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null)
  const [checkoutFormHtml, setCheckoutFormHtml] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)


  const handlePurchase = async (packageId: number) => {
    setSelectedPackageId(packageId)
    try {
      const response = await initializeCheckout.mutateAsync({
        packageId,
        callbackUrl: `${window.location.origin}/callback`
      })
      if (response.checkoutFormContent) {
        setCheckoutFormHtml(response.checkoutFormContent)
        setShowPaymentModal(true)
      } else {
        toast.error('Ödeme formu alınamadı')
      }
    } finally {
      setSelectedPackageId(null)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Üyelik Paketleri</h1>
        <p className="text-muted-foreground mt-1">
          İşiniz için mükemmel planı seçin
        </p>
      </div>

      {/* Active Package Section */}
      {activePackage && activePackage.packageId && (
        <MyCard title="Aktif Paketiniz" Icon={PackageFilled}>
          <div className="p-6 border rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{activePackage.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Monitor className="w-4 h-4" />
                    <span>{activePackage.maxDeviceCount} cihaza kadar</span>
                  </div>
                  {activePackage.allowMobile && (
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobil erişim aktif</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{activePackage.allowedRadiusKm} km yarıçap izni</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">Aktif</Badge>
            </div>

            {/* Duration Info */}
            <div className="border-t border-white/20 pt-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Toplam Süre</p>
                  <p className="font-semibold">{activePackage.totalDays} gün</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Kalan Süre</p>
                  <p className="font-semibold">{activePackage.remainingDays} gün</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Bitiş Tarihi</p>
                  <p className="font-semibold">
                    {format(new Date(activePackage.endsAt), "dd MMM yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </MyCard>
      )}

      {/* All Packages Section */}
      <MyCard title="Mevcut Paketler" Icon={PackageFilled}>
        {isLoading ? (
          <PackagesSkeleton />
        ) : packagesData && packagesData.packages && packagesData.packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesData.packages.map((pkg) => {
              const isActive = activePackage?.packageId === pkg.packageId

              return (
                <div
                  key={pkg.packageId}
                  className={cn(
                    "relative rounded-xl border-2 p-6 transition-all hover:shadow-lg",
                    isActive
                      ? "border-black dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  {isActive && (
                    <Badge className="absolute top-3 right-4 bg-black text-white">
                      Mevcut Plan
                    </Badge>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">₺{pkg.price}</span>
                        <span className="text-muted-foreground text-sm">
                          /{pkg.durationValue} {DurationTypeLabels[(pkg.durationType + 1) as DurationType]}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 py-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{pkg.maxDeviceCount}</strong> cihaza kadar
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          {pkg.allowMobile ? (
                            <>Mobil erişim <strong>aktif</strong></>
                          ) : (
                            <>Mobil erişim <strong>pasif</strong></>
                          )}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{pkg.allowedRadiusKm} km</strong> yarıçap kapsamı
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{pkg.durationValue} {DurationTypeLabels[pkg.durationType]}</strong> geçerlilik
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={isActive ? "outline" : "default"}
                      disabled={isActive || initializeCheckout.isPending}
                      onClick={() => Alert({
                        AlertTitle: "Paketi Satın Al",
                        AlertDescription: `${pkg.name} paketini ₺${pkg.price}/${pkg.durationValue} ${DurationTypeLabels[pkg.durationType]} fiyatla satın almak istediğinizden emin misiniz? Mevcut paketiniz varsa değiştirilecektir.`,
                        CancelLabel: "Vazgeç",
                        ConfirmLabel: "Satın Al",
                        onConfirm: () => handlePurchase(pkg.packageId)
                      })}
                    >
                      {isActive ? "Mevcut Paket" : "Paketi Satın Al"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Paket bulunamadı
          </div>
        )}
      </MyCard>
      <PaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        checkoutFormHtml={checkoutFormHtml}
      />
    </div>
  )
}
