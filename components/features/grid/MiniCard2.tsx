import React from "react";
import { Card } from "../../utils/Card";
import { CalloutChip } from "../../utils/CalloutChip";
import { TwitterFilled } from "asem-icons";
import { CornerBlur } from "@/components/utils/CornerBlur";

export const MiniCard2 = () => {
  return (
    <div className="col-span-2 h-[415px] sm:h-[375px] md:col-span-1">
      <Card className="bg-my-pink">
        <CalloutChip>Güvenilir 🛡️</CalloutChip>
        <p className="mb-1.5 text-2xl">Müşterilerimiz Konuşuyor</p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Kuyumcular ve altın işletmeleri için özel olarak tasarlandı.
        </p>

        <div className="absolute -bottom-2 left-2 right-2 z-10 h-44 rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/30 backdrop-blur-2xl p-4 shadow-xl shadow-my-pink/20 dark:shadow-my-pink/10">
          <div className="mb-3 flex gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmet"
              alt="Kullanıcı profil resmi"
              className="size-10 shrink-0 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Ahmet Yılmaz
              </p>
              <p className="text-xs text-zinc-500">Kuyumcu Sahibi</p>
            </div>
          </div>
          <p>
            Altın fiyatlarını anında hesaplayabiliyorum. İşlemlerim çok hızlandı, müşterilerime daha hızlı hizmet veriyorum 💎
          </p>

          <TwitterFilled className="absolute right-4 top-4 size-5 text-[#1F9AF1]" />
        </div>
        <CornerBlur />
      </Card>
    </div>
  );
};
