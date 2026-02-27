"use client"
import React, { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { CornerBlur } from "@/components/utils/CornerBlur";

export const Stats = () => {
  return (
    <div className="relative overflow-hidden border-y text-black border-white/40 ">
      <div className="relative z-20 mx-auto max-w-3xl px-4 py-12">
        <h2 className="mx-auto mb-9 block w-fit  text-center text-lg ">
          Rakamlar Konuşuyor
        </h2>

        <div className="flex flex-col items-center justify-center sm:flex-row">
          <Stat
            num={99}
            suffix="%"
            subheading="Müşteri Memnuniyeti"
          />
          <div className="h-[1px] w-12 bg-my-orange/30 sm:h-12 sm:w-[1px]" />
          <Stat
            num={5}
            decimals={0}
            suffix="K+"
            subheading="Aktif Kullanıcı"
          />
          <div className="h-[1px] w-12 bg-my-orange/30 sm:h-12 sm:w-[1px]" />
          <Stat
            num={50}
            suffix="M+"
            subheading="Hesaplanan İşlem"
          />
        </div>
      </div>

      <CornerBlur />
    </div>
  );
};

interface Props {
  num: number;
  suffix: string;
  decimals?: number;
  subheading: string;
}

const Stat = ({ num, suffix, decimals = 0, subheading }: Props) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    animate(0, num, {
      duration: 2.5,
      onUpdate(value) {
        if (!ref.current) return;

        ref.current.textContent = value.toFixed(decimals);
      },
    });
  }, [num, decimals, isInView]);

  return (
    <div className="flex w-72 flex-col items-center py-8 sm:py-0">
      <p className="mb-2 text-center text-7xl font-semibold text-zinc-900 sm:text-6xl">
        <span ref={ref}></span>
        <span className="text-my-orange">{suffix}</span>
      </p>
      <p className="max-w-48 text-center text-zinc-500">{subheading}</p>
    </div>
  );
};
