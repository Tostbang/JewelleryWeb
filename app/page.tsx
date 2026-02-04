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


export default function Home() {
  return (
    <main className={`bg-zinc-950 text-zinc-200 selection:bg-zinc-600 `}>
      <NavBar />
      <Hero />
      <Logos />
      <FeatureGrid />
      <CodeDemo />
      <Carousel />
      <Customers />
      <Stats />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
