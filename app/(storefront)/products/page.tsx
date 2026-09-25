import * as React from "react";
import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import {
  ProductFilterBar,
  DesktopFilterSidebar,
} from "@/components/storefront/product-filter-bar";
import { ProductCard } from "@/components/storefront/product-card";
import { getProducts, ProductQueryParams } from "@/lib/products/queries";
import { Sparkles, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Masterpiece Catalogue",
  description:
    "Explore our complete collection of handcrafted brass cookware, pure copper vessels, and bronze kansa tableware.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<ProductQueryParams>;
}) {
  const resolvedParams = await searchParams;
  const { products, total } = await getProducts(resolvedParams);

  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <div className="bg-[#F6F0E6] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1D1B1A]/60 mb-8"
        >
          <Link href="/" className="hover:text-[#1B0B22]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#8C6D2B] font-semibold">Catalogue</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Handcrafted Tableware & Culinary Vessels
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1B0B22] tracking-tight">
            The Atelier Catalogue
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A45C]" />
          <p className="text-sm text-[#1D1B1A]/75 font-light leading-relaxed">
            Every piece is hammered by hand from virgin metals. Designed for slow
            culinary traditions, natural wellness, and multi-generational feasts.
          </p>
        </div>

        {/* Suspended URL Filter Bar */}
        <Suspense
          fallback={
            <div className="h-16 bg-[#FAF7F2] animate-pulse border border-[#1D1B1A15] mb-8" />
          }
        >
          <ProductFilterBar totalCount={total} />
        </Suspense>

        {/* Main Catalogue Grid Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Desktop Filter Sidebar */}
          <Suspense fallback={<div className="hidden lg:block w-64 h-96 animate-pulse bg-[#FAF7F2]" />}>
            <DesktopFilterSidebar />
          </Suspense>

          {/* Right Product Grid */}
          <div className="flex-1 w-full">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-[#FAF7F2] border border-[#1D1B1A15] p-12 sm:p-16 text-center space-y-5 my-6">
                <div className="w-12 h-12 rounded-full bg-[#C9A45C20] border border-[#C9A45C50] mx-auto flex items-center justify-center text-[#8C6D2B]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-[#1B0B22]">
                  No pieces matched your search
                </h3>
                <p className="text-xs sm:text-sm text-[#1D1B1A]/70 max-w-md mx-auto leading-relaxed">
                  We could not find any metalcraft pieces matching your exact filter
                  criteria. Try broadening your selection or speak directly with our concierge.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center h-11 px-6 text-xs uppercase tracking-wider font-semibold bg-[#1B0B22] text-[#D8B875]"
                  >
                    Reset All Filters
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-11 px-6 text-xs uppercase tracking-wider font-semibold border border-[#25D366] text-emerald-800 hover:bg-emerald-50"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Inquire with Concierge</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
