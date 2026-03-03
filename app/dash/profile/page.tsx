"use client"
import { useState } from "react"
import { IrisScanFilled, UserAccount, Mail01Filled, MapPinFilled, UserShield01Filled, LockKeyFilled, Edit02Filled, User02, Setting01Filled, Delete02Filled } from "asem-icons"
import MyCard from "@/components/MyCard"
import { useProfileStore } from "@/lib/store/profile-store"
import { Button } from "@/components/ui/button"
import EditProfileModal from "./components/EditProfileModal"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import ChangePasswordModal from "./components/ChangePasswordModal"
import { Alert } from "@/lib/useGlobalStore"
import { useDeleteAccount } from "./_services/mutations"

export function ProfileSkeleton() {
  return (
    <MyCard title="Kişisel Bilgiler" Icon={UserAccount}>
      <div className="flex">
        <div className="space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20.5 rounded-[30px]" />
            <Skeleton className="h-20.5 rounded-[30px]" />
          </div>
          <Skeleton className="h-20.5 rounded-[30px]" />
          <Skeleton className="h-20.5 rounded-[30px]" />
        </div>
      </div>
    </MyCard>
  )
}

export default function Page() {
  return <ProfilePage />
}

export function ProfilePage() {
  const profile = useProfileStore((state) => state.profile)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false)
  const deleteMutation = useDeleteAccount()

  const handleDeleteAccount = () => {
    Alert({
      AlertTitle: "Hesabı Sil",
      AlertDescription: "Hesabınızı kalıcı olarak silmek istediğinizden emin misiniz?",
      CancelLabel: "Vazgeç",
      ConfirmLabel: "Hesabı Sil",
      onConfirm: () => {
        deleteMutation.mutate()
      }
    })
  }

  return (
    <div className="p-2 md:p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profil Ayarları</h1>
          <p className="text-muted-foreground mt-1">Profil bilgilerinizi görüntüleyin ve düzenleyin</p>
        </div>
        {/* <div className="flex gap-2">
          <Button variant="outline" onClick={() => setResetPasswordModalOpen(true)}>
            <LockKeyFilled className="size-4 mr-2" />
            Şifre Sıfırla
          </Button>
          <Button onClick={() => setEditModalOpen(true)}>
            <Edit02Filled className="size-4 mr-2" />
            Profili Düzenle
          </Button>
        </div> */}
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <MyCard title="Ayarlar" Icon={Setting01Filled} className="w-full md:w-160">
          <div className="">
            <div className="bg-white rounded-full  border  mx-auto size-24 flex justify-center items-center">
              <User02 className="size-14" />
            </div>
          </div>
          <div className="flex flex-col gap-y-2.5 mt-8">
            <Button onClick={() => setResetPasswordModalOpen(true)} className="h-11">
              <LockKeyFilled className="size-4 mr-2" />
              Şifre Değiştir
            </Button>
            <Button onClick={() => setEditModalOpen(true)} className="h-11">
              <Edit02Filled className="size-4 mr-2" />
              Profili Düzenle
            </Button>
            <Button variant={"destructive"} onClick={handleDeleteAccount} className="h-11">
              <Delete02Filled className="size-4 mr-2" />
              Profili Sil
            </Button>
          </div>
        </MyCard>
        {!profile ? (
          <ProfileSkeleton />
        ) : (
          <MyCard title="Kişisel Bilgiler" Icon={UserAccount}>
            <div className="flex">
              <div className="space-y-4 flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 rounded-[30px] squircle">
                    <p className="text-sm text-muted-foreground mb-1">Ad</p>
                    <p className="text-lg font-semibold">{profile.firstName}</p>
                  </div>
                  <div className="p-4 bg-white/50 rounded-[30px] squircle">
                    <p className="text-sm text-muted-foreground mb-1">Soyad</p>
                    <p className="text-lg font-semibold">{profile.lastName}</p>
                  </div>
                </div >
                <div className="p-4 bg-white/50 rounded-[30px] squircle">
                  <p className="text-sm text-muted-foreground mb-1">Email Adresi</p>
                  <p className="text-lg font-semibold break-all">{profile.email}</p>
                </div>
                {
                  (profile.registerLat !== 0 || profile.registerLng !== 0) && (
                    <div className="p-4 bg-white/50 rounded-[30px] squircle">
                      <p className="text-sm text-muted-foreground mb-1">Kayıt Konumu</p>
                      <p className="text-lg font-semibold">
                        <MapPinFilled className="inline size-4 mr-1" />
                        {profile.registerLat?.toFixed(6)}, {profile.registerLng?.toFixed(6)}
                      </p>
                    </div>
                  )
                }
              </div >
            </div >
          </MyCard >
        )
        }


        {/* <MyCard title="Hesap Özeti" Icon={IrisScanFilled}>
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
        </MyCard> */}
      </div >
      {profile &&
        <>
          <EditProfileModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            profile={profile}
          />

          <ChangePasswordModal
            open={resetPasswordModalOpen}
            onOpenChange={setResetPasswordModalOpen}
            email={profile.email}
          />
        </>
      }
    </div >
  )
}
