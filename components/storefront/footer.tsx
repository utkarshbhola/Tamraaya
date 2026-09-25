import * as React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { ArrowUpRight, Camera, MessageCircle } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";

export function StorefrontFooter() {
  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <footer className="border-t border-[#B58A3C]/30 bg-[#2B1A13] pt-16 pb-12 text-[#F4EEE3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-[#B58A3C]/20 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_1.1fr]">
          <div className="space-y-5 lg:pr-8">
            <div className="space-y-2">
              <span className="font-serif text-4xl leading-none tracking-[0.06em] text-[#F4EEE3]">
                TAMRAYA
              </span>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96A]">
                {BRAND.tagline}
              </p>
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-[#F4EEE3]/75">
              We craft heirloom kitchenware and banquet tableware from pure virgin brass, copper, and bronze.
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96A] transition-colors hover:text-[#F4EEE3]"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              WhatsApp Concierge
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96A]">Collection</span>
            <ul className="space-y-3 text-sm text-[#F4EEE3]/80">
              <li><Link href="/products" className="transition-colors hover:text-[#C9A96A]">All Masterpieces</Link></li>
              <li><Link href="/collections" className="transition-colors hover:text-[#C9A96A]">Featured Collections</Link></li>
              <li><Link href="/collections" className="transition-colors hover:text-[#C9A96A]">Curated Sets</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96A]">Our Craft</span>
            <ul className="space-y-3 text-sm text-[#F4EEE3]/80">
              <li><Link href="/craft" className="transition-colors hover:text-[#C9A96A]">Kalai & Tinning</Link></li>
              <li><Link href="/craft" className="transition-colors hover:text-[#C9A96A]">Metallurgy</Link></li>
              <li><Link href="/about" className="transition-colors hover:text-[#C9A96A]">Heritage</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96A]">Visit</span>
            <ul className="space-y-3 text-sm text-[#F4EEE3]/80">
              <li><Link href="/about" className="transition-colors hover:text-[#C9A96A]">About</Link></li>
              <li><Link href="/journal" className="transition-colors hover:text-[#C9A96A]">Journal</Link></li>
              <li><Link href="/contact" className="transition-colors hover:text-[#C9A96A]">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A96A]">Newsletter</span>
            <div className="flex items-center border border-[#B58A3C]/35 bg-[#F4EEE3]/5">
              <input
                type="email"
                placeholder="Email address"
                className="h-12 flex-1 bg-transparent px-4 text-sm text-[#F4EEE3] placeholder:text-[#F4EEE3]/50 outline-none"
              />
              <button type="button" className="h-12 border-l border-[#B58A3C]/35 px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A96A]">
                Join
              </button>
            </div>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#F4EEE3]/80 hover:text-[#C9A96A]">
              <Camera className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-[11px] text-[#F4EEE3]/65 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/craft" className="transition-colors hover:text-[#C9A96A]">Metal Care</Link>
            <Link href="/contact" className="transition-colors hover:text-[#C9A96A]">Concierge</Link>
            <Link href="/studio/login" className="font-medium text-[#C9A96A] transition-colors hover:text-[#F4EEE3]">Studio Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
