import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Sparkles } from "lucide-react";
import { CraftsmanshipValues, EnquiryBanner } from "@/components/storefront/brand-story";

export const metadata: Metadata = {
  title: "Artisan Lineage & Heritage | Tamraaya",
  description:
    "Discover the living history of Tamraaya and the seventh-generation Thathera metalcraft masters preserving India's royal metallurgical arts.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Editorial Hero */}
      <section className="relative py-24 sm:py-32 bg-[#1B0B22] text-[#FAF7F2] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-[11px] uppercase tracking-editorial text-[#D8B875] font-semibold block">
            Our Ancestral Lineage
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF7F2] leading-tight">
            The Living Flame of <br className="hidden sm:inline" />
            Indian Metallurgy
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#FAF7F2]/80 font-light leading-relaxed max-w-2xl mx-auto">
            Tamraaya was born from a singular obsession: to resurrect the soul of
            authentic Indian culinary metalware in an age of disposable, stamped convenience.
          </p>
        </div>
      </section>

      {/* Main Narrative with Photography */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
              The Thathera Tradition
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B0B22]">
              Hands that Remember What Machines Have Forgotten
            </h2>
            <div className="w-12 h-[1px] bg-[#C9A45C]" />
            <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
              In historic metalcraft settlements across Punjab, Rajasthan, and Uttar Pradesh,
              the rhythmic striking of hammer on anvil is not just work — it is a generational cadence.
              Our craftspeople descend from royal guild lineages who hammered banquet vessels for
              maharajas and emperors.
            </p>
            <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
              Every curve, dimple, and contour in a Tamraaya handi or kansa thali is shaped by human
              eye and muscle memory. By striking virgin metal thousands of times, the metal&apos;s
              crystalline grain becomes denser, creating exceptional heat retention and durability
              that factory pressing can never replicate.
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#C9A45C40] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan hammering metal"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Four Tenets Component */}
      <CraftsmanshipValues />

      {/* Bespoke Banner */}
      <EnquiryBanner />
    </div>
  );
}
