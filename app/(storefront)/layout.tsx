import * as React from "react";
import { StorefrontNavigation } from "@/components/storefront/navigation";
import { StorefrontFooter } from "@/components/storefront/footer";
import { LuxuryCursor } from "@/components/storefront/luxury-cursor";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F4EEE3] text-[#2B1A13]">
      <LuxuryCursor />
      <StorefrontNavigation />
      <main className="flex-1">{children}</main>
      <StorefrontFooter />
    </div>
  );
}
