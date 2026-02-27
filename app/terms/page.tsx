import Link from "next/link"
import { NavLogo } from "@/components/navbar/NavLogo"
import Carousel from "@/components/features/carousel/Carousel"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-my-gradient">
      <Carousel />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10 flex flex-col items-center gap-4">
          <NavLogo />
          <h1 className="text-4xl font-bold text-center">Şartlar ve Koşullar</h1>
          <p className="text-muted-foreground text-sm text-center">Son güncelleme: Şubat 2026</p>
        </div>

        <div className="space-y-8 text-sm leading-7 text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Genel</h2>
            <p>
              Bu platformu kullanarak aşağıdaki şartlar ve koşulları kabul etmiş olursunuz. Lütfen bu belgeyi dikkatlice okuyunuz. Hizmetlerimizi kullanmaya devam etmeniz, bu şartları kabul ettiğiniz anlamına gelir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Hizmet Kullanımı</h2>
            <p>
              Platformumuz yalnızca yasal amaçlarla kullanılabilir. Kullanıcılar, platformu kötüye kullanmamayı, üçüncü şahıslara zarar vermemeyi ve yürürlükteki tüm yasal düzenlemelere uymayı kabul eder.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Hesap Güvenliği</h2>
            <p>
              Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle paylaşmayınız ve yetkisiz erişim durumunda derhal bizimle iletişime geçiniz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Fikri Mülkiyet</h2>
            <p>
              Platformdaki tüm içerik, logo, tasarım ve yazılımlar şirketimize aittir. İzin almadan kopyalanamaz, dağıtılamaz veya ticari amaçlarla kullanılamaz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Sorumluluk Sınırlaması</h2>
            <p>
              Platformumuz "olduğu gibi" sunulmaktadır. Hizmet kesintileri, veri kayıpları veya üçüncü taraf içeriklerinden kaynaklanan zararlar için sorumluluk kabul etmiyoruz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Değişiklikler</h2>
            <p>
              Bu şartlar önceden haber vermeksizin değiştirilebilir. Güncel şartlar her zaman bu sayfada yayınlanacaktır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. İletişim</h2>
            <p>
              Şartlar ve koşullarla ilgili sorularınız için bizimle iletişime geçebilirsiniz.
            </p>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-my-blue hover:underline">
            ← Ana sayfaya dön
          </Link>
        </div>
      </div>
    </main>
  )
}
