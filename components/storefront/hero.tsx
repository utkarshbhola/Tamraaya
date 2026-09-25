"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function StorefrontHero() {
  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1B0B22] text-[#FAF7F2]">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=85&w=2000&auto=format&fit=crop"
          alt="Tamraaya Hand-hammered metalware"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100 animate-in fade-in zoom-in-105 duration-1000 opacity-60"
        />
        {/* Editorial vignetting and gradient blends */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B0B22] via-[#1B0B22]/70 to-[#1B0B22]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B0B22] via-transparent to-[#1B0B22]/60" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center space-y-6">
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C9A45C60] bg-[#1B0B22]/80 backdrop-blur-sm text-[10px] sm:text-[11px] uppercase tracking-editorial text-[#D8B875] animate-in fade-in slide-in-from-bottom-2 duration-700">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Heritage Metalcraft &bull; Handcrafted in India</span>
        </div>

        {/* Dominant Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#FAF7F2] font-normal leading-[1.05] animate-in fade-in slide-in-from-bottom-3 duration-800">
          THE ARTISAN&apos;S <br className="hidden sm:inline" />
          <span className="italic font-light text-[#D8B875]">HAND</span>
        </h1>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-lg md:text-xl text-[#FAF7F2]/80 font-light max-w-xl mx-auto tracking-wide leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-900">
          Rooted in tradition. <br className="sm:hidden" />
          Designed for you.
        </p>

        {/* Decorative Divider */}
        <div className="w-20 h-[1.5px] bg-[#C9A45C] my-2 opacity-80" />

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-5 duration-1000">
          <Link
            href="/collections"
            className="w-full sm:w-auto inline-flex items-center justify-center h-13 px-8 text-xs uppercase tracking-editorial font-semibold bg-[#C9A45C] text-[#1B0B22] hover:bg-[#D8B875] transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>EXPLORE COLLECTIONS</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/craft"
            className="w-full sm:w-auto inline-flex items-center justify-center h-13 px-8 text-xs uppercase tracking-editorial font-semibold border border-[#FAF7F2]/40 text-[#FAF7F2] hover:border-[#C9A45C] hover:text-[#D8B875] hover:bg-[#1B0B22]/50 backdrop-blur-sm transition-all duration-300"
          >
            OUR CRAFT
          </Link>
        </div>
      </div>
    </section>
  );
}
