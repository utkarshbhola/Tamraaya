import { z } from "zod";

export const homepageSectionSchema = z.object({
  id: z.string().uuid().optional(),
  section_key: z.string().min(2),
  section_type: z.enum([
    "hero",
    "featured_products",
    "collection_grid",
    "brand_story",
    "image_banner",
    "craftsmanship_values",
    "enquiry_banner",
  ]),
  title: z.string().nullable().optional(),
  subtitle: z.string().nullable().optional(),
  content: z.record(z.string(), z.any()),
  sort_order: z.coerce.number().default(0),
  is_active: z.boolean().default(true),
});

export type HomepageSectionValues = z.infer<typeof homepageSectionSchema>;
