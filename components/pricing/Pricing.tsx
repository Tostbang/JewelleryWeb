"use client"

import React, { ReactNode } from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { SectionHeadingSpacing } from "../utils/SectionHeadingSpacing";
import { SectionHeading } from "../utils/SectionHeading";
import { SectionSubheading } from "../utils/SectionSubheading";
import { Card } from "../utils/Card";
import { RemoveFilled, Tick02 } from "asem-icons";
import { MyButton } from "../buttons/MyButton";
import { useGetAllPackages } from "@/app/dash/packages/_services/queries";
import { DurationType, DurationTypeLabels } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

function PricingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-6 space-y-4 bg-white/50">
          <div className="flex flex-col items-center gap-3 border-b pb-6">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-4 w-44" />
          </div>
          <div className="space-y-4 py-4">
            {Array.from({ length: 4 }).map((_, j) => (
              <Skeleton key={j} className="h-5 w-full" />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export const Pricing = () => {
  const { data: packagesData, isLoading } = useGetAllPackages();

  return (
    <section id="pricing" className="relative overflow-hidden bg-my-gradient">
      <MaxWidthWrapper className="relative z-10 mx-auto max-w-5xl py-20 md:py-40">
        <SectionHeadingSpacing>
          <SectionHeading persistCenter>Paketler</SectionHeading>
          <SectionSubheading persistCenter>
            İşletmenizin ihtiyacına uygun paketi seçin. Dilediğiniz zaman değiştirebilirsiniz.
          </SectionSubheading>
        </SectionHeadingSpacing>

        {isLoading ? (
          <PricingSkeleton />
        ) : packagesData?.packages && packagesData.packages.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {packagesData.packages.map((pkg, i) => {
              const durationLabel = DurationTypeLabels[pkg.durationType + 1 as DurationType];
              const price = `₺${pkg.price}/${pkg.durationValue} ${durationLabel}`;

              const benefits: BenefitType[] = [
                { text: `${pkg.maxDeviceCount} Cihaz`, checked: true },
                { text: "Email destek", checked: true },
                { text: "Mobil erişim", checked: pkg.allowMobile },
                { text: `${pkg.allowedRadiusKm} km yarıçap kapsamı`, checked: true },
                { text: `${pkg.durationValue} ${durationLabel} geçerlilik`, checked: true },
              ];

              return (
                <PriceCard
                  key={pkg.packageId}
                  tier={pkg.name}
                  price={price}
                  bestFor={`${pkg.maxDeviceCount} cihaza kadar`}
                  CTA={
                    <MyButton ghost className={`w-full ${i === 1 && "bg-black text-white"}`} asChild>
                      <Link href="/login">Hemen Başla</Link>
                    </MyButton>
                  }
                  benefits={benefits}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PriceCard
              tier="Başlangıç"
              price="₺299/ay"
              bestFor="Küçük işletmeler için"
              CTA={
                <MyButton ghost className="w-full" asChild>
                  <Link href="/login">Hemen Başla</Link>
                </MyButton>
              }
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
                <MyButton ghost className="w-full bg-black text-white hover:shadow-lg hover:shadow-my-lavender/30 backdrop-blur-sm" asChild>
                  <Link href="/login">14 Gün Ücretsiz Dene</Link>
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
              price="₺1299/ay"
              bestFor="Büyük işletmeler için"
              CTA={
                <MyButton ghost className="w-full" asChild>
                  <Link href="/login">Bize Ulaşın</Link>
                </MyButton>
              }
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
        )}
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
    <Card className="flex flex-col ">
      <div className="flex flex-col items-center border-b pb-6">
        <span className="mb-6 inline-block text-zinc-900 font-semibold">{tier}</span>
        <span className="mb-3 inline-block text-4xl font-medium">{price}</span>
        {/* <span className="text-center">{bestFor}</span> */}
      </div>

      <div className="space-y-4 py-9">
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      <div className="self-end w-full">
        {CTA}
      </div>
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
        <span className="grid size-5 place-content-center rounded-full bg-black text-sm text-white">
          <Tick02 className="size-4.5" />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-200 text-sm text-zinc-500">
          <RemoveFilled className="size-4.5" />
        </span>
      )}
      <span className="text-sm text-zinc-700">{text}</span>
    </div>
  );
};
