import { IconType } from "@/lib/types";
import { Calendar01, Cloud, Dollar02, Moon02, Tick02, Watch01, GoldFilled, KnightShieldFilled, ChartLineData02, SmartPhone01 } from "asem-icons";

export const SimpleGrid = () => (
  <div className="relative z-10 bg-white grid grid-cols-2 gap-9 px-3 md:grid-cols-3 md:gap-12 md:px-6">
    <Item
      Icon={GoldFilled}
      title="Canlı Altın Fiyatları"
      subtitle="Güncel altın fiyatlarını anında görüntüleyin ve hesaplayın."
    />
    <Item
      Icon={Watch01}
      title="Zamandan Tasarruf"
      subtitle="Otomatik hesaplama ile manuel işlemleri ortadan kaldırın."
    />
    <Item
      Icon={KnightShieldFilled}
      title="Güvenli Altyapı"
      subtitle="Verileriniz şifreli ve güvenli sunucularda korunur."
    />
    <Item
      Icon={Dollar02}
      title="Maliyet Tasarrufu"
      subtitle="Hataları minimize edin, kayıpları önleyin."
    />
    <Item
      Icon={SmartPhone01}
      title="Mobil Uyumlu"
      subtitle="Telefondan, tabletten, bilgisayardan erişim imkanı."
    />
    <Item
      Icon={ChartLineData02}
      title="Detaylı Raporlar"
      subtitle="Tüm işlemlerinizi takip edin, analiz edin."
    />
  </div>
);

const Item = ({
  Icon,
  title,
  subtitle,
}: {
  Icon: IconType;
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <h4 className="mb-1.5 flex items-start text-lg font-medium md:text-xl">
        <Icon className="mr-1.5 size-8 text-black" />
        {title}
      </h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 md:text-base">{subtitle}</p>
    </div>
  );
};
