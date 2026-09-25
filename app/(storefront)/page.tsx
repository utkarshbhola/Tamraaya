import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { StorefrontHero } from "@/components/storefront/hero";
import { MaterialShowcase } from "@/components/storefront/material-showcase";
import { ProductCard } from "@/components/storefront/product-card";
import {
  BrandStory,
  CraftsmanshipValues,
  EnquiryBanner,
} from "@/components/storefront/brand-story";
import { getProducts, getCollections } from "@/lib/products/queries";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const { products } = await getProducts({ limit: 4 });
  const collections = await getCollections();
  const featuredCollection = collections[0];

  return (
    <div className="space-y-0">
      {/* 1. Visually Dominant Hero */}
      <StorefrontHero />

      {/* 2. Shop by Material (Brass, Copper, Bronze) */}
      <MaterialShowcase />

      {/* 3. Featured Pieces Section */}
      <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#1D1B1A15]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div className="space-y-3">
              <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
                The Curated Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B0B22]">
                Featured Masterpieces
              </h2>
              <div className="w-16 h-[1.5px] bg-[#C9A45C]" />
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial font-semibold text-[#1B0B22] hover:text-[#8C6D2B] transition-colors border-b border-[#1B0B22] pb-1 w-fit"
            >
              <span>Explore All Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Brand & Artisan Heritage Story */}
      <BrandStory />

      {/* 5. Craftsmanship Values & Four Sacred Pillars */}
      <CraftsmanshipValues />

      {/* 6. Featured Collection Editorial Spotlight */}
      {featuredCollection && (
        <section className="py-20 sm:py-28 bg-[#F6F0E6] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative border border-[#C9A45C40] bg-[#1B0B22] text-[#FAF7F2] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
              {/* Collection Image */}
              <div className="relative lg:col-span-7 min-h-[360px] sm:min-h-[460px] overflow-hidden">
                <Image
                  src={
                    featuredCollection.hero_image_url ||
                    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt={featuredCollection.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1B0B22] hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B0B22] via-transparent to-transparent lg:hidden" />
              </div>

              {/* Collection Narrative */}
              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-editorial text-[#D8B875]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Featured Atelier Series</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2]">
                    {featuredCollection.name}
                  </h3>
                  {featuredCollection.tagline && (
                    <p className="text-xs uppercase tracking-wider text-[#C9A45C] font-medium">
                      {featuredCollection.tagline}
                    </p>
                  )}
                </div>

                <div className="w-12 h-[1px] bg-[#C9A45C]" />

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light leading-relaxed">
                  {featuredCollection.description}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/collections/${featuredCollection.slug}`}
                    className="inline-flex items-center justify-center h-12 px-7 text-xs uppercase tracking-editorial font-semibold bg-[#C9A45C] text-[#1B0B22] hover:bg-[#D8B875] transition-all"
                  >
                    View Collection Pieces &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. Bespoke Enquiry Banner */}
      <EnquiryBanner />
    </div>
  );
}
