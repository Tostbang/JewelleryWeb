"use client"
import { CTA } from "@/components/cta/CTA";
import { Customers } from "@/components/customers/Customers";
import Carousel from "@/components/features/carousel/Carousel";
import { CodeDemo } from "@/components/features/code/CodeDemo";
import { FeatureGrid } from "@/components/features/grid/FeatureGrid";
import { Stats } from "@/components/features/stats/Stats";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { Logos } from "@/components/logos/Logos";
import { NavBar } from "@/components/navbar/NavBar";
import { Pricing } from "@/components/pricing/Pricing";
import { SupportForm } from "@/components/support/SupportForm";


export default function Page() {
  return (
    <main>
      {/* test */}
      <NavBar />
      <Hero />
      <Logos />
      <FeatureGrid />
      {/* <CodeDemo /> */}
      <Carousel />
      <Customers />
      <Stats />
      <Pricing />
      <CTA />
      <section className="py-20 px-6 bg-gradient-to-b from-white to-my-blue/5">
        <SupportForm />
      </section>
      <Footer />
    </main>
  );
}
