import * as React from "react";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/studio/product-form";
import { MOCK_PRODUCTS } from "@/lib/data/mock-data";

export const metadata = {
  title: "Edit Product | Tamraaya Studio",
};

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product =
    MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id) || MOCK_PRODUCTS[0];

  if (!product) {
    notFound();
  }

  return <ProductForm initialProduct={product} isEditing={true} />;
}
