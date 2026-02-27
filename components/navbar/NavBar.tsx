"use client"
import React, { useState } from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { NavLogo } from "./NavLogo";
import { NavLinks } from "./NavLinks";
import { NavCTAs } from "./NavCTAs";
import { useMotionValueEvent, useScroll, motion } from "motion/react";

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: "-100%",
      }}
      animate={{
        opacity: 1,
        y: "0%",
      }}
      transition={{
        duration: 1.25,
        ease: "easeInOut",
      }}
      className={`fixed py-2 left-0 right-0 top-0 z-50 bg-white/0 transition-colors ${scrolled && "bg-white/70 backdrop-blur-2xl border-b border-white shadow-lg shadow-my-blue/5"}`}
    >
      <MaxWidthWrapper>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-12 ">
            <NavLogo />
            <div className="hidden md:block">
              <NavLinks />
            </div>
          </div>
          <NavCTAs />
        </div>
        <div className="block pt-1.5 md:hidden">
          <NavLinks />
        </div>
      </MaxWidthWrapper>
    </motion.nav>
  );
};
