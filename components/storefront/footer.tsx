import * as React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { generateWhatsAppUrl } from "@/lib/utils";

export function StorefrontFooter() {
  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <footer className="bg-[#1B0B22] text-[#FAF7F2] border-t border-[#C9A45C30] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#C9A45C20]">
          {/* Brand Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl tracking-wide-editorial text-[#FAF7F2] block">
              TAMRAAYA
            </span>
            <p className="text-xs uppercase tracking-editorial text-[#D8B875]">
              {BRAND.tagline}
            </p>
            <p className="text-sm text-[#FAF7F2]/70 font-light leading-relaxed max-w-sm">
              We craft heirloom kitchenware and banquet tableware from pure
              virgin brass, copper, and bronze. Reviving ancient Indian
              metallurgy for discerning contemporary homes.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D8B875] hover:text-[#FAF7F2] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Concierge: {BRAND.conciergePhone}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-editorial font-semibold text-[#D8B875] block">
              Curations
            </span>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  All Masterpieces
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Featured Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/the-artisans-collection"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  The Artisan&apos;s Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/heritage-brass"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Heritage Brass Cookware
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/modern-bronze"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Modern Bronze (Kansa)
                </Link>
              </li>
            </ul>
          </div>

          {/* Metals & Metallurgy */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-editorial font-semibold text-[#D8B875] block">
              Sacred Alloys
            </span>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <Link
                  href="/products?material=Brass"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Virgin Brass (Pittal)
                </Link>
              </li>
              <li>
                <Link
                  href="/products?material=Copper"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Pure Copper (Tamra)
                </Link>
              </li>
              <li>
                <Link
                  href="/products?material=Bronze"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Bell Metal (Kansa)
                </Link>
              </li>
              <li>
                <Link
                  href="/craft"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Traditional Kalai (Tinning)
                </Link>
              </li>
              <li>
                <Link
                  href="/craft"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Ayurvedic Metallurgy
                </Link>
              </li>
            </ul>
          </div>

          {/* Heritage & Service */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-editorial font-semibold text-[#D8B875] block">
              Bespoke Service
            </span>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <Link
                  href="/enquire"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Wedding & Trousseau Gifting
                </Link>
              </li>
              <li>
                <Link
                  href="/enquire"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Private Hospitality Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  The Thathera Lineage
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#D8B875] transition-colors"
                >
                  Showroom Appointments
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF7F2]/60 gap-4">
          <p>
            &copy; {new Date().getFullYear()} {BRAND.legalName}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/craft"
              className="hover:text-[#D8B875] transition-colors"
            >
              Metal Care
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#D8B875] transition-colors"
            >
              Concierge
            </Link>
            <span className="text-[#C9A45C30]">|</span>
            <Link
              href="/studio/login"
              className="hover:text-[#D8B875] transition-colors font-medium text-[#D8B875]/80"
            >
              Tamraaya Studio Portal &rarr;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
