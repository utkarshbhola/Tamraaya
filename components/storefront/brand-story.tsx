import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, ShieldCheck, HeartHandshake, Sparkles, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export function BrandStory() {
  return (
    <section className="overflow-hidden bg-[#F4EEE3] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#B58A3C]/40 shadow-[0_28px_70px_rgba(43,26,19,0.12)]">
              <Image
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
                alt="Tamraaya master craftsman shaping metal on an anvil"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[#2B1A13]/10" />
            </div>

            <div className="absolute -bottom-6 -right-3 hidden max-w-xs border border-[#B58A3C]/40 bg-[#2B1A13] p-6 text-[#F4EEE3] shadow-[0_28px_70px_rgba(43,26,19,0.18)] sm:block">
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A96A]">
                Seventh Generation
              </span>
              <p className="font-serif text-lg italic text-[#F4EEE3]">
                &ldquo;Every dimple is struck with intent, not haste.&rdquo;
              </p>
            </div>
          </div>

          <div className="space-y-6 lg:pl-6">
            <div className="space-y-3">
              <span className="editorial-kicker block">The Artisan Story</span>
              <h2 className="font-serif text-4xl leading-[0.95] text-[#2B1A13] sm:text-5xl lg:text-6xl">
                Where Flame <br className="hidden sm:inline" />
                Meets the Anvil
              </h2>
            </div>

            <div className="brass-rule" />

            <p className="font-serif text-2xl italic leading-relaxed text-[#3A241B]">
              Metal is not merely shaped; it is persuaded by human breath, furnace glow, and ancestral cadence.
            </p>

            <p className="text-sm leading-relaxed text-[#2B1A13]/80">
              In an era of mass-stamped, disposable kitchenware, Tamraaya restores dignity to the human touch.
              Every vessel is beaten thousands of times by master craftspeople using hand-forged anvils and wooden mallets.
            </p>

            <p className="text-sm leading-relaxed text-[#2B1A13]/80">
              From the slow dum biryani perfected in a tin-lined brass handi to the vitalizing Tamra Jal morning ritual from pure copper,
              our pieces are designed to be lived with, seasoned by fire, and passed down as heirlooms.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <Link href="/about" className="inline-flex items-center border-b border-[#2B1A13] pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2B1A13] transition-colors hover:text-[#B58A3C]">
                <span>Read the Heritage Chronicle</span>
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
              <Link href="/craft" className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B58A3C] transition-colors hover:text-[#2B1A13]">
                Our Craft
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
    <section className="bg-[#2B1A13] py-20 text-[#F4EEE3] sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl space-y-3 text-center">
          <span className="editorial-kicker block text-[#C9A96A]">Crafted Without Compromise</span>
          <h2 className="font-serif text-4xl text-[#F4EEE3] sm:text-5xl">Made by hand. Meant to last.</h2>
          <div className="brass-rule mx-auto" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="space-y-4 border border-[#B58A3C]/25 bg-[#3A241B]/60 p-8 transition-all duration-300 hover:border-[#B58A3C] hover:bg-[#3A241B]"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-[#B58A3C]/40 bg-[#B58A3C]/10 text-[#C9A96A]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-2xl text-[#F4EEE3]">{val.title}</h3>
                <p className="text-xs leading-relaxed text-[#F4EEE3]/70">{val.description}</p>
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
    <section className="border-t border-[#B58A3C]/20 bg-[#E8DDCB] py-20">
      <div className="mx-auto max-w-5xl space-y-6 px-4 text-center sm:px-6 lg:px-8">
        <span className="editorial-kicker block">Bespoke Commissions & Trousseau Curations</span>
        <h2 className="font-serif text-4xl leading-tight text-[#2B1A13] sm:text-5xl">
          Create an heirloom for your next generation.
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#2B1A13]/75 sm:text-base">
          From custom crest engraving and bespoke bronze banquet services to luxury wedding gifting trunks, our atelier collaborates directly with private clients and designers.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          <Link
            href="/enquire"
            className="inline-flex h-12 w-full items-center justify-center border border-[#B58A3C] bg-[#2B1A13] px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#F4EEE3] transition-all hover:bg-[#3A241B] sm:w-auto"
          >
            Consult With Our Concierge
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 w-full items-center justify-center gap-2 border border-[#2B1A13] bg-transparent px-8 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2B1A13] transition-all hover:bg-[#2B1A13]/5 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4 text-emerald-700" />
            <span>Direct WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
