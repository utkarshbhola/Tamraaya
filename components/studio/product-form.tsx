"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Save,
  Eye,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  MATERIALS,
  FINISHES,
  STOCK_STATUSES,
  type Material,
} from "@/lib/constants";
import { MOCK_CATEGORIES, MOCK_COLLECTIONS } from "@/lib/data/mock-data";
import { ProductWithRelations } from "@/types/database.types";
import {
  productFormSchema,
  ProductFormValues,
  ProductVariantValues,
  ProductImageValues,
} from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

export interface ProductFormProps {
  initialProduct?: ProductWithRelations;
  isEditing?: boolean;
}

export function ProductForm({
  initialProduct,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  // Basic Information
  const [name, setName] = React.useState(initialProduct?.name || "");
  const [slug, setSlug] = React.useState(initialProduct?.slug || "");
  const [shortDescription, setShortDescription] = React.useState(
    initialProduct?.short_description || ""
  );
  const [description, setDescription] = React.useState(
    initialProduct?.description || ""
  );

  // Classification
  const [categoryId, setCategoryId] = React.useState(
    initialProduct?.category_id || MOCK_CATEGORIES[0].id
  );
  const [material, setMaterial] = React.useState<Material>(
    initialProduct?.material || "Brass"
  );
  const [selectedCollectionIds, setSelectedCollectionIds] = React.useState<
    string[]
  >(initialProduct?.collections?.map((c) => c.id) || []);

  // Specifications
  const [finish, setFinish] = React.useState(
    initialProduct?.finish || "Hand Hammered"
  );
  const [foodSafe, setFoodSafe] = React.useState<boolean | null>(
    initialProduct ? initialProduct.food_safe ?? null : null
  );
  const [kalaiTinned, setKalaiTinned] = React.useState(
    initialProduct ? initialProduct.kalai_tinned : false
  );
  const [careInstructions, setCareInstructions] = React.useState(
    initialProduct?.care_instructions || ""
  );
  const [story, setStory] = React.useState(initialProduct?.story || "");
  const [shippingInfo, setShippingInfo] = React.useState(
    initialProduct?.shipping_info || ""
  );

  // Variants
  const [variants, setVariants] = React.useState<ProductVariantValues[]>(
    initialProduct?.variants?.length
      ? initialProduct.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          name: v.name,
          price: v.price || 0,
          capacity: v.capacity || "",
          diameter: v.diameter || "",
          height: v.height || "",
          weight: v.weight || "",
          finish: v.finish || "",
          stock_status: v.stock_status,
          sort_order: v.sort_order,
        }))
      : [
          {
            sku: "TAM-NEW-01",
            name: "Standard Piece",
            price: 4999,
            capacity: "1.5L",
            diameter: "20 cm",
            height: "12 cm",
            weight: "1.2 kg",
            finish: "Hand Hammered",
            stock_status: "in_stock",
            sort_order: 1,
          },
        ]
  );

  // Images
  const [images, setImages] = React.useState<ProductImageValues[]>(
    initialProduct?.images?.length
      ? initialProduct.images.map((img) => ({
          id: img.id,
          url: img.url,
          alt_text: img.alt_text || "",
          image_type: img.image_type,
          sort_order: img.sort_order,
        }))
      : [
          {
            url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1200&auto=format&fit=crop",
            alt_text: "Hero perspective",
            image_type: "hero",
            sort_order: 1,
          },
        ]
  );

  // Publishing
  const [status, setStatus] = React.useState<ProductFormValues["status"]>(
    initialProduct?.status || "draft"
  );
  const [featured, setFeatured] = React.useState(
    initialProduct ? initialProduct.featured : false
  );

  // Validation & feedback state
  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string[]>
  >({});
  const [feedbackMessage, setFeedbackMessage] = React.useState<string | null>(
    null
  );
  const [isSaving, setIsSaving] = React.useState(false);

  // Auto-slug on name change if not editing existing slug
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        sku: `TAM-${Math.floor(100 + Math.random() * 900)}`,
        name: `Size ${prev.length + 1}`,
        price: 0,
        capacity: "",
        diameter: "",
        height: "",
        weight: "",
        finish: finish,
        stock_status: "in_stock",
        sort_order: prev.length + 1,
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddImage = () => {
    setImages((prev) => [
      ...prev,
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
        alt_text: "Product perspective",
        image_type: "gallery",
        sort_order: prev.length + 1,
      },
    ]);
  };

  const handleRemoveImage = (index: number) => {
    if (images.length > 1) {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = async (targetStatus?: "draft" | "published" | "archived") => {
    const finalStatus = targetStatus || status;
    setIsSaving(true);
    setValidationErrors({});
    setFeedbackMessage(null);

    const formData: ProductFormValues = {
      name,
      slug,
      short_description: shortDescription,
      description,
      category_id: categoryId,
      material,
      finish,
      status: finalStatus,
      featured,
      food_safe: foodSafe ?? null,
      kalai_tinned: kalaiTinned,
      care_instructions: careInstructions,
      story,
      shipping_info: shippingInfo,
      variants,
      images,
      collection_ids: selectedCollectionIds,
    };

    const parseResult = productFormSchema.safeParse(formData);

    if (!parseResult.success) {
      setIsSaving(false);
      setValidationErrors(parseResult.error.flatten().fieldErrors);
      setFeedbackMessage("Please resolve the validation errors highlighted below.");
      return;
    }

    // Success simulation / DB save
    setTimeout(() => {
      setIsSaving(false);
      setStatus(finalStatus);
      setFeedbackMessage(
        `Product successfully saved and marked as ${finalStatus.toUpperCase()}.`
      );
    }, 600);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header & Publishing Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-16 bg-[#F6F0E6]/95 backdrop-blur-sm py-4 z-20 border-b border-[#1D1B1A15]">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            {isEditing ? "Edit Masterpiece" : "New Piece Creation"}
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">
            {name || "Untitled Handcrafted Vessel"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {slug && (
            <Link
              href={`/products/${slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 h-10 px-3.5 border border-[#1D1B1A30] bg-white text-xs uppercase tracking-wider font-semibold text-[#1D1B1A] hover:border-[#C9A45C]"
            >
              <Eye className="w-3.5 h-3.5 text-[#8C6D2B]" />
              <span>Preview</span>
            </Link>
          )}

          <Button
            type="button"
            variant="ghost"
            onClick={() => handleSave("draft")}
            isLoading={isSaving && status === "draft"}
            className="border border-[#1D1B1A20] bg-white"
          >
            Save Draft
          </Button>

          <Button
            type="button"
            variant="gold"
            onClick={() => handleSave("published")}
            isLoading={isSaving && status === "published"}
          >
            Publish Live
          </Button>
        </div>
      </div>

      {feedbackMessage && (
        <div
          className={`p-4 border text-xs flex items-center gap-2 ${
            Object.keys(validationErrors).length > 0
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-800"
          }`}
        >
          {Object.keys(validationErrors).length > 0 ? (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Editor Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Inputs (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Basic Information */}
          <div className="bg-white border border-[#1D1B1A15] p-6 shadow-sm space-y-5">
            <h3 className="font-serif text-lg text-[#1B0B22] border-b border-[#1D1B1A10] pb-2">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Product Title *"
                placeholder="e.g. Hammered Brass Handi"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                error={validationErrors.name?.[0]}
                required
              />
              <Input
                label="URL Slug *"
                placeholder="e.g. hammered-brass-handi"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                error={validationErrors.slug?.[0]}
                required
              />
            </div>

            <Textarea
              label="Short Summary *"
              placeholder="Concise overview displayed on catalog cards and meta descriptions..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              error={validationErrors.short_description?.[0]}
              rows={2}
              required
            />

            <Textarea
              label="Full Narrative Description *"
              placeholder="Detailed explanation of culinary behavior, forging technique, and heritage lineage..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={validationErrors.description?.[0]}
              rows={5}
              required
            />
          </div>

          {/* 2. Classification & Metallurgy */}
          <div className="bg-white border border-[#1D1B1A15] p-6 shadow-sm space-y-5">
            <h3 className="font-serif text-lg text-[#1B0B22] border-b border-[#1D1B1A10] pb-2">
              2. Classification & Metallurgy
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                  Primary Alloy *
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value as Material)}
                  className="flex h-11 w-full border border-[#1D1B1A25] bg-[#FAF7F2] px-3 text-xs uppercase tracking-wider text-[#1B0B22] focus:border-[#C9A45C] focus:outline-none"
                >
                  {MATERIALS.map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                  Category *
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="flex h-11 w-full border border-[#1D1B1A25] bg-[#FAF7F2] px-3 text-xs text-[#1B0B22] focus:border-[#C9A45C] focus:outline-none"
                >
                  {MOCK_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                  Artisan Finish *
                </label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="flex h-11 w-full border border-[#1D1B1A25] bg-[#FAF7F2] px-3 text-xs text-[#1B0B22] focus:border-[#C9A45C] focus:outline-none"
                >
                  {FINISHES.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Collections Multi-Select */}
            <div className="space-y-2 pt-2">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                Associated Collections
              </label>
              <div className="flex flex-wrap gap-2">
                {MOCK_COLLECTIONS.map((col) => {
                  const isChecked = selectedCollectionIds.includes(col.id);
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setSelectedCollectionIds((prev) =>
                            prev.filter((id) => id !== col.id)
                          );
                        } else {
                          setSelectedCollectionIds((prev) => [...prev, col.id]);
                        }
                      }}
                      className={`px-3 py-1.5 text-xs border transition-all ${
                        isChecked
                          ? "bg-[#1B0B22] text-[#D8B875] border-[#1B0B22]"
                          : "bg-white text-[#1D1B1A] border-[#1D1B1A25] hover:border-[#C9A45C]"
                      }`}
                    >
                      {col.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Variants Matrix */}
          <div className="bg-white border border-[#1D1B1A15] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#1D1B1A10] pb-2">
              <h3 className="font-serif text-lg text-[#1B0B22]">
                3. Size & Dimensional Variants
              </h3>
              <button
                type="button"
                onClick={handleAddVariant}
                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#8C6D2B] hover:text-[#1B0B22]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Variant</span>
              </button>
            </div>

            <div className="space-y-4">
              {variants.map((v, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[#1D1B1A15] bg-[#FAF7F2] space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#8C6D2B]">
                      Variant #{idx + 1}
                    </span>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveVariant(idx)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Remove Variant"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <Input
                        label="Variant Name *"
                        placeholder="e.g. 2.5 Litre (Medium)"
                        value={v.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === idx ? { ...item, name: val } : item
                            )
                          );
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="SKU *"
                        placeholder="TAM-HND-25L"
                        value={v.sku}
                        onChange={(e) => {
                          const val = e.target.value;
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === idx ? { ...item, sku: val } : item
                            )
                          );
                        }}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        label="Price (INR)"
                        type="number"
                        placeholder="6499"
                        value={v.price || ""}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === idx ? { ...item, price: val } : item
                            )
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                    <Input
                      label="Capacity"
                      placeholder="2.5L"
                      value={v.capacity || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, capacity: val } : item
                          )
                        );
                      }}
                    />
                    <Input
                      label="Diameter"
                      placeholder="22 cm"
                      value={v.diameter || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, diameter: val } : item
                          )
                        );
                      }}
                    />
                    <Input
                      label="Weight"
                      placeholder="1.8 kg"
                      value={v.weight || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVariants((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, weight: val } : item
                          )
                        );
                      }}
                    />
                    <div className="space-y-1.5">
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                        Availability
                      </label>
                      <select
                        value={v.stock_status}
                        onChange={(e) => {
                          const val = e.target.value as ProductVariantValues["stock_status"];
                          setVariants((prev) =>
                            prev.map((item, i) =>
                              i === idx ? { ...item, stock_status: val } : item
                            )
                          );
                        }}
                        className="flex h-11 w-full border border-[#1D1B1A25] bg-white px-2 text-xs text-[#1B0B22] focus:outline-none"
                      >
                        <option value="in_stock">In Stock</option>
                        <option value="made_to_order">Made to Order</option>
                        <option value="out_of_stock">Out of Stock</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Media Management */}
          <div className="bg-white border border-[#1D1B1A15] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#1D1B1A10] pb-2">
              <h3 className="font-serif text-lg text-[#1B0B22]">
                4. High-Res Product Media
              </h3>
              <button
                type="button"
                onClick={handleAddImage}
                className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-[#8C6D2B] hover:text-[#1B0B22]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="space-y-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-[#1D1B1A15] bg-[#FAF7F2] flex flex-col sm:flex-row gap-4 items-start"
                >
                  <div className="relative h-20 w-20 flex-shrink-0 bg-gray-200 border border-[#1D1B1A20] overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt_text || "Preview"}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <Input
                          label="Image URL *"
                          placeholder="https://..."
                          value={img.url}
                          onChange={(e) => {
                            const val = e.target.value;
                            setImages((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, url: val } : item
                              )
                            );
                          }}
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                          Perspective Type
                        </label>
                        <select
                          value={img.image_type}
                          onChange={(e) => {
                            const val = e.target.value as ProductImageValues["image_type"];
                            setImages((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, image_type: val } : item
                              )
                            );
                          }}
                          className="flex h-11 w-full border border-[#1D1B1A25] bg-white px-2 text-xs text-[#1B0B22] focus:outline-none"
                        >
                          <option value="hero">Hero Primary</option>
                          <option value="gallery">Gallery View</option>
                          <option value="detail">Hammer Detail</option>
                          <option value="lifestyle">Lifestyle Setting</option>
                          <option value="packaging">Packaging Box</option>
                        </select>
                      </div>
                    </div>

                    <Input
                      label="Alt Text / Accessibility Label"
                      placeholder="e.g. Hand-hammered brass handi with pure tin lining"
                      value={img.alt_text || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setImages((prev) =>
                          prev.map((item, i) =>
                            i === idx ? { ...item, alt_text: val } : item
                          )
                        );
                      }}
                    />
                  </div>

                  {images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-red-600 hover:text-red-800 p-1 self-start sm:self-center"
                      title="Remove Image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Publishing, Toggles, Specifications (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status & Visibility Card */}
          <div className="bg-white border border-[#1D1B1A15] p-5 shadow-sm space-y-4">
            <h4 className="font-serif text-base text-[#1B0B22] border-b border-[#1D1B1A10] pb-2">
              Publishing Controls
            </h4>

            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                Catalog Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ProductFormValues["status"])}
                className="flex h-11 w-full border border-[#1D1B1A25] bg-[#FAF7F2] px-3 text-xs uppercase font-semibold text-[#1B0B22] focus:outline-none"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Live Storefront)</option>
                <option value="archived">Archived (Hidden)</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-2.5 text-xs text-[#1D1B1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="h-4 w-4 accent-[#1B0B22]"
                />
                <span>Feature on Homepage Spotlight</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#1D1B1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={foodSafe === true}
                  onChange={(e) => setFoodSafe(e.target.checked)}
                  className="h-4 w-4 accent-[#1B0B22]"
                />
                <span>Food-safe verified</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs text-[#1D1B1A] cursor-pointer">
                <input
                  type="checkbox"
                  checked={kalaiTinned}
                  onChange={(e) => setKalaiTinned(e.target.checked)}
                  className="h-4 w-4 accent-[#1B0B22]"
                />
                <span>Kalai (Pure Tin) Lined Interior</span>
              </label>
            </div>
          </div>

          {/* Care, Story & Shipping Inputs */}
          <div className="bg-white border border-[#1D1B1A15] p-5 shadow-sm space-y-4">
            <h4 className="font-serif text-base text-[#1B0B22] border-b border-[#1D1B1A10] pb-2">
              Editorial Content
            </h4>

            <Textarea
              label="Artisan Heritage Story"
              placeholder="e.g. Rooted in the royal kitchens of Awadh..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={3}
            />

            <Textarea
              label="Care Instructions"
              placeholder="Wash with warm soapy water and soft cotton..."
              value={careInstructions}
              onChange={(e) => setCareInstructions(e.target.value)}
              rows={3}
            />

            <Textarea
              label="Shipping & Packaging Info"
              placeholder="Complimentary insured delivery in reinforced wooden trunks..."
              value={shippingInfo}
              onChange={(e) => setShippingInfo(e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
