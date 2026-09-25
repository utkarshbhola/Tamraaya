"use client";

import * as React from "react";
import Link from "next/link";
import { Globe, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function StudioHeader() {
  return (
    <header className="h-16 bg-[#FAF7F2] border-b border-[#1D1B1A15] px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D2B]">
          Studio Administration
        </span>
        <span className="text-[#1D1B1A30]">|</span>
        <Badge variant="plum" className="text-[9px] tracking-widest">
          Production Environment
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#1B0B22] hover:text-[#8C6D2B] transition-colors"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>View Public Storefront &nearr;</span>
        </Link>

        <div className="flex items-center gap-2 pl-4 border-l border-[#1D1B1A15]">
          <div className="w-8 h-8 rounded-full bg-[#1B0B22] text-[#D8B875] flex items-center justify-center font-serif text-xs font-semibold border border-[#C9A45C40]">
            SA
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-[#1B0B22] leading-none">
              Administrator
            </span>
            <span className="text-[10px] text-[#8C6D2B] uppercase tracking-wider">
              Super Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
