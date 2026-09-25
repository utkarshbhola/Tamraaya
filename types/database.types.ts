import { Material, Finish, Role } from "@/lib/constants";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          phone: string | null;
          role: Role;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          phone?: string | null;
          role?: Role;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: Role;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      collections: {
        Row: {
          id: string;
          name: string;
          slug: string;
          tagline: string | null;
          description: string | null;
          hero_image_url: string | null;
          featured: boolean;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          tagline?: string | null;
          description?: string | null;
          hero_image_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          tagline?: string | null;
          description?: string | null;
          hero_image_url?: string | null;
          featured?: boolean;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          slug: string;
          name: string;
          short_description: string | null;
          description: string | null;
          category_id: string | null;
          material: Material;
          finish: Finish | string | null;
          status: "draft" | "published" | "archived";
          featured: boolean;
          food_safe: boolean | null;
          kalai_tinned: boolean;
          care_instructions: string | null;
          story: string | null;
          shipping_info: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          short_description?: string | null;
          description?: string | null;
          category_id?: string | null;
          material: Material;
          finish?: Finish | string | null;
          status?: "draft" | "published" | "archived";
          featured?: boolean;
          food_safe?: boolean;
          kalai_tinned?: boolean;
          care_instructions?: string | null;
          story?: string | null;
          shipping_info?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          short_description?: string | null;
          description?: string | null;
          category_id?: string | null;
          material?: Material;
          finish?: Finish | string | null;
          status?: "draft" | "published" | "archived";
          featured?: boolean;
          food_safe?: boolean;
          kalai_tinned?: boolean;
          care_instructions?: string | null;
          story?: string | null;
          shipping_info?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          sku: string;
          name: string;
          price: number | null;
          capacity: string | null;
          diameter: string | null;
          height: string | null;
          width: string | null;
          weight: string | null;
          finish: string | null;
          stock_status: "in_stock" | "made_to_order" | "out_of_stock";
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          sku: string;
          name: string;
          price?: number | null;
          capacity?: string | null;
          diameter?: string | null;
          height?: string | null;
          width?: string | null;
          weight?: string | null;
          finish?: string | null;
          stock_status?: "in_stock" | "made_to_order" | "out_of_stock";
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          sku?: string;
          name?: string;
          price?: number | null;
          capacity?: string | null;
          diameter?: string | null;
          height?: string | null;
          width?: string | null;
          weight?: string | null;
          finish?: string | null;
          stock_status?: "in_stock" | "made_to_order" | "out_of_stock";
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          url: string;
          alt_text: string | null;
          image_type: "hero" | "gallery" | "detail" | "lifestyle" | "packaging" | "dimensions";
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          url: string;
          alt_text?: string | null;
          image_type?: "hero" | "gallery" | "detail" | "lifestyle" | "packaging" | "dimensions";
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          url?: string;
          alt_text?: string | null;
          image_type?: "hero" | "gallery" | "detail" | "lifestyle" | "packaging" | "dimensions";
          sort_order?: number;
          created_at?: string;
        };
      };
      product_collections: {
        Row: {
          product_id: string;
          collection_id: string;
          created_at: string;
        };
        Insert: {
          product_id: string;
          collection_id: string;
          created_at?: string;
        };
        Update: {
          product_id?: string;
          collection_id?: string;
          created_at?: string;
        };
      };
      enquiries: {
        Row: {
          id: string;
          enquiry_number: string;
          product_id: string | null;
          variant_id: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          message: string | null;
          status: "new" | "contacted" | "qualified" | "converted" | "closed";
          internal_notes: string | null;
          source: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          enquiry_number?: string;
          product_id?: string | null;
          variant_id?: string | null;
          customer_name: string;
          customer_email: string;
          customer_phone: string;
          message?: string | null;
          status?: "new" | "contacted" | "qualified" | "converted" | "closed";
          internal_notes?: string | null;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          enquiry_number?: string;
          product_id?: string | null;
          variant_id?: string | null;
          customer_name?: string;
          customer_email?: string;
          customer_phone?: string;
          message?: string | null;
          status?: "new" | "contacted" | "qualified" | "converted" | "closed";
          internal_notes?: string | null;
          source?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      homepage_sections: {
        Row: {
          id: string;
          section_key: string;
          section_type: "hero" | "featured_products" | "collection_grid" | "brand_story" | "image_banner" | "craftsmanship_values" | "enquiry_banner";
          title: string | null;
          subtitle: string | null;
          content: Json;
          sort_order: number;
          is_active: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          section_type: "hero" | "featured_products" | "collection_grid" | "brand_story" | "image_banner" | "craftsmanship_values" | "enquiry_banner";
          title?: string | null;
          subtitle?: string | null;
          content?: Json;
          sort_order?: number;
          is_active?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          section_type?: "hero" | "featured_products" | "collection_grid" | "brand_story" | "image_banner" | "craftsmanship_values" | "enquiry_banner";
          title?: string | null;
          subtitle?: string | null;
          content?: Json;
          sort_order?: number;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "ARCHIVE" | "LOGIN";
          entity: string;
          entity_id: string;
          changes: Json | null;
          ip_address: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "ARCHIVE" | "LOGIN";
          entity: string;
          entity_id: string;
          changes?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "ARCHIVE" | "LOGIN";
          entity?: string;
          entity_id?: string;
          changes?: Json | null;
          ip_address?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

// Base Row types for convenience
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Category = Database["public"]["Tables"]["categories"]["Row"];
export type Collection = Database["public"]["Tables"]["collections"]["Row"];
export type Product = Database["public"]["Tables"]["products"]["Row"];
export type ProductVariant = Database["public"]["Tables"]["product_variants"]["Row"];
export type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];
export type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
export type HomepageSection = Database["public"]["Tables"]["homepage_sections"]["Row"];
export type AuditLog = Database["public"]["Tables"]["audit_logs"]["Row"];

// Joined Product with Category, Images, Variants, Collections
export type ProductWithRelations = Product & {
  category?: Category | null;
  images: ProductImage[];
  variants: ProductVariant[];
  collections?: Collection[];
};
