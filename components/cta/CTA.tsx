"use client"
import React from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { MyButton } from "../buttons/MyButton";
import { ArrowRight01Sharp } from "asem-icons";
import { motion } from "motion/react";
import { GlowingChip } from "../utils/GlowingChip";
import { useRouter } from "next/navigation";

export const CTA = () => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden border-t border-white/40 py-20 md:mx-40 rounded-4xl squircle ">
      <MaxWidthWrapper className="relative z-20 flex flex-col items-center justify-center">
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
          className="relative mb-3"
        >
          <GlowingChip>Sınırsız İmkanlar 🚀</GlowingChip>
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
          className="mb-9 max-w-xl text-center text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
        >
          İşletmenizi Dijitalleştirin
        </motion.h1>
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
            Ücretsiz Dene
            <ArrowRight01Sharp />
          </MyButton>
          <MyButton
            ghost
            onClick={() => router.push("/#features")}
            className="rounded-full px-7 py-2  text-zinc-900"
          >
            Daha Fazla Bilgi
          </MyButton>
        </motion.div>
      </MaxWidthWrapper>
      {/* <div className="absolute inset-0 z-0 bg-grid text-my-lavender/30 opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-my-pink/5 to-white backdrop-blur-sm" /> */}
    </section>
  );
};
