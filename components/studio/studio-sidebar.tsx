"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  Image as ImageIcon,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  Globe,
  LogOut,
  FolderTree,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

export function StudioSidebar() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // offline/dev fallback
    }
    window.location.href = "/studio/login";
  };

  const navSections = [
    {
      title: "OVERVIEW",
      items: [
        {
          name: "Dashboard",
          href: "/studio/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "CATALOG",
      items: [
        { name: "Products", href: "/studio/products", icon: Package },
        { name: "Categories", href: "/studio/categories", icon: FolderTree },
        { name: "Collections", href: "/studio/collections", icon: Layers },
      ],
    },
    {
      title: "CONTENT & CMS",
      items: [
        { name: "Homepage CMS", href: "/studio/content", icon: Sparkles },
      ],
    },
    {
      title: "MEDIA",
      items: [
        { name: "Media Library", href: "/studio/media", icon: ImageIcon },
      ],
    },
    {
      title: "CUSTOMERS",
      items: [
        { name: "Enquiries & Leads", href: "/studio/enquiries", icon: MessageSquare },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { name: "Admin Users", href: "/studio/users", icon: Users },
        { name: "Settings", href: "/studio/settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#1B0B22] text-[#FAF7F2] flex flex-col flex-shrink-0 border-r border-[#C9A45C25] min-h-screen">
      {/* Studio Brand Bar */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#C9A45C20]">
        <Link href="/studio/dashboard" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded bg-[#C9A45C] text-[#1B0B22] flex items-center justify-center font-serif font-bold text-sm">
            T
          </div>
          <div>
            <span className="font-serif text-lg tracking-wider text-[#FAF7F2] font-semibold block leading-none">
              TAMRAAYA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[#D8B875] font-sans font-medium">
              Studio Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navSections.map((sec) => (
          <div key={sec.title} className="space-y-1.5">
            <span className="px-3 text-[10px] uppercase tracking-wider text-[#D8B875]/70 font-semibold block">
              {sec.title}
            </span>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/studio/dashboard" &&
                    pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-xs uppercase tracking-wider transition-colors rounded-sm",
                      isActive
                        ? "bg-[#2B1234] text-[#D8B875] font-semibold border-l-2 border-[#C9A45C]"
                        : "text-[#FAF7F2]/70 hover:bg-[#2B1234]/60 hover:text-white"
                    )}
                  >
                    <Icon className="w-4 h-4 text-current" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Utility Actions */}
      <div className="p-4 border-t border-[#C9A45C20] space-y-2 bg-[#17091D]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs text-[#FAF7F2]/75 hover:text-[#D8B875] hover:bg-[#2B1234] transition-colors"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Live Storefront</span>
          </span>
          <span className="text-[10px] text-[#C9A45C]">&nearr;</span>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Studio</span>
        </button>
      </div>
    </aside>
  );
}
