"use client"
import { ArrowRight01Sharp, StarCircleFilled } from "asem-icons";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { motion } from "motion/react";
import { MyButton } from "../buttons/MyButton";
import { GlowingChip } from "../utils/GlowingChip";
import { useRouter } from "next/navigation";

export const Content = () => {
  const router = useRouter();
  return (
    <MaxWidthWrapper className="relative z-20 flex flex-col items-center justify-center pb-12 pt-24 md:pb-36 md:pt-36">
      <motion.div
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <GlowingChip Icon={StarCircleFilled}>Altın Yönetiminde Yeni Nesil Çözüm</GlowingChip>
      </motion.div>
      <motion.h1
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.25,
          ease: "easeInOut",
        }}
        className="mb-3 text-center text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-8xl lg:leading-tight"
      >
        Altın Değerini Anında Hesapla ve Yönet
      </motion.h1>
      <motion.p
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.5,
          ease: "easeInOut",
        }}
        className="mb-9 max-w-2xl text-center text-base text-zinc-600 sm:text-lg md:text-xl"
      >
        Canlı altın fiyatları, anlık hesaplama ve profesyonel yönetim araçları ile işletmenizi dijitalleştirin. Tüm cihazlarınızdan güvenle erişin.
      </motion.p>
      <motion.div
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1.25,
          delay: 0.75,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center gap-4 sm:flex-row"
      >
        <MyButton
          onClick={() => router.push("/login")}
          className="flex items-center gap-2"
        >
          Ücretsiz Başla
          <ArrowRight01Sharp />
        </MyButton>
        <MyButton
          ghost
          onClick={() => router.push("/#features")}
        >
          Özellikleri Keşfet
        </MyButton>
      </motion.div>
    </MaxWidthWrapper>
  );
};
