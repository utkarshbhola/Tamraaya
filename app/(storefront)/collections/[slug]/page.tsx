import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCollections, getProducts } from "@/lib/products/queries";
import { ProductCard } from "@/components/storefront/product-card";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collections = await getCollections();
  const col = collections.find((c) => c.slug === slug);

  if (!col) {
    return { title: "Collection Not Found | Tamraaya" };
  }

  return {
    title: `${col.name} Collection | Tamraaya`,
    description: col.description || undefined,
  };
}

export default async function CollectionDetailPage({
  params,
}: CollectionPageProps) {
  const { slug } = await params;
  const collections = await getCollections();
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) {
    notFound();
  }

  const { products } = await getProducts();
  // Filter products belonging to this collection
  const collectionProducts = products.filter(
    (p) =>
      p.collections?.some((c) => c.slug === slug) ||
      (slug === "heritage-brass" && p.material === "Brass") ||
      (slug === "modern-bronze" && p.material === "Bronze") ||
      (slug === "the-artisans-collection" && p.featured)
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
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
          <Link href="/collections" className="hover:text-[#1B0B22]">
            Collections
          </Link>
          <span>/</span>
          <span className="text-[#8C6D2B] font-semibold">{collection.name}</span>
        </nav>

        {/* Hero Banner Card */}
        <div className="relative border border-[#C9A45C40] bg-[#1B0B22] text-[#FAF7F2] overflow-hidden mb-16 shadow-2xl">
          <div className="relative h-72 sm:h-96 w-full overflow-hidden">
            <Image
              src={
                collection.hero_image_url ||
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop"
              }
              alt={collection.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center opacity-65"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B0B22] via-[#1B0B22]/60 to-transparent" />
          </div>

          <div className="p-8 sm:p-12 -mt-24 sm:-mt-32 relative z-10 max-w-3xl space-y-3">
            {collection.tagline && (
              <span className="text-[10px] uppercase tracking-editorial text-[#D8B875] font-semibold block">
                {collection.tagline}
              </span>
            )}
            <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF7F2]">
              {collection.name}
            </h1>
            <div className="w-16 h-[1.5px] bg-[#C9A45C]" />
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>

        {/* Products in this Collection */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1D1B1A15]">
            <h2 className="font-serif text-2xl text-[#1B0B22]">
              Pieces in this Collection
            </h2>
            <span className="text-xs uppercase tracking-wider text-[#1D1B1A]/60">
              {collectionProducts.length} Heirloom Pieces
            </span>
          </div>

          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {collectionProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-[#FAF7F2] border border-[#1D1B1A15] p-12 text-center text-xs text-[#1D1B1A]/70">
              New pieces are currently being forged for this series. Check back soon or inquire with our concierge.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
