import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, Flame, Shield, ArrowRight } from "lucide-react";
import { EnquiryBanner } from "@/components/storefront/brand-story";

export const metadata: Metadata = {
  title: "Our Metallurgical Craft | Tamraaya",
  description:
    "An editorial study of sacred Indian alloys: Virgin Brass, Pure Copper, Bell Metal Kansa, and the ancient art of Kalai tinning.",
};

export default function CraftPage() {
  const metals = [
    {
      name: "Virgin Brass (Pittal)",
      sanskrit: "पित्तल",
      composition: "60-70% Pure Copper + 30-40% Zinc",
      role: "Slow Cooking, Gravies & Roasting",
      description:
        "Prized for its luminous golden tone and high thermal capacity. Unlike thin aluminum or non-stick teflon, heavy brass absorbs flame uniformly and radiates gentle, ambient heat into curries, stews, and biryanis.",
      imageUrl:
        "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=900&auto=format&fit=crop",
    },
    {
      name: "Pure Copper (Tamra)",
      sanskrit: "ताम्र",
      composition: "99.5%+ Virgin Solid Copper",
      role: "Water Purification & Antimicrobial Vitality",
      description:
        "Venerated in the Charaka Samhita. Storing water overnight in a Tamraaya copper matka allows positive trace copper ions (Oligodynamic effect) to naturally purify water, balancing the body's three doshas.",
      imageUrl:
        "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=900&auto=format&fit=crop",
    },
    {
      name: "Bell Metal Bronze (Kansa)",
      sanskrit: "कांस्य",
      composition: "78% Pure Copper + 22% Pure Tin",
      role: "Ayurvedic Dining & Alkaline Balance",
      description:
        "A resonant, bell-tone alloy. When struck, pure Kansa chimes like a temple gong. Ancient Ayurvedic physicians prescribed dining from bronze plates because it reduces acid levels in food, sharpens memory, and aids digestion.",
      imageUrl:
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=900&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Editorial Header */}
      <section className="py-24 sm:py-32 bg-[#1B0B22] text-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] uppercase tracking-editorial text-[#D8B875] font-semibold block">
            Metallurgical Treatise
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF7F2]">
            The Alchemy of Indian Metalcraft
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#FAF7F2]/80 font-light max-w-2xl mx-auto leading-relaxed">
            In traditional Indian culture, kitchenware is not inert hardware — it is an
            alchemical bridge between natural elements, fire, and human health.
          </p>
        </div>
      </section>

      {/* The 3 Metals Study */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {metals.map((metal, idx) => (
          <div
            key={metal.name}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
              idx % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-editorial text-[#8C6D2B] font-semibold">
                  Alloy {idx + 1}
                </span>
                <span className="text-sm font-serif italic text-[#C9A45C]">
                  {metal.sanskrit}
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B0B22]">
                {metal.name}
              </h2>

              <div className="py-2 space-y-1 text-xs">
                <div className="flex gap-2">
                  <strong className="text-[#1B0B22]">Composition:</strong>
                  <span className="text-[#1D1B1A]/70">{metal.composition}</span>
                </div>
                <div className="flex gap-2">
                  <strong className="text-[#1B0B22]">Primary Application:</strong>
                  <span className="text-[#1D1B1A]/70">{metal.role}</span>
                </div>
              </div>

              <div className="w-12 h-[1px] bg-[#C9A45C]" />

              <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
                {metal.description}
              </p>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden border border-[#C9A45C40] shadow-xl">
              <Image
                src={metal.imageUrl}
                alt={metal.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
      </section>

      {/* Kalai Spotlight */}
      <section className="py-20 bg-[#ECE4D6] border-y border-[#1D1B1A15]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Traditional Food Contact Safety
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B0B22]">
            The Lost Art of Kalai (Tinning)
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-3" />
          <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
            While brass and copper are phenomenal conductors of heat, acidic ingredients
            like tomatoes, tamarind, curd, and lemon react with bare brass. Ancient Indian
            metalsmiths solved this through <strong>Kalai</strong> — applying molten,
            99.9% pure food-grade tin with cotton waste and salammoniac flux over glowing
            charcoal embers. The resulting silver sheen shields food completely while
            preserving the extraordinary heat benefits of the brass core.
          </p>
        </div>
      </section>

      <EnquiryBanner />
    </div>
  );
}
