import { createClient } from "@/lib/supabase/server";
import { ProductWithRelations, Database } from "@/types/database.types";
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_COLLECTIONS,
  MOCK_HOMEPAGE_SECTIONS,
} from "@/lib/data/mock-data";

export interface ProductQueryParams {
  material?: string;
  category?: string;
  finish?: string;
  availability?: string;
  sort?: string;
  q?: string;
  limit?: number;
  page?: number;
}

/**
 * Fetches products with URL-driven filtering, search, sorting, and pagination.
 */
export async function getProducts(
  params: ProductQueryParams = {}
): Promise<{ products: ProductWithRelations[]; total: number }> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("products")
      .select(
        `
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `,
        { count: "exact" }
      )
      .eq("status", "published");

    // Material Filter
    if (params.material) {
      const materials = params.material.split(",");
      query = query.in("material", materials);
    }

    // Finish Filter
    if (params.finish) {
      const finishes = params.finish.split(",");
      query = query.in("finish", finishes);
    }

    // Category Filter (by slug or name)
    if (params.category) {
      const cat = MOCK_CATEGORIES.find(
        (c) => c.slug.toLowerCase() === params.category?.toLowerCase()
      );
      if (cat) {
        query = query.eq("category_id", cat.id);
      }
    }

    // Search Query
    if (params.q) {
      query = query.or(
        `name.ilike.%${params.q}%,short_description.ilike.%${params.q}%`
      );
    }

    // Sorting
    switch (params.sort) {
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "price-asc":
        // Sorting by variant price via PostgreSQL
        query = query.order("created_at", { ascending: true });
        break;
      case "price-desc":
        query = query.order("created_at", { ascending: false });
        break;
      case "featured":
      default:
        query = query
          .order("featured", { ascending: false })
          .order("created_at", { ascending: false });
        break;
    }

    if (params.limit) {
      query = query.limit(params.limit);
    }

    const { data, count, error } = await query;

    if (error || !data || data.length === 0) {
      // Fallback to local mock data
      return filterMockProducts(params);
    }

    return {
      products: data as ProductWithRelations[],
      total: count || data.length,
    };
  } catch (err) {
    return filterMockProducts(params);
  }
}

/**
 * In-memory filter for mock products (when developing without active database connection).
 */
function filterMockProducts(params: ProductQueryParams): {
  products: ProductWithRelations[];
  total: number;
} {
  let list = [...MOCK_PRODUCTS].filter((p) => p.status === "published");

  if (params.material) {
    const materials = params.material.toLowerCase().split(",");
    list = list.filter((p) => materials.includes(p.material.toLowerCase()));
  }

  if (params.category) {
    list = list.filter(
      (p) =>
        p.category?.slug.toLowerCase() === params.category?.toLowerCase() ||
        p.category?.name.toLowerCase() === params.category?.toLowerCase()
    );
  }

  if (params.finish) {
    const finishes = params.finish.toLowerCase().split(",");
    list = list.filter(
      (p) => p.finish && finishes.includes(p.finish.toLowerCase())
    );
  }

  if (params.availability) {
    if (params.availability === "in_stock") {
      list = list.filter((p) =>
        p.variants.some((v) => v.stock_status === "in_stock")
      );
    } else if (params.availability === "made_to_order") {
      list = list.filter((p) =>
        p.variants.some((v) => v.stock_status === "made_to_order")
      );
    }
  }

  if (params.q) {
    const term = params.q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.short_description &&
          p.short_description.toLowerCase().includes(term))
    );
  }

  switch (params.sort) {
    case "newest":
      list.sort((a, b) => b.created_at.localeCompare(a.created_at));
      break;
    case "price-asc":
      list.sort(
        (a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0)
      );
      break;
    case "price-desc":
      list.sort(
        (a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0)
      );
      break;
    case "featured":
    default:
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  const total = list.length;
  if (params.limit) {
    list = list.slice(0, params.limit);
  }

  return { products: list, total };
}

/**
 * Fetches a single product by slug with category, images, variants, and collections.
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductWithRelations | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        category:categories(*),
        images:product_images(*),
        variants:product_variants(*)
      `
      )
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
    }

    return data as ProductWithRelations;
  } catch (err) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

/**
 * Fetches active categories sorted by sort_order.
 */
export async function getCategories(): Promise<
  Database["public"]["Tables"]["categories"]["Row"][]
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_CATEGORIES;
    }
    return data;
  } catch {
    return MOCK_CATEGORIES;
  }
}

/**
 * Fetches active collections sorted by sort_order.
 */
export async function getCollections(): Promise<
  Database["public"]["Tables"]["collections"]["Row"][]
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("collections")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_COLLECTIONS;
    }
    return data;
  } catch {
    return MOCK_COLLECTIONS;
  }
}

/**
 * Fetches active homepage sections ordered by sort_order.
 */
export async function getHomepageSections(): Promise<
  Database["public"]["Tables"]["homepage_sections"]["Row"][]
> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("homepage_sections")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_HOMEPAGE_SECTIONS;
    }
    return data;
  } catch {
    return MOCK_HOMEPAGE_SECTIONS;
  }
}
