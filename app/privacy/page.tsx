import Link from "next/link"
import { NavLogo } from "@/components/navbar/NavLogo"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-my-gradient">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-10 flex flex-col items-center gap-4">
          <NavLogo />
          <h1 className="text-4xl font-bold text-center">Gizlilik Politikası</h1>
          <p className="text-muted-foreground text-sm text-center">Son güncelleme: Şubat 2026</p>
        </div>

        <div className="space-y-8 text-sm leading-7 text-foreground/80">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Toplanan Veriler</h2>
            <p>
              Kayıt sırasında ad, soyad ve e-posta adresi gibi kişisel verilerinizi topluyoruz. Ayrıca platform kullanımınıza ilişkin teknik veriler (IP adresi, tarayıcı bilgisi) otomatik olarak kaydedilebilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Verilerin Kullanımı</h2>
            <p>
              Topladığımız veriler; hizmet sunumu, hesap yönetimi, güvenlik doğrulaması ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır. Verileriniz üçüncü taraflarla satılmaz veya kiralanmaz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Veri Güvenliği</h2>
            <p>
              Verileriniz endüstri standardı şifreleme ve güvenlik protokolleriyle korunmaktadır. Yetkisiz erişimi önlemek için gerekli teknik ve idari önlemler alınmaktadır.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Çerezler</h2>
            <p>
              Platformumuz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz; ancak bu durumda bazı özellikler çalışmayabilir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. Haklarınız</h2>
            <p>
              KVKK kapsamında verilerinize erişme, düzeltme, silme ve işlemeyi kısıtlama haklarına sahipsiniz. Bu hakları kullanmak için bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Üçüncü Taraf Bağlantılar</h2>
            <p>
              Platformumuz üçüncü taraf web sitelerine bağlantılar içerebilir. Bu sitelerin gizlilik uygulamalarından sorumlu değiliz.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Değişiklikler</h2>
            <p>
              Gizlilik politikamız zaman zaman güncellenebilir. Önemli değişiklikler e-posta yoluyla bildirilecektir.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. İletişim</h2>
            <p>
              Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz.
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
