"use client"
import { CalloutChip } from "../../utils/CalloutChip";
import { Card } from "../../utils/Card";
import { motion } from "motion/react";
import { Calculator01Filled, ChartLineData01, GoldFilled, Coins01Filled } from "asem-icons";
import { useEffect, useState } from "react";
import { CornerBlur } from "@/components/utils/CornerBlur";
import { PulseLine } from "@/components/utils/PulseLine";

export const Tower = () => {
  return (
    <div className="col-span-1 h-[600px] lg:col-span-4 lg:h-[600px]">
      <Card className="bg-my-blue">
        <PulseLine />
        <CalloutChip>Canlı Takip</CalloutChip>
        <p className="mb-2 text-2xl">Anlık Fiyat Güncellemeleri</p>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Canlı altın fiyatlarını takip edin. Karat bazında otomatik hesaplama ile zahmetsiz fiyatlandırma yapın.
        </p>
        <CornerBlur />
        <Mockup />
      </Card>
    </div>
  );
};

const Mockup = () => (
  <div className="absolute -bottom-4 left-6 h-[340px] w-full overflow-hidden rounded-xl border border-black/40 bg-white/40 backdrop-blur-2xl shadow-xl sm:h-[370px]">
    <MockupTopBar />
    <div className="flex h-full w-full">
      <MockupSideBar />
      <MockupMain />
    </div>
  </div>
);

const MockupSideBar = () => (
  <div className="h-full w-30 border-r border-gray-400 backdrop-blur-sm p-2">
    <div className="mb-4 flex items-center justify-between ">
      <GoldFilled className="size-4 text-gray-700" />
      <ChartLineData01 className="size-4 text-gray-700" />
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-1 rounded bg-my-blue/40 dark:bg-my-blue/30 px-1 py-0.5 text-xs text-zinc-800 dark:text-zinc-200">
        <Calculator01Filled className="size-3" />
        Hesapla
      </div>
      <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-400">
        <ChartLineData01 className="size-3" />
        Fiyatlar
      </div>
      <div className="flex items-center gap-1 rounded px-1 py-0.5 text-xs text-zinc-400">
        <Coins01Filled className="size-3" />
        Geçmiş
      </div>
    </div>
  </div>
);

const MockupTopBar = () => (
  <div className="flex gap-1 border-b border-black/40 dark:border-zinc-700/40 p-2">
    <div className="size-2 rounded-full bg-red-600"></div>
    <div className="size-2 rounded-full bg-yellow-600"></div>
    <div className="size-2 rounded-full bg-green-600"></div>
  </div>
);

const MockupMain = () => {
  const [prices, setPrices] = useState([
    { karat: "24 Ayar", price: "6.932,94 ₺" },
    { karat: "22 Ayar", price: "6.527,10 ₺" },
    { karat: "18 Ayar", price: "5.283,76 ₺" },
    { karat: "14 Ayar", price: "4.125,67 ₺" },
    { karat: "10 Ayar", price: "3.187,50 ₺" },
  ]);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setPrices((pv) =>
        pv.map((p) => ({
          ...p,
          price: `${(
            parseFloat(
              p.price
                .replace("₺", "")
                .replace(/\./g, "")
                .replace(",", ".")
            )
            + Math.random() * 20
            - 10
          )
            .toFixed(2)
            .replace(".", ",")
            } ₺`,
        }))
      );
    }, 3000);

    return () => clearInterval(intervalRef);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative z-0 w-full p-4">
        <div className="w-full border-b border-black/40 dark:border-zinc-700 pb-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400 flex justify-between">
          <span>Altın Türleri</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {prices.map((p, i) => (

            <div
              className="relative overflow-hidden rounded-[35px]  squircle border w-full h-full border-white p-1.5 pb-2 bg-white/50 backdrop-blur-3xl"
            >
              <div className=" h-full flex flex-col">
                <div className="w-full flex items-start justify-between ">
                  <div className="flex items-center gap-x-2 mb-4">
                    <div className={` p-1.5 rounded-full bg-black`}>
                      <GoldFilled className={`size-3.5 text-white`} />
                    </div>
                    <p className="text-sm font-medium">{p.karat}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* // actions */}
                  </div>
                </div>
                <motion.span
                  key={p.price}
                  initial={{ scale: 1.1, color: "#3b82f6" }}
                  animate={{ scale: 1, color: "#000000" }}
                  className="font-semibold text-sm pl-1"
                >
                  {p.price}
                </motion.span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-1/4 z-10 " />
    </div>
  );
};
