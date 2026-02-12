"use client"

import { Check, Smartphone, Monitor, MapPin } from "lucide-react"
import { useGetAllPackages, useGetActivePackage } from "./_services/queries"
import { useBuyPackage } from "./_services/mutations"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MyCard from "@/components/MyCard"
import { PackageFilled } from "asem-icons"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert } from "@/lib/useGlobalStore"

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
  const buyPackageMutation = useBuyPackage()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Membership Packages</h1>
        <p className="text-muted-foreground mt-1">
          Choose the perfect plan for your business
        </p>
      </div>

      {/* Active Package Section */}
      {activePackage && activePackage.packageId && (
        <MyCard title="Your Active Package" Icon={PackageFilled}>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{activePackage.name}</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Monitor className="w-4 h-4" />
                    <span>Up to {activePackage.maxDeviceCount} devices</span>
                  </div>
                  {activePackage.allowMobile && (
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile access enabled</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{activePackage.allowedRadiusKm} km radius allowed</span>
                  </div>
                </div>
              </div>
              <Badge className="bg-green-500 text-white">Active</Badge>
            </div>
          </div>
        </MyCard>
      )}

      {/* All Packages Section */}
      <MyCard title="Available Packages" Icon={PackageFilled}>
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
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                      : "border-gray-200 dark:border-gray-700"
                  )}
                >
                  {isActive && (
                    <Badge className="absolute top-4 right-4 bg-blue-500 text-white">
                      Current Plan
                    </Badge>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold">₹{pkg.price}</span>
                        <span className="text-muted-foreground text-sm">/month</span>
                      </div>
                    </div>

                    <div className="space-y-3 py-4">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          Up to <strong>{pkg.maxDeviceCount}</strong> device{pkg.maxDeviceCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          {pkg.allowMobile ? (
                            <>Mobile access <strong>enabled</strong></>
                          ) : (
                            <>Mobile access <strong>disabled</strong></>
                          )}
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">
                          <strong>{pkg.allowedRadiusKm} km</strong> radius coverage
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={isActive ? "outline" : "default"}
                      disabled={isActive || buyPackageMutation.isPending}
                      onClick={() => Alert({
                        AlertTitle: "Paketi Satın Al",
                        AlertDescription: `${pkg.name} paketini ₺${pkg.price}/ay fiyatla satın almak istediğinizden emin misiniz? Mevcut paketiniz varsa değiştirilecektir.`,
                        CancelLabel: "Vazgeç",
                        ConfirmLabel: "Satın Al",
                        onConfirm: async () => {
                          try {
                            await buyPackageMutation.mutateAsync({ packageId: pkg.packageId })
                          } catch (error) {
                            console.error("Error buying package:", error)
                          }
                        }
                      })}
                    >
                      {isActive ? "Current Package" : "Buy Package"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No packages available
          </div>
        )}
      </MyCard>
    </div>
  )
}
