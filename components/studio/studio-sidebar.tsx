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
    <aside className="w-64 min-h-screen flex-shrink-0 border-r border-[#B8A58D]/60 bg-[#2B1A13] text-[#F4EEE3] flex flex-col">
      <div className="h-16 px-6 flex items-center justify-between border-b border-[#B8A58D]/30">
        <Link href="/studio/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center bg-[#B58A3C] text-sm font-bold text-[#2B1A13] font-serif">
            T
          </div>
          <div>
            <span className="block font-serif text-lg font-semibold tracking-wider text-[#F4EEE3] leading-none">
              TAMRAAYA
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#C9A96A] font-medium">
              Studio Portal
            </span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {navSections.map((sec) => (
          <div key={sec.title} className="space-y-1.5">
            <span className="px-3 text-[10px] uppercase tracking-[0.22em] text-[#C9A96A]/80 font-semibold block">
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
                      "flex items-center gap-3 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.18em] transition-colors",
                      isActive
                        ? "border-l-2 border-[#B58A3C] bg-[#4A2F20] text-[#F4EEE3] font-semibold"
                        : "text-[#F4EEE3]/75 hover:bg-[#4A2F20]/80 hover:text-[#F4EEE3]"
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

      <div className="space-y-2 border-t border-[#B8A58D]/30 bg-[#231611] p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-sm px-3 py-2 text-xs text-[#F4EEE3]/80 transition-colors hover:bg-[#4A2F20] hover:text-[#F4EEE3]"
        >
          <span className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Live Storefront</span>
          </span>
          <span className="text-[10px] text-[#C9A96A]">&nearr;</span>
        </Link>

        <button
          type="button"
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 rounded-sm px-3 py-2 text-xs text-[#F4EEE3]/80 transition-colors hover:bg-[#4A2F20] hover:text-[#F4EEE3]"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Studio</span>
        </button>
      </div>
    </aside>
  );
}
