import React, { ReactNode } from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { SectionHeadingSpacing } from "../utils/SectionHeadingSpacing";
import { SectionHeading } from "../utils/SectionHeading";
import { SectionSubheading } from "../utils/SectionSubheading";
import { Card } from "../utils/Card";
import { RemoveFilled, Tick02 } from "asem-icons";
import { MyButton } from "../buttons/MyButton";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      style={{
        backgroundImage:
          "radial-gradient(100% 100% at 50% 0%, rgba(200,163,237,0.15), rgba(255,255,255,0.95))",
      }}
      className="relative overflow-hidden"
    >
      <MaxWidthWrapper className="relative z-10 mx-auto max-w-5xl py-20 md:py-40">
        <SectionHeadingSpacing>
          <SectionHeading persistCenter>Paketler</SectionHeading>
          <SectionSubheading persistCenter>
            İşletmenizin ihtiyacına uygun paketi seçin. Dilediğiniz zaman değiştirebilirsiniz.
          </SectionSubheading>
        </SectionHeadingSpacing>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PriceCard
            tier="Başlangıç"
            price="₺299/ay"
            bestFor="Küçük işletmeler için"
            CTA={<MyButton ghost className="w-full">Hemen Başla</MyButton>}
            benefits={[
              { text: "1 Cihaz", checked: true },
              { text: "Email destek", checked: true },
              { text: "Temel raporlama", checked: true },
              { text: "Mobil erişim", checked: false },
              { text: "Öncelikli destek", checked: false },
              { text: "API erişimi", checked: false },
            ]}
          />
          <PriceCard
            tier="Profesyonel"
            price="₺799/ay"
            bestFor="Orta ölçekli işletmeler"
            CTA={
              <MyButton ghost className="w-full bg-gradient-to-br from-my-blue to-my-lavender text-white hover:shadow-lg hover:shadow-my-lavender/30 backdrop-blur-sm">
                14 Gün Ücretsiz Dene
              </MyButton>
            }
            benefits={[
              { text: "5 Cihaz", checked: true },
              { text: "Email destek", checked: true },
              { text: "Gelişmiş raporlama", checked: true },
              { text: "Mobil erişim", checked: true },
              { text: "Öncelikli destek", checked: true },
              { text: "API erişimi", checked: false },
            ]}
          />
          <PriceCard
            tier="Kurumsal"
            price="İletişime Geçin"
            bestFor="Büyük işletmeler için"
            CTA={<MyButton ghost className="w-full">Bize Ulaşın</MyButton>}
            benefits={[
              { text: "Sınırsız cihaz", checked: true },
              { text: "7/24 destek", checked: true },
              { text: "Özel raporlama", checked: true },
              { text: "Mobil erişim", checked: true },
              { text: "Öncelikli destek", checked: true },
              { text: "API erişimi", checked: true },
            ]}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const PriceCard = ({
  tier,
  price,
  bestFor,
  CTA,
  benefits,
}: {
  tier: string;
  price: string;
  bestFor: string;
  CTA: ReactNode;
  benefits: BenefitType[];
}) => {
  return (
    <Card>
      <div className="flex flex-col items-center border-b border-my-lavender/20 pb-6 bg-gradient-to-b from-my-blue/5 to-transparent">
        <span className="mb-6 inline-block text-zinc-900 font-semibold">{tier}</span>
        <span className="mb-3 inline-block text-4xl font-medium ">{price}</span>
        <span className="bg-gradient-to-br from-my-blue to-my-lavender bg-clip-text text-center text-transparent">
          {bestFor}
        </span>
      </div>

      <div className="space-y-4 py-9">
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      {CTA}
    </Card>
  );
};

type BenefitType = {
  text: string;
  checked: boolean;
};

const Benefit = ({ text, checked }: BenefitType) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center rounded-full bg-my-blue text-sm text-white">
          <Tick02 />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-200 text-sm text-zinc-500">
          <RemoveFilled />
        </span>
      )}
      <span className="text-sm text-zinc-700">{text}</span>
    </div>
  );
};
