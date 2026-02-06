"use client"

import { Computer, SmartPhone01, Logout04, ArrowDown01Sharp, TimeQuarterPass } from "asem-icons"
import { cn } from "@/lib/utils"
import MyCard from "@/components/MyCard"
import { useGetSessions, useLogoutSession } from "./_services/query"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function DevicesPage() {
  const { data, isLoading, error } = useGetSessions()
  const logoutMutation = useLogoutSession()

  const handleLogout = (sessionId: number) => {
    logoutMutation.mutate(
      { sessionId },
      {
        onSuccess: () => {
          toast.success("Oturum kapatıldı")
        },
        onError: (error) => {
          toast.error(error.message || "Bir hata oluştu")
        },
      }
    )
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-red-500">Hata: {error.message}</p>
        </div>
      </div>
    )
  }

  const activeSessions = data?.sessions?.filter((s) => s.isActive) || []
  const inactiveSessions = data?.sessions?.filter((s) => !s.isActive) || []

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cihazlarım</h1>
          <p className="text-muted-foreground mt-1">Aktif ve geçmiş oturumlarınız</p>
        </div>
      </div>

      <MyCard title="Aktif Oturumlar" Icon={TimeQuarterPass}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSessions.length === 0 ? (
            <p className="text-muted-foreground col-span-full text-center py-8">
              Aktif oturum bulunamadı
            </p>
          ) : (
            activeSessions.map((session) => {
              const Icon = session.platform === "WEB" ? Computer : SmartPhone01
              const bgColor = session.platform === "WEB" ? "bg-my-blue" : "bg-my-lavender"

              return (
                <div
                  key={session.sessionId}
                  className={cn(
                    "relative overflow-hidden rounded-[60px] squircle border bg-card p-4 transition-all hover:shadow-md hover:scale-[1.02]",
                    bgColor
                  )}
                >
                  <div className="space-y-3">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <div className="p-3 rounded-full bg-white/40">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{session.platform}</p>
                          <p className="text-xs text-black/70">
                            {session.isActive ? "Aktif" : "Pasif"}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 rounded-full bg-white/40">
                        <ArrowDown01Sharp className="size-3" />
                      </div>
                    </div>

                    <div className="space-y-2 px-2">
                      <div>
                        <p className="text-xs text-black/60">IP Adresi</p>
                        <p className="text-sm font-medium">{session.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/60">Oluşturulma</p>
                        <p className="text-sm">
                          {new Date(session.createdDate).toLocaleString("tr-TR")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-black/60">Bitiş</p>
                        <p className="text-sm">
                          {new Date(session.expireAt).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleLogout(session.sessionId)}
                      disabled={logoutMutation.isPending}
                      className="w-full bg-white/40 hover:bg-white/60 text-black"
                      size="sm"
                    >
                      <Logout04 className="size-4 mr-2" />
                      Çıkış Yap
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </MyCard>

      {inactiveSessions.length > 0 && (
        <MyCard title="Geçmiş Oturumlar" Icon={Computer}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inactiveSessions.map((session) => {
              const Icon = session.platform === "WEB" ? Computer : SmartPhone01
              const bgColor = "bg-gray-100"

              return (
                <div
                  key={session.sessionId}
                  className={cn(
                    "relative overflow-hidden rounded-[60px] squircle border bg-card p-4 opacity-60",
                    bgColor
                  )}
                >
                  <div className="space-y-3">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-x-2">
                        <div className="p-3 rounded-full bg-white/40">
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{session.platform}</p>
                          <p className="text-xs text-black/70">Pasif</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 px-2">
                      <div>
                        <p className="text-xs text-black/60">IP Adresi</p>
                        <p className="text-sm font-medium">{session.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black/60">Oluşturulma</p>
                        <p className="text-sm">
                          {new Date(session.createdDate).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </MyCard>
      )}
    </div>
  )
}
