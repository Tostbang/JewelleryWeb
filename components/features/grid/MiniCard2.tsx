import React from "react";
import { Card } from "../../utils/Card";
import { CalloutChip } from "../../utils/CalloutChip";
import { TwitterFilled } from "asem-icons";
import { CornerBlur } from "@/components/utils/CornerBlur";

export const MiniCard2 = () => {
  return (
    <div className="col-span-2 h-[415px] sm:h-[375px] md:col-span-1">
      <Card className="bg-my-pink">
        <CalloutChip>Callout #3</CalloutChip>
        <p className="mb-1.5 text-2xl">Let customers talk for you</p>
        <p className="text-zinc-600 dark:text-zinc-400">
          Someone else saying that they love you is a lot more powerful than
          saying you love yourself.
        </p>

        <div className="absolute -bottom-2 left-2 right-2 z-10 h-44 rounded-xl border border-white/60 dark:border-zinc-700/60 bg-white/30 backdrop-blur-2xl p-4 shadow-xl shadow-my-pink/20 dark:shadow-my-pink/10">
          <div className="mb-3 flex gap-3">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Don"
              alt="Placeholder image for faux user Don Donaldson"
              className="size-10 shrink-0 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-zinc-900">
                Don Donaldson
              </p>
              <p className="text-xs text-zinc-500">@donnydiesel</p>
            </div>
          </div>
          <p>
            <span className="font-semibold text-my-blue">@your_company</span>
            &apos;s automation tools are the best in the industry! Not sure how
            we ever lived without them ❤️
          </p>

          <TwitterFilled className="absolute right-4 top-4 size-5 text-[#1F9AF1]" />
        </div>
        <CornerBlur />
      </Card>
    </div>
  );
};
