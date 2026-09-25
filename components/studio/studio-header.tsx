"use client";

import * as React from "react";
import Link from "next/link";
import { Globe, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StudioHeader() {
  return (
    <header className="h-16 border-b border-[#B8A58D]/60 bg-[#FFFDF8] px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A2F20]">
          Studio Administration
        </span>
        <span className="text-[#B8A58D]">|</span>
        <Badge variant="plum" className="text-[9px] tracking-[0.18em]">
          Production Environment
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-semibold text-[#2B1A13] transition-colors hover:text-[#B58A3C]"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Public Storefront &nearr;</span>
        </Link>

        <div className="flex items-center gap-2 pl-4 border-l border-[#B8A58D]/60">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B58A3C]/40 bg-[#2B1A13] font-serif text-xs font-semibold text-[#C9A96A]">
            SA
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#2B1A13] leading-none">
              Administrator
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#4A2F20]">
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
