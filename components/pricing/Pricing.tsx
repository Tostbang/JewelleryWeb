import React, { ReactNode } from "react";
import { MaxWidthWrapper } from "../utils/MaxWidthWrapper";
import { SectionHeadingSpacing } from "../utils/SectionHeadingSpacing";
import { SectionHeading } from "../utils/SectionHeading";
import { SectionSubheading } from "../utils/SectionSubheading";
import { Card } from "../utils/Card";
import { GhostButton } from "../buttons/GhostButton";
import { RemoveFilled, Tick02 } from "asem-icons";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      style={{
        backgroundImage:
          "radial-gradient(100% 100% at 50% 0%, rgba(200,163,237,0.15), rgba(255,255,255,0.95))",
      }}
      className="relative overflow-hidden"
    >
      <MaxWidthWrapper className="relative z-10 mx-auto max-w-5xl py-20 md:py-40">
        <SectionHeadingSpacing>
          <SectionHeading persistCenter>Pricing</SectionHeading>
          <SectionSubheading persistCenter>
            Use it for free for yourself, upgrade when your team needs advanced
            control.
          </SectionSubheading>
        </SectionHeadingSpacing>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <PriceCard
            tier="Free"
            price="$0/mo"
            bestFor="Best for 1-5 users"
            CTA={<GhostButton className="w-full">Get started free</GhostButton>}
            benefits={[
              { text: "One workspace", checked: true },
              { text: "Email support", checked: true },
              { text: "1 day data retention", checked: false },
              { text: "Custom roles", checked: false },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PriceCard
            tier="Pro"
            price="$79/mo"
            bestFor="Best for 5-50 users"
            CTA={
              <GhostButton className="w-full bg-gradient-to-br from-my-blue to-my-lavender text-white hover:shadow-lg hover:shadow-my-lavender/30 backdrop-blur-sm">
                14-day free trial
              </GhostButton>
            }
            benefits={[
              { text: "Five workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "7 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: false },
              { text: "SSO", checked: false },
            ]}
          />
          <PriceCard
            tier="Enterprise"
            price="Contact us"
            bestFor="Best for 50+ users"
            CTA={<GhostButton className="w-full">Contact us</GhostButton>}
            benefits={[
              { text: "Unlimited workspaces", checked: true },
              { text: "Email support", checked: true },
              { text: "30 day data retention", checked: true },
              { text: "Custom roles", checked: true },
              { text: "Priority support", checked: true },
              { text: "SSO", checked: true },
            ]}
          />
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

const PriceCard = ({
  tier,
  price,
  bestFor,
  CTA,
  benefits,
}: {
  tier: string;
  price: string;
  bestFor: string;
  CTA: ReactNode;
  benefits: BenefitType[];
}) => {
  return (
    <Card>
      <div className="flex flex-col items-center border-b border-my-lavender/20 pb-6 bg-gradient-to-b from-my-blue/5 to-transparent">
        <span className="mb-6 inline-block text-zinc-900 font-semibold">{tier}</span>
        <span className="mb-3 inline-block text-4xl font-medium ">{price}</span>
        <span className="bg-gradient-to-br from-my-blue to-my-lavender bg-clip-text text-center text-transparent">
          {bestFor}
        </span>
      </div>

      <div className="space-y-4 py-9">
        {benefits.map((b, i) => (
          <Benefit {...b} key={i} />
        ))}
      </div>

      {CTA}
    </Card>
  );
};

type BenefitType = {
  text: string;
  checked: boolean;
};

const Benefit = ({ text, checked }: BenefitType) => {
  return (
    <div className="flex items-center gap-3">
      {checked ? (
        <span className="grid size-5 place-content-center rounded-full bg-my-blue text-sm text-white">
          <Tick02 />
        </span>
      ) : (
        <span className="grid size-5 place-content-center rounded-full bg-zinc-200 text-sm text-zinc-500">
          <RemoveFilled />
        </span>
      )}
      <span className="text-sm text-zinc-700">{text}</span>
    </div>
  );
};
