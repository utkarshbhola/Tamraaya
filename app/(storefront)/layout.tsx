import * as React from "react";
import { StorefrontNavigation } from "@/components/storefront/navigation";
import { StorefrontFooter } from "@/components/storefront/footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F6F0E6] text-[#1D1B1A]">
      <StorefrontNavigation />
      <main className="flex-1">{children}</main>
      <StorefrontFooter />
    </div>
  );
}
