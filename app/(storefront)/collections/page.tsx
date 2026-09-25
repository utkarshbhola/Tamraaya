import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getCollections } from "@/lib/products/queries";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Atelier Collections | Tamraaya",
  description:
    "Curated ensembles of handcrafted Indian metalware, from The Artisan's Collection to Modern Bronze dining suites.",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1D1B1A]/60 mb-8"
        >
          <Link href="/" className="hover:text-[#1B0B22]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#8C6D2B] font-semibold">Collections</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Curated Ensembles
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1B0B22]">
            Atelier Collections
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-3" />
          <p className="text-sm text-[#1D1B1A]/75 font-light leading-relaxed">
            Each collection represents a specific metallurgical philosophy, culinary
            technique, and ancestral craftsmanship tradition.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {collections.map((col, idx) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative flex flex-col overflow-hidden border border-[#1D1B1A20] bg-[#1B0B22] shadow-sm hover:shadow-xl hover:border-[#C9A45C] transition-all duration-500"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#2B1234]">
                <Image
                  src={
                    col.hero_image_url ||
                    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B0B22] via-[#1B0B22]/40 to-transparent" />

                {col.featured && (
                  <span className="absolute top-4 left-4 z-10 bg-[#1B0B22]/90 text-[#D8B875] text-[9px] uppercase tracking-editorial px-2.5 py-1 border border-[#C9A45C40]">
                    Signature Series
                  </span>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-3 bg-[#1B0B22] text-[#FAF7F2]">
                {col.tagline && (
                  <span className="text-[10px] uppercase tracking-editorial text-[#D8B875] font-semibold block">
                    {col.tagline}
                  </span>
                )}
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] group-hover:text-[#D8B875] transition-colors">
                  {col.name}
                </h3>
                <p className="text-xs text-[#FAF7F2]/75 font-light leading-relaxed line-clamp-2">
                  {col.description}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#C9A45C] font-semibold group-hover:text-white transition-colors">
                  <span>Explore Series</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
