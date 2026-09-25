"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";
import { ProductWithRelations } from "@/types/database.types";
import { formatINR, cn } from "@/lib/utils";

export interface ProductCardProps {
  product: ProductWithRelations;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [currentImgIndex, setCurrentImgIndex] = React.useState(0);

  const heroImage =
    product.images.find((img) => img.image_type === "hero") || product.images[0];
  const secondaryImage =
    product.images.find((img) => img.image_type === "detail" || img.image_type === "lifestyle") ||
    product.images[1] ||
    heroImage;

  const minPrice =
    product.variants.length > 0
      ? Math.min(...product.variants.map((v) => v.price || 0).filter((p) => p > 0))
      : 0;

  const primaryVariant = product.variants[0];

  return (
    <div
      className={cn(
        "group relative flex flex-col bg-[#FAF7F2] border border-[#1D1B1A15] hover:border-[#C9A45C80] transition-all duration-300",
        className
      )}
      onMouseEnter={() => {
        if (secondaryImage && secondaryImage.url !== heroImage?.url) {
          setCurrentImgIndex(1);
        }
      }}
      onMouseLeave={() => setCurrentImgIndex(0)}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE4D6]/50">
        {heroImage && (
          <Image
            src={currentImgIndex === 1 && secondaryImage ? secondaryImage.url : heroImage.url}
            alt={heroImage.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            priority={product.featured}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.featured && (
            <span className="bg-[#1B0B22] text-[#D8B875] text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold border border-[#C9A45C40]">
              Featured
            </span>
          )}
          {product.kalai_tinned && (
            <span className="bg-[#FAF7F2]/90 backdrop-blur-sm text-[#1B0B22] text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#1D1B1A20]">
              Kalai Lined
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center text-[#1D1B1A] hover:text-[#C9A45C] transition-all shadow-sm"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted && "fill-rose-700 text-rose-700"
            )}
          />
        </button>

        {/* Quick View / Explore Overlay for Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#1B0B22]/90 via-[#1B0B22]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between">
          <span className="text-[10px] uppercase tracking-editorial text-[#D8B875] font-semibold flex items-center gap-1">
            View Details <ArrowUpRight className="w-3 h-3" />
          </span>
          {product.finish && (
            <span className="text-[10px] text-[#FAF7F2]/80 uppercase">
              {product.finish}
            </span>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#1D1B1A]/60">
            <span>{product.material}</span>
            {primaryVariant?.capacity && (
              <span>{primaryVariant.capacity}</span>
            )}
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-serif text-lg sm:text-xl text-[#1B0B22] group-hover:text-[#8C6D2B] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {product.short_description && (
            <p className="text-xs text-[#1D1B1A]/70 line-clamp-2 font-light leading-relaxed">
              {product.short_description}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-[#1D1B1A10] flex items-center justify-between">
          <div>
            <span className="text-sm font-semibold text-[#1B0B22]">
              {minPrice > 0 ? formatINR(minPrice) : "Enquire for Price"}
            </span>
            {product.variants.length > 1 && minPrice > 0 && (
              <span className="text-[10px] text-[#1D1B1A]/60 ml-1.5 uppercase">
                ({product.variants.length} Sizes)
              </span>
            )}
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D2B] hover:text-[#1B0B22] transition-colors flex items-center gap-1"
          >
            Explore &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
