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
        "group relative flex h-full min-h-[430px] flex-col overflow-hidden border border-[#B8A58D]/50 bg-[#FFFDF8] transition-all duration-500 hover:-translate-y-1 hover:border-[#B58A3C]/80 hover:shadow-[0_26px_60px_rgba(43,26,19,0.12)]",
        className
      )}
      onMouseEnter={() => {
        if (secondaryImage && secondaryImage.url !== heroImage?.url) {
          setCurrentImgIndex(1);
        }
      }}
      onMouseLeave={() => setCurrentImgIndex(0)}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-[#F0E7DA]">
        {heroImage && (
          <Image
            src={currentImgIndex === 1 && secondaryImage ? secondaryImage.url : heroImage.url}
            alt={heroImage.alt_text || product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={product.featured}
          />
        )}

        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.featured && (
            <span className="border border-[#C9A96A]/60 bg-[#2B1A13]/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#E8DDCB]">
              Featured
            </span>
          )}
          {product.kalai_tinned && (
            <span className="border border-[#B8A58D]/60 bg-[#F4EEE3]/90 px-2 py-0.5 text-[9px] uppercase tracking-[0.16em] text-[#2B1A13]">
              Kalai Lined
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFDF8]/90 text-[#2B1A13] shadow-sm transition-all hover:text-[#B58A3C]"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isWishlisted && "fill-[#A43E3E] text-[#A43E3E]"
            )}
          />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[#2B1A13]/95 via-[#2B1A13]/40 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C9A96A]">
            View Details <ArrowUpRight className="h-3 w-3" />
          </span>
          {product.finish && (
            <span className="text-[10px] uppercase text-[#F4EEE3]/80">{product.finish}</span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#2B1A13]/65">
            <span>{product.material}</span>
            {primaryVariant?.capacity && <span>{primaryVariant.capacity}</span>}
          </div>

          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="min-h-[2.8em] font-serif text-xl leading-tight text-[#2B1A13] transition-colors group-hover:text-[#B58A3C] sm:text-2xl line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {product.short_description && (
            <p className="line-clamp-2 text-xs leading-relaxed text-[#2B1A13]/70">
              {product.short_description}
            </p>
          )}
        </div>

        <div className="mt-auto border-t border-[#B8A58D]/60 pt-3">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <span className="block text-sm font-semibold text-[#2B1A13]">
                {minPrice > 0 ? formatINR(minPrice) : "Enquire for Price"}
              </span>
              {product.variants.length > 1 && minPrice > 0 && (
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#2B1A13]/60">
                  ({product.variants.length} Sizes)
                </span>
              )}
            </div>

            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B58A3C] transition-colors hover:text-[#2B1A13]"
            >
              Explore <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
