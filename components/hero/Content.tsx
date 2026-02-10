"use client"
import { ArrowRight01Sharp } from "asem-icons";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { motion } from "motion/react";
import { MyButton } from "../buttons/SplashButton";
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
        <GlowingChip>Exciting announcement 🎉</GlowingChip>
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
        A landing page template that works for you
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
        Build beautiful landing pages for your startups, clients, and side
        projects, without having to think about design.
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
          Try it free
          <ArrowRight01Sharp />
        </MyButton>
        <MyButton
          ghost
          onClick={() => router.push("/#features")}
          className="rounded-md px-4 py-2 text-lg text-zinc-900"
        >
          Learn more
        </MyButton>
      </motion.div>
    </MaxWidthWrapper>
  );
};
