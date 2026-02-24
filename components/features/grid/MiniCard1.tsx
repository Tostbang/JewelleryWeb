import React from "react";
import { Card } from "../../utils/Card";
import { CalloutChip } from "../../utils/CalloutChip";
import { motion } from "motion/react";
import { LaptopPhoneSync1Filled } from "asem-icons";
import { BubbleButton } from "@/components/buttons/BubbleButton";

export const MiniCard1 = () => {
  return (
    <div className="col-span-2 h-[375px] md:col-span-1">
      <Card className="bg-my-lavender dark:bg-my-lavender/20">
        <div className="mx-auto w-fit">
          <CalloutChip>Çoklu Cihaz</CalloutChip>
        </div>
        <p className="mb-1.5 text-center text-2xl">Her Cihazdan Erişim</p>
        <p className="mb-6 text-center text-zinc-600 dark:text-zinc-400">Telefon, tablet veya bilgisayardan kolayca bağlanın.</p>
        <BubbleButton className="mx-auto">Hemen Dene</BubbleButton>
        <Ping />
      </Card>
    </div>
  );
};

const LOOP_DURATION = 6;

const Ping = () => {
  return (
    <div className="absolute bottom-2 left-1/2 w-fit -translate-x-1/2 translate-y-1/2">
      <LaptopPhoneSync1Filled className="relative z-10 size-20 text-black drop-shadow-lg" />
      <Band delay={0} />
      <Band delay={LOOP_DURATION * 0.25} />
      <Band delay={LOOP_DURATION * 0.5} />
      <Band delay={LOOP_DURATION * 0.75} />
    </div>
  );
};

const Band = ({ delay }: { delay: number }) => {
  return (
    <motion.span
      style={{
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{
        opacity: 0,
        scale: 0.25,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: 1,
      }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        times: [0, 0.5, 0.75, 1],
        duration: LOOP_DURATION,
        ease: "linear",
        delay,
      }}
      className="absolute left-[50%] top-[50%] z-0 size-80 rounded-full border-2 border-white/30 bg-white/15  backdrop-blur-sm shadow-xl shadow-my-lavender/30"
    />
  );
};
