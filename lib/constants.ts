export const BRAND = {
  name: "TAMRAAYA",
  tagline: "Rooted in Tradition. Designed for You.",
  legalName: "Tamraaya Luxury Metalcraft Pvt. Ltd.",
  description:
    "Premium kitchen and tableware handcrafted from brass, copper, bronze, and mixed metals.",
  conciergePhone: "+919876543210",
  conciergeEmail: "concierge@tamraaya.com",
  instagram: "@tamraaya.official",
} as const;

export const MATERIALS = [
  "Brass",
  "Copper",
  "Bronze",
  "Mixed Metal",
] as const;

export type Material = (typeof MATERIALS)[number];

export const CATEGORIES = [
  "Cookware",
  "Serveware",
  "Tableware",
  "Drinkware",
  "Kitchen Accessories",
  "Gift Sets",
  "Decor",
] as const;

export type CategoryName = (typeof CATEGORIES)[number];

export const FINISHES = [
  "Hammered",
  "Polished",
  "Antique",
  "Matte",
  "Brushed",
] as const;

export type Finish = (typeof FINISHES)[number];

export const STOCK_STATUSES = [
  { value: "in_stock", label: "In Stock" },
  { value: "made_to_order", label: "Made to Order" },
  { value: "out_of_stock", label: "Out of Stock" },
] as const;

export const PRODUCT_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
] as const;

export const ROLES = [
  "customer",
  "sales",
  "catalog_manager",
  "content_manager",
  "super_admin",
] as const;

export type Role = (typeof ROLES)[number];

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured Pieces" },
  { value: "newest", label: "Newest Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;
