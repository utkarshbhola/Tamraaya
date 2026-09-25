"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Truck,
  RotateCcw,
  Check,
} from "lucide-react";
import { ProductWithRelations } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { EnquiryModal } from "@/components/storefront/enquiry-modal";
import { formatINR, generateWhatsAppUrl, cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

export function ProductDetailView({
  product,
}: {
  product: ProductWithRelations;
}) {
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>(
    product.variants[0]?.id || ""
  );
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"story" | "specs" | "care" | "shipping">("story");

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) ||
    product.variants[0];

  const currentImage = product.images[activeImageIndex] || product.images[0];

  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
    productName: product.name,
    variantName: selectedVariant?.name,
    sku: selectedVariant?.sku,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  return (
    <>
      <div className="bg-[#FAF7F2] min-h-screen py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#1D1B1A]/60 mb-8"
          >
            <Link href="/" className="hover:text-[#1B0B22]">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#1B0B22]">
              Catalogue
            </Link>
            <span>/</span>
            {product.category && (
              <>
                <Link
                  href={`/products?category=${product.category.slug}`}
                  className="hover:text-[#1B0B22]"
                >
                  {product.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-[#8C6D2B] font-semibold truncate max-w-xs">
              {product.name}
            </span>
          </nav>

          {/* Top Editorial Split: Gallery Left, Details Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main High-Res Image Canvas */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE4D6] border border-[#C9A45C30] shadow-md">
                {currentImage && (
                  <Image
                    src={currentImage.url}
                    alt={currentImage.alt_text || product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-all duration-500"
                  />
                )}

                {/* Image Type Tag */}
                {currentImage?.image_type && (
                  <span className="absolute bottom-4 left-4 bg-[#1B0B22]/80 backdrop-blur-sm text-[#D8B875] text-[9px] uppercase tracking-editorial px-2.5 py-1 border border-[#C9A45C40]">
                    {currentImage.image_type} perspective
                  </span>
                )}
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative h-20 w-20 flex-shrink-0 overflow-hidden border-2 transition-all",
                        activeImageIndex === idx
                          ? "border-[#C9A45C] ring-2 ring-[#C9A45C30]"
                          : "border-[#1D1B1A15] opacity-70 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={img.url}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover object-center"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Specifications & Inquiries Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Collection & Material Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#1B0B22] text-[#D8B875] text-[10px] uppercase tracking-editorial font-semibold px-3 py-1 border border-[#C9A45C40]">
                  {product.material}
                </span>
                {product.finish && (
                  <span className="bg-[#FAF7F2] text-[#1D1B1A] text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#1D1B1A20]">
                    {product.finish}
                  </span>
                )}
                {product.kalai_tinned && (
                  <span className="bg-amber-50 text-amber-900 text-[10px] uppercase tracking-wider px-2.5 py-1 border border-amber-200">
                    Kalai Tin Lined
                  </span>
                )}
              </div>

              {/* Product Title */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B0B22] leading-tight">
                  {product.name}
                </h1>
                {product.category && (
                  <p className="text-xs uppercase tracking-editorial text-[#8C6D2B]">
                    {product.category.name} Atelier Series
                  </p>
                )}
              </div>

              {/* Price & Availability */}
              <div className="pt-2 pb-4 border-y border-[#1D1B1A15] flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-3xl sm:text-4xl text-[#1B0B22]">
                    {selectedVariant?.price
                      ? formatINR(selectedVariant.price)
                      : "Price on Enquiry"}
                  </span>
                  <span className="text-[11px] text-[#1D1B1A]/60 block mt-0.5">
                    Inclusive of all handcrafted duties & insured shipping
                  </span>
                </div>

                <span
                  className={cn(
                    "text-[10px] uppercase tracking-wider px-2.5 py-1 font-semibold",
                    selectedVariant?.stock_status === "in_stock"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                      : "bg-amber-50 text-amber-800 border border-amber-300"
                  )}
                >
                  {selectedVariant?.stock_status === "in_stock"
                    ? "In Stock"
                    : "Made to Order"}
                </span>
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-sm text-[#1D1B1A]/80 font-light leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Size / Variant Selector */}
              {product.variants.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C6D2B]">
                      Select Size / Capacity:
                    </span>
                    {selectedVariant?.sku && (
                      <span className="text-[10px] font-mono text-[#1D1B1A]/50">
                        SKU: {selectedVariant.sku}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variants.map((v) => {
                      const isSelected = v.id === selectedVariant?.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariantId(v.id)}
                          className={cn(
                            "flex items-center justify-between p-3 border text-xs text-left transition-all",
                            isSelected
                              ? "border-[#1B0B22] bg-[#1B0B22] text-[#FAF7F2] shadow-sm"
                              : "border-[#1D1B1A20] bg-white text-[#1D1B1A] hover:border-[#C9A45C]"
                          )}
                        >
                          <div className="flex flex-col">
                            <span className="font-semibold">{v.name}</span>
                            {v.weight && (
                              <span
                                className={cn(
                                  "text-[10px]",
                                  isSelected ? "text-[#D8B875]" : "text-[#1D1B1A]/60"
                                )}
                              >
                                {v.weight}
                              </span>
                            )}
                          </div>
                          <span
                            className={cn(
                              "font-serif text-sm",
                              isSelected ? "text-[#D8B875]" : "text-[#1B0B22]"
                            )}
                          >
                            {formatINR(v.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTAs: Enquiry Now + WhatsApp + Wishlist */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="gold"
                  size="lg"
                  onClick={() => setEnquiryModalOpen(true)}
                  className="w-full text-sm font-semibold tracking-editorial h-13 shadow-md"
                >
                  ENQUIRE NOW
                </Button>

                <div className="flex items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 h-11 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#20ba59] text-xs uppercase tracking-wider font-semibold shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Save to Wishlist"
                    className={cn(
                      "h-11 w-11 flex items-center justify-center border transition-all",
                      isWishlisted
                        ? "border-rose-400 bg-rose-50 text-rose-600"
                        : "border-[#1D1B1A20] bg-white text-[#1D1B1A] hover:border-[#C9A45C]"
                    )}
                  >
                    <Heart
                      className={cn("w-5 h-5", isWishlisted && "fill-current")}
                    />
                  </button>
                </div>
              </div>

              {/* Guarantees Hallmarks */}
              <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#1D1B1A15] text-xs text-[#1D1B1A]/80">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D2B]" />
                  <span>Certified Virgin Metals</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#8C6D2B]" />
                  <span>Insured Pan-India Transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Below: Editorial Tabs (Story, Specifications, Care, Shipping) */}
          <div className="mt-20 pt-12 border-t border-[#1D1B1A20]">
            <div className="flex items-center gap-6 border-b border-[#1D1B1A15] overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("story")}
                className={cn(
                  "pb-4 text-xs uppercase tracking-editorial font-semibold transition-colors relative whitespace-nowrap",
                  activeTab === "story"
                    ? "text-[#1B0B22] font-bold"
                    : "text-[#1D1B1A]/60 hover:text-[#1B0B22]"
                )}
              >
                Atelier Story
                {activeTab === "story" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={cn(
                  "pb-4 text-xs uppercase tracking-editorial font-semibold transition-colors relative whitespace-nowrap",
                  activeTab === "specs"
                    ? "text-[#1B0B22] font-bold"
                    : "text-[#1D1B1A]/60 hover:text-[#1B0B22]"
                )}
              >
                Specifications & Dimensions
                {activeTab === "specs" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("care")}
                className={cn(
                  "pb-4 text-xs uppercase tracking-editorial font-semibold transition-colors relative whitespace-nowrap",
                  activeTab === "care"
                    ? "text-[#1B0B22] font-bold"
                    : "text-[#1D1B1A]/60 hover:text-[#1B0B22]"
                )}
              >
                Care & Kalai Maintenance
                {activeTab === "care" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("shipping")}
                className={cn(
                  "pb-4 text-xs uppercase tracking-editorial font-semibold transition-colors relative whitespace-nowrap",
                  activeTab === "shipping"
                    ? "text-[#1B0B22] font-bold"
                    : "text-[#1D1B1A]/60 hover:text-[#1B0B22]"
                )}
              >
                Insured Packaging
                {activeTab === "shipping" && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C9A45C]" />
                )}
              </button>
            </div>

            <div className="py-8 max-w-4xl text-sm text-[#1D1B1A]/85 font-light leading-relaxed">
              {activeTab === "story" && (
                <div className="space-y-4">
                  <p className="font-serif text-xl italic text-[#3A2419]">
                    {product.story ||
                      "Rooted in ancient Indian metallurgical guilds, this piece is individually forged on an anvil by seventh-generation Thathera masters."}
                  </p>
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === "specs" && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-[#1D1B1A10]">
                        <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider w-48">
                          Primary Alloy
                        </th>
                        <td className="py-3 text-[#1D1B1A]">{product.material}</td>
                      </tr>
                      <tr className="border-b border-[#1D1B1A10]">
                        <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                          Artisan Finish
                        </th>
                        <td className="py-3 text-[#1D1B1A]">{product.finish}</td>
                      </tr>
                      {selectedVariant?.capacity && (
                        <tr className="border-b border-[#1D1B1A10]">
                          <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                            Volume Capacity
                          </th>
                          <td className="py-3 text-[#1D1B1A]">
                            {selectedVariant.capacity}
                          </td>
                        </tr>
                      )}
                      {selectedVariant?.diameter && (
                        <tr className="border-b border-[#1D1B1A10]">
                          <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                            Diameter
                          </th>
                          <td className="py-3 text-[#1D1B1A]">
                            {selectedVariant.diameter}
                          </td>
                        </tr>
                      )}
                      {selectedVariant?.height && (
                        <tr className="border-b border-[#1D1B1A10]">
                          <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                            Height
                          </th>
                          <td className="py-3 text-[#1D1B1A]">
                            {selectedVariant.height}
                          </td>
                        </tr>
                      )}
                      {selectedVariant?.weight && (
                        <tr className="border-b border-[#1D1B1A10]">
                          <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                            Approximate Weight
                          </th>
                          <td className="py-3 text-[#1D1B1A]">
                            {selectedVariant.weight}
                          </td>
                        </tr>
                      )}
                      <tr className="border-b border-[#1D1B1A10]">
                        <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                          Food Contact Safety
                        </th>
                        <td className="py-3 text-emerald-800 font-medium">
                          100% Food-Grade Certified
                        </td>
                      </tr>
                      {product.kalai_tinned && (
                        <tr className="border-b border-[#1D1B1A10]">
                          <th className="py-3 pr-4 font-semibold text-[#1B0B22] uppercase tracking-wider">
                            Traditional Tinning
                          </th>
                          <td className="py-3 text-[#1D1B1A]">
                            Interior lined with pure 99.9% tin (Kalai) for slow
                            curry cooking
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "care" && (
                <div className="space-y-4">
                  <h4 className="font-serif text-lg text-[#1B0B22]">
                    Preserving Your Heirloom Metalware
                  </h4>
                  <p>
                    {product.care_instructions ||
                      "Wash gently by hand with warm soapy water and a soft sponge. Never use harsh abrasive scouring pads. Dry immediately with a clean cotton towel to prevent water spotting."}
                  </p>
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-1">
                    <strong className="block font-semibold">
                      Natural Patina Evolution:
                    </strong>
                    <span>
                      Pure brass and copper will naturally develop a distinguished,
                      living patina over time. To restore its mirror-like golden
                      gleam, polish occasionally with pitambari powder or a paste of
                      fresh lemon juice and fine sea salt.
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <p>
                    {product.shipping_info ||
                      "Each piece is individually wrapped in anti-tarnish cloth sleeves and packaged in reinforced presentation trunks. Dispatched with insured white-glove courier services."}
                  </p>
                  <p className="text-xs text-[#1D1B1A]/70">
                    Expected transit timeline: 4-6 business days within India.
                    International shipping available upon enquiry with custom duties
                    handled door-to-door.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        product={product}
        selectedVariantId={selectedVariantId}
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </>
  );
}
