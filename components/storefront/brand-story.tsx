import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, HeartHandshake, Sparkles, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export function BrandStory() {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF7F2] border-y border-[#1D1B1A15] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Atmospheric Photography */}
          <div className="relative">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden border border-[#C9A45C40] shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
                alt="Tamraaya master craftsman shaping metal on an anvil"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#1B0B22]/15" />
            </div>

            {/* Inset Badge / Accent */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:-right-8 bg-[#1B0B22] text-[#FAF7F2] p-6 border border-[#C9A45C] max-w-xs shadow-2xl hidden sm:block">
              <span className="text-[10px] uppercase tracking-editorial text-[#D8B875] font-semibold block mb-1">
                Seventh Generation
              </span>
              <p className="font-serif text-lg text-[#FAF7F2] italic">
                &ldquo;Every dimple is struck with intent, not haste.&rdquo;
              </p>
            </div>
          </div>

          {/* Right: Editorial Narrative */}
          <div className="space-y-6 lg:pl-6">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
                The Artisan Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B0B22] leading-tight">
                Where Flame <br className="hidden sm:inline" />
                Meets the Anvil
              </h2>
            </div>

            <div className="w-16 h-[1.5px] bg-[#C9A45C]" />

            <p className="font-serif text-xl italic text-[#3A2419] font-normal leading-relaxed">
              Metal is not merely shaped; it is persuaded by human breath, furnace glow,
              and ancestral cadence.
            </p>

            <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
              In an era of mass-stamped, disposable kitchenware, Tamraaya restores
              dignity to the human touch. Every vessel is beaten thousands of times by
              master craftspeople using hand-forged anvils and wooden mallets. The rhythmic
              cadence of hammer on hot metal carries five thousand years of Indian metallurgy
              directly into your home.
            </p>

            <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
              From the slow dum biryani perfected in a tin-lined (Kalai) brass handi to the
              vitalizing Tamra Jal morning ritual from pure copper, our pieces are designed
              to be lived with, seasoned by fire, and passed down as heirlooms.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="inline-flex items-center text-xs uppercase tracking-editorial font-semibold text-[#1B0B22] hover:text-[#8C6D2B] transition-colors border-b border-[#1B0B22] pb-1"
              >
                <span>Read the Heritage Chronicle</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                href="/craft"
                className="inline-flex items-center text-xs uppercase tracking-editorial font-semibold text-[#8C6D2B] hover:text-[#1B0B22] transition-colors"
              >
                <span>Our Metallurgical Craft &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CraftsmanshipValues() {
  const values = [
    {
      icon: Flame,
      title: "Virgin Metals Only",
      description:
        "We never melt down mystery scrap or industrial salvage. Every batch begins with certified virgin copper, zinc, and tin.",
    },
    {
      icon: Sparkles,
      title: "Kalai Artisanship",
      description:
        "Pure 99.9% food-grade tin lining executed over live charcoal embers, ensuring acidic and sour foods remain 100% safe.",
    },
    {
      icon: ShieldCheck,
      title: "Ayurvedic Harmony",
      description:
        "Formulated to balance Vata, Pitta, and Kapha doshas, naturally infusing culinary preparations with therapeutic trace minerals.",
    },
    {
      icon: HeartHandshake,
      title: "Heirloom Durability",
      description:
        "Engineered with thick metal gauge dimensions that will never warp under intense heat. Intended to endure across generations.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#1B0B22] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-editorial text-[#D8B875] font-semibold block">
            Crafted Without Compromise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2]">
            The Four Pillars of Tamraaya
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-8 border border-[#C9A45C25] bg-[#2B1234]/40 hover:border-[#C9A45C] hover:bg-[#2B1234]/70 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A45C20] border border-[#C9A45C50] flex items-center justify-center text-[#D8B875]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-[#FAF7F2] tracking-wide">
                  {val.title}
                </h3>
                <p className="text-xs text-[#FAF7F2]/75 font-light leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EnquiryBanner() {
  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <section className="py-20 bg-[#ECE4D6] border-t border-[#1D1B1A15]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
          Bespoke Commissions & Trousseau Curations
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1B0B22] leading-tight">
          Create an Heirloom for Your Next Generation
        </h2>
        <p className="text-sm sm:text-base text-[#1D1B1A]/80 font-light max-w-2xl mx-auto leading-relaxed">
          From custom crest engraving and bespoke bronze banquet services to luxury wedding
          gifting trunks, our atelier collaborates directly with private clients and interior
          designers.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/enquire"
            className="w-full sm:w-auto inline-flex items-center justify-center h-12 px-8 text-xs uppercase tracking-editorial font-semibold bg-[#1B0B22] text-[#D8B875] border border-[#C9A45C40] hover:bg-[#2B1234] transition-all"
          >
            Consult With Our Concierge
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-8 text-xs uppercase tracking-editorial font-semibold border border-[#1B0B22] text-[#1B0B22] hover:bg-[#1B0B22]/10 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-700" />
            <span>Direct WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </section>
  );
}
