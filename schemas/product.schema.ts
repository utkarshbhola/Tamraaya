import { z } from "zod";
import { MATERIALS, FINISHES } from "@/lib/constants";

export const productVariantSchema = z.object({
  id: z.string().uuid().optional(),
  sku: z
    .string()
    .min(3, "SKU must be at least 3 characters")
    .max(50, "SKU cannot exceed 50 characters")
    .regex(/^[A-Z0-9\-_]+$/, "SKU should only contain uppercase letters, numbers, hyphens, or underscores"),
  name: z.string().min(2, "Variant name is required"),
  price: z.coerce.number().min(0, "Price cannot be negative").nullable().optional(),
  capacity: z.string().nullable().optional(),
  diameter: z.string().nullable().optional(),
  height: z.string().nullable().optional(),
  width: z.string().nullable().optional(),
  weight: z.string().nullable().optional(),
  finish: z.string().nullable().optional(),
  stock_status: z.enum(["in_stock", "made_to_order", "out_of_stock"]).default("in_stock"),
  sort_order: z.coerce.number().default(0),
});

export const productImageSchema = z.object({
  id: z.string().uuid().optional(),
  url: z.string().url("Must be a valid URL"),
  alt_text: z.string().nullable().optional(),
  image_type: z.enum(["hero", "gallery", "detail", "lifestyle", "packaging", "dimensions"]).default("gallery"),
  sort_order: z.coerce.number().default(0),
});

export const productFormSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3, "Product name must be at least 3 characters").max(200),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9\-]+$/, "Slug can only contain lowercase alphanumeric characters and hyphens"),
  short_description: z.string().min(10, "Please provide a concise summary").max(300),
  description: z.string().min(20, "Detailed description is required"),
  category_id: z.string().uuid().nullable().optional(),
  material: z.enum(MATERIALS),
  finish: z.string().min(2, "Finish is required"),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  featured: z.boolean().default(false),
  food_safe: z.boolean().nullable().optional(),
  kalai_tinned: z.boolean().default(false),
  care_instructions: z.string().nullable().optional(),
  story: z.string().nullable().optional(),
  shipping_info: z.string().nullable().optional(),
  variants: z.array(productVariantSchema).min(1, "At least one product variant/size is required"),
  images: z.array(productImageSchema).min(1, "At least one product image is required"),
  collection_ids: z.array(z.string().uuid()).optional().default([]),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductVariantValues = z.infer<typeof productVariantSchema>;
export type ProductImageValues = z.infer<typeof productImageSchema>;
