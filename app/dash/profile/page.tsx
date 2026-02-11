"use client"
import { useState } from "react"
import { IrisScanFilled, UserAccount, Mail01Filled, MapPinFilled, UserShield01Filled, LockKeyFilled, Edit02Filled } from "asem-icons"
import MyCard from "@/components/MyCard"
import { useProfileStore } from "@/lib/store/profile-store"
import { Button } from "@/components/ui/button"
import EditProfileModal from "./components/EditProfileModal"
import ResetPasswordModal from "./components/ResetPasswordModal"
import { cn } from "@/lib/utils"

export default function Page() {
  const profile = useProfileStore((state) => state.profile)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)

  if (!profile) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Profil bilgileri yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  const getRoleName = (roleId: number) => {
    switch (roleId) {
      case 0:
        return "Kullanıcı"
      case 1:
        return "Admin"
      default:
        return "Bilinmiyor"
    }
  }

  const profileCards = [
    {
      title: "Kullanıcı ID",
      value: `#${profile.userId}`,
      icon: UserAccount,
      bgColor: "bg-my-orange",
    },
    {
      title: "Email",
      value: profile.email,
      icon: Mail01Filled,
      bgColor: "bg-my-blue",
    },
    {
      title: "Rol",
      value: getRoleName(profile.roleId),
      icon: UserShield01Filled,
      bgColor: "bg-my-lavender",
    },
    {
      title: "Onay Durumu",
      value: profile.isApproved ? "Onaylı" : "Onay Bekliyor",
      icon: IrisScanFilled,
      bgColor: profile.isApproved ? "bg-my-pink" : "bg-gray-300",
    },
  ]

  return (
    <div className="p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profil Ayarları</h1>
          <p className="text-muted-foreground mt-1">Profil bilgilerinizi görüntüleyin ve düzenleyin</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setResetPasswordModalOpen(true)}>
            <LockKeyFilled className="size-4 mr-2" />
            Şifre Sıfırla
          </Button>
          <Button onClick={() => setEditModalOpen(true)}>
            <Edit02Filled className="size-4 mr-2" />
            Profili Düzenle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <MyCard title="Kişisel Bilgiler" Icon={UserAccount}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 rounded-[30px] squircle">
                <p className="text-sm text-muted-foreground mb-1">Ad</p>
                <p className="text-lg font-semibold">{profile.firstName}</p>
              </div>
              <div className="p-4 bg-white/50 rounded-[30px] squircle">
                <p className="text-sm text-muted-foreground mb-1">Soyad</p>
                <p className="text-lg font-semibold">{profile.lastName}</p>
              </div>
            </div>
            <div className="p-4 bg-white/50 rounded-[30px] squircle">
              <p className="text-sm text-muted-foreground mb-1">Email Adresi</p>
              <p className="text-lg font-semibold break-all">{profile.email}</p>
            </div>
            {(profile.registerLat !== 0 || profile.registerLng !== 0) && (
              <div className="p-4 bg-white/50 rounded-[30px] squircle">
                <p className="text-sm text-muted-foreground mb-1">Kayıt Konumu</p>
                <p className="text-lg font-semibold">
                  <MapPinFilled className="inline size-4 mr-1" />
                  {profile.registerLat.toFixed(6)}, {profile.registerLng.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </MyCard>

        <MyCard title="Hesap Özeti" Icon={IrisScanFilled}>
          <div className="grid grid-cols-2 gap-2">
            {profileCards.map((card, index) => {
              const Icon = card.icon
              return (
                <div
                  key={index}
                  className={cn("relative overflow-hidden rounded-[40px] squircle border bg-card p-3 transition-all hover:shadow-md", card.bgColor)}
                >
                  <div className="flex items-center gap-x-2 mb-2">
                    <div className="p-2 rounded-full bg-white/40">
                      <Icon className="size-3.5" />
                    </div>
                    <p className="text-xs font-medium">{card.title}</p>
                  </div>
                  <div className="px-2">
                    <h3 className="text-lg font-bold mt-1">{card.value}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        </MyCard>
      </div>

      <EditProfileModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        profile={profile}
      />

      <ResetPasswordModal
        open={resetPasswordModalOpen}
        onOpenChange={setResetPasswordModalOpen}
        email={profile.email}
      />
    </div>
  )
}
