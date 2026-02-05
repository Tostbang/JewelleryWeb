import { MaxWidthWrapper } from "@/components/utils/MaxWidthWrapper";
import React from "react";
import { CodeCard } from "./CodeCard";
import { Minigrid } from "../../utils/Minigrid";
import { Zap } from "asem-icons";
import { Stepper } from "./Stepper";
import { SectionHeadingSpacing } from "@/components/utils/SectionHeadingSpacing";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { SectionSubheading } from "@/components/utils/SectionSubheading";

export const CodeDemo = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/40 bg-gradient-to-br from-my-blue/10 via-white to-my-orange/10 backdrop-blur-sm">
      <MaxWidthWrapper className="relative z-20 py-20 md:py-36">
        <span className="mx-auto mb-3 block w-fit rounded-xl bg-gradient-to-br from-my-blue/80 via-my-lavender/80 to-my-pink/80 backdrop-blur-md p-3 text-3xl shadow-xl shadow-my-lavender/40 border border-white/40">
          <Zap />
        </span>
        <SectionHeadingSpacing>
          <SectionHeading persistCenter>
            If it's code, show how it works
          </SectionHeading>
          <SectionSubheading persistCenter>
            Show why you're better than your competitors
          </SectionSubheading>
        </SectionHeadingSpacing>
        <CodeCard />
        <Stepper />
      </MaxWidthWrapper>
      <Minigrid />
    </section>
  );
};
