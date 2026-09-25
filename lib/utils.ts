import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes cleanly with clsx and twMerge.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a numeric price into Indian Rupee (INR) representation.
 * Returns null or "Price Upon Request" if null/0.
 */
export function formatINR(price: number | null | undefined): string {
  if (price === null || price === undefined || price <= 0) {
    return "Enquire for Price";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Generates a URL-friendly slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

/**
 * Generates a WhatsApp click-to-chat URL with pre-filled inquiry text.
 */
export function generateWhatsAppUrl(options: {
  phone: string;
  productName?: string;
  variantName?: string;
  sku?: string;
  url?: string;
}): string {
  const cleanPhone = options.phone.replace(/[^0-9]/g, "");
  let message = `Namaste Tamraaya Concierge,\n\nI would like to enquire about`;
  if (options.productName) {
    message += ` *${options.productName}*`;
    if (options.variantName) {
      message += ` (${options.variantName})`;
    }
    if (options.sku) {
      message += ` [SKU: ${options.sku}]`;
    }
  } else {
    message += ` handcrafted metalware from your collection`;
  }
  if (options.url) {
    message += `\nReference: ${options.url}`;
  }
  message += `.\n\nPlease share details on availability, customization, and lead time.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
