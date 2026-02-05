"use client"
import { useEffect, useState } from "react";
import { CalloutChip } from "../../utils/CalloutChip";
import { Card } from "../../utils/Card";
import { animations, motion } from "motion/react";
import auth0 from "@/public/logos/auth0.svg"
import buildkite from "@/public/logos/buildkite.svg"
import github from "@/public/logos/github.svg"
import planetscale from "@/public/logos/planetscale.svg"
import react from "@/public/logos/react.svg"
import supabase from "@/public/logos/supabase.svg"
import twilio from "@/public/logos/twinmotion.svg"
import zapier from "@/public/logos/zapier.svg"
import Image from "next/image";


export const LongCard = () => {
  return (
    <div className="col-span-2 h-fit sm:h-[209px]">
      <Card>
        <div className="relative z-20">
          <CalloutChip>Callout #4</CalloutChip>
          <p className="mb-1.5 text-2xl">Talk about integrations</p>
          <p className="max-w-sm text-zinc-600">
            If you connect with tools that people already know and use, show it
            off!
          </p>
        </div>
        <div className="absolute bottom-0 right-0 top-0 z-10 w-48 bg-gradient-to-r from-white/0 to-white" />
        <SpinningLogos />
      </Card>
    </div>
  );
};

const SpinningLogos = () => {
  const { width } = useWindowSize();

  const [sizes, setSizes] = useState({
    radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
    iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
    ringPadding: RING_PADDING.lg,
    logoFontSize: LOGO_FONT_SIZE.lg,
  });

  useEffect(() => {
    if (!width) return;

    if (width < BREAKPOINTS.sm) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.sm,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.sm,
        ringPadding: RING_PADDING.sm,
        logoFontSize: LOGO_FONT_SIZE.sm,
      });
    } else if (width < BREAKPOINTS.md) {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.md,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.md,
        ringPadding: RING_PADDING.md,
        logoFontSize: LOGO_FONT_SIZE.md,
      });
    } else {
      setSizes({
        radiusToCenterOfIcons: RADIUS_TO_CENTER_OF_ICONS.lg,
        iconWrapperWidth: ICON_WRAPPER_WIDTH.lg,
        ringPadding: RING_PADDING.lg,
        logoFontSize: LOGO_FONT_SIZE.lg,
      });
    }
  }, [width]);

  return (
    <div
      style={{
        width:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
        height:
          sizes.radiusToCenterOfIcons +
          sizes.iconWrapperWidth +
          sizes.ringPadding,
      }}
      className="absolute right-0 top-0 z-0 grid translate-x-1/3 place-content-center rounded-full bg-gradient-to-br from-my-blue/30 via-my-lavender/20 to-my-pink/30 backdrop-blur-md shadow-inner shadow-my-lavender/20"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={TRANSITION}
        style={{
          width:
            sizes.radiusToCenterOfIcons -
            sizes.iconWrapperWidth -
            sizes.ringPadding,
          height:
            sizes.radiusToCenterOfIcons -
            sizes.iconWrapperWidth -
            sizes.ringPadding,
        }}
        className="relative grid place-items-center rounded-full shadow"
      >
        {ICON_DATA.map((icon, idx) => {
          const degrees = (360 / ICON_DATA.length) * idx;
          return (
            <motion.div
              key={idx}
              style={{
                marginTop:
                  sizes.radiusToCenterOfIcons *
                  Math.sin(degreesToRadians(degrees)),
                marginLeft:
                  sizes.radiusToCenterOfIcons *
                  Math.cos(degreesToRadians(degrees)),
                width: sizes.iconWrapperWidth,
                height: sizes.iconWrapperWidth,
              }}
              initial={{ rotate: 0 }}
              animate={{ rotate: -360 }}
              transition={TRANSITION}
              className="absolute grid place-content-center rounded-full bg-gradient-to-br from-my-blue via-my-lavender to-my-pink text-white shadow-lg shadow-my-lavender/40 backdrop-blur-sm border border-white/40"
            >
              <Image style={{
                fontSize: sizes.logoFontSize,
              }} src={icon.Icon} alt={`logo-${idx}`} width={100} height={100} />
              {/* <icon.Icon
                style={{
                  fontSize: sizes.logoFontSize,
                }}
              /> */}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

interface Size {
  width: number | undefined;
  height: number | undefined;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const degreesToRadians = (degrees: number) => {
  return degrees * (Math.PI / 180);
};

const ICON_DATA = [
  {
    Icon: github,
  },
  {
    Icon: twilio,
  },
  {
    Icon: react,
  },
  {
    Icon: zapier,
  },
  {
    Icon: auth0,
  },
  {
    Icon: planetscale,
  },
  {
    Icon: supabase,
  },
  {
    Icon: buildkite,
  },
];

// Defines the distance from the center of the circle to the center
// of the icons
const RADIUS_TO_CENTER_OF_ICONS = {
  sm: 150,
  md: 225,
  lg: 325,
};
// Defines the width of the icon circles
const ICON_WRAPPER_WIDTH = {
  sm: 40,
  md: 65,
  lg: 80,
};
// Defines the padding between the icon circles and the inner and outer rings
const RING_PADDING = {
  sm: 8,
  md: 12,
  lg: 24,
};
// Defines the font size for logos
const LOGO_FONT_SIZE = {
  sm: 18,
  md: 24,
  lg: 36,
};

const BREAKPOINTS = {
  sm: 480,
  md: 768,
};

const TRANSITION = {
  repeat: Infinity,
  repeatType: "loop",
  duration: 50,
  ease: "linear",
};
