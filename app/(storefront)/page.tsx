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
      <StorefrontHero />

      <MaterialShowcase />

      <section className="bg-[#F4EEE3] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <span className="editorial-kicker block">The Curated Selection</span>
              <h2 className="font-serif text-4xl text-[#2B1A13] sm:text-5xl">Featured Masterpieces</h2>
              <div className="brass-rule" />
            </div>

            <Link
              href="/products"
              className="inline-flex w-fit items-center gap-2 border-b border-[#2B1A13] pb-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2B1A13] transition-colors hover:text-[#B58A3C]"
            >
              <span>Explore All Pieces</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
            {products.slice(0, 3).map((product, index) => (
              <div key={product.id} className={index === 0 ? "lg:col-span-1" : ""}>
                <ProductCard product={product} className={index === 0 ? "h-full" : "h-full"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrandStory />

      <CraftsmanshipValues />

      {featuredCollection && (
        <section className="overflow-hidden bg-[#F4EEE3] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid overflow-hidden border border-[#B58A3C]/40 bg-[#2B1A13] text-[#F4EEE3] shadow-[0_24px_60px_rgba(43,26,19,0.12)] lg:grid-cols-12">
              <div className="relative min-h-[360px] overflow-hidden lg:col-span-7 sm:min-h-[460px]">
                <Image
                  src={
                    featuredCollection.hero_image_url ||
                    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
                  }
                  alt={featuredCollection.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(43,26,19,0.18),rgba(43,26,19,0.78))] hidden lg:block" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(43,26,19,0.7))] lg:hidden" />
              </div>

              <div className="flex flex-col justify-center space-y-6 p-8 sm:p-10 lg:col-span-5 lg:p-14">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A96A]">
                    <Sparkles className="h-3.5 w-3.5 text-[#B58A3C]" />
                    <span>Featured Atelier Series</span>
                  </div>
                  <h3 className="font-serif text-4xl text-[#F4EEE3] sm:text-5xl">{featuredCollection.name}</h3>
                  {featuredCollection.tagline && (
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#C9A96A]">
                      {featuredCollection.tagline}
                    </p>
                  )}
                </div>

                <div className="h-px w-12 bg-[#B58A3C]" />
                <p className="text-sm leading-relaxed text-[#F4EEE3]/75">{featuredCollection.description}</p>

                <Link
                  href={`/collections/${featuredCollection.slug}`}
                  className="inline-flex h-12 w-fit items-center justify-center border border-[#B58A3C] bg-[#B58A3C] px-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2B1A13] transition-all hover:bg-[#C9A96A]"
                >
                  View Collection Pieces
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <EnquiryBanner />
    </div>
  );
}
