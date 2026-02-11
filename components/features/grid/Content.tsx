import { MaxWidthWrapper } from "@/components/utils/MaxWidthWrapper";
import React from "react";
import { Tower } from "./Tower";
import { MiniCard1 } from "./MiniCard1";
import { MiniCard2 } from "./MiniCard2";
import { LongCard } from "./LongCard";
import { SimpleGrid } from "./SimpleGrid";
import { SectionHeading } from "@/components/utils/SectionHeading";
import { SectionSubheading } from "@/components/utils/SectionSubheading";
import { SectionHeadingSpacing } from "@/components/utils/SectionHeadingSpacing";

export const Content = () => (
  <>
    <section className="">
      <MaxWidthWrapper className="relative z-20 pb-20 pt-20 md:pb-28 md:pt-40">
        <div className="bg-[#f0ece8] p-8 rounded-2xl">
          <SectionHeadingSpacing>
            <SectionHeading>
              Show the people
              <br />
              <span className="bg-gradient-to-br from-my-blue to-my-lavender bg-clip-text text-transparent">
                what makes you great
              </span>
            </SectionHeading>
            <SectionSubheading>
              Here's a good way to show some high levels pros as to what your
              product does and for who.
            </SectionSubheading>
          </SectionHeadingSpacing>

          <Grid />
        </div>
      </MaxWidthWrapper>
    </section>
    <MaxWidthWrapper>
      <div className="h-[1px] w-full bg-gradient-to-r from-my-blue/0 via-my-lavender/50 dark:via-my-lavender/30 to-my-blue/0 md:mb-20 md:mt-8" />
      <SimpleGrid />
    </MaxWidthWrapper>
  </>
);

const Grid = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 ">
    <Tower />
    <div className="col-span-1 grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-2">
      <MiniCard1 />
      <MiniCard2 />
      <LongCard />
    </div>
  </div>
);
