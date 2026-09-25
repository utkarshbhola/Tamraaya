import * as React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getProducts } from "@/lib/products/queries";
import { ProductDetailView } from "@/components/storefront/product-detail-view";
import { ProductCard } from "@/components/storefront/product-card";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Piece Not Found | Tamraaya",
    };
  }

  const heroImage =
    product.images.find((img) => img.image_type === "hero") ||
    product.images[0];

  return {
    title: `${product.name} - Handcrafted ${product.material}`,
    description:
      product.short_description ||
      `Discover the ${product.name}, hand-hammered from pure ${product.material} by Tamraaya artisans.`,
    openGraph: {
      title: `${product.name} | TAMRAAYA`,
      description: product.short_description || undefined,
      images: heroImage ? [{ url: heroImage.url, alt: product.name }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related pieces in same material or category
  const { products: allProducts } = await getProducts({
    material: product.material,
    limit: 4,
  });
  const relatedProducts = allProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <ProductDetailView product={product} />

      {/* Related Heirlooms */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-[#F6F0E6] border-t border-[#1D1B1A15]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
                Complementary Pieces
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1B0B22]">
                You May Also Cherish
              </h3>
              <div className="w-12 h-[1px] bg-[#C9A45C] mx-auto my-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
