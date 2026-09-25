import * as React from "react";
import { ProductForm } from "@/components/studio/product-form";

export const metadata = {
  title: "Create New Product | Tamraaya Studio",
};

export default function NewProductPage() {
  return <ProductForm isEditing={false} />;
}
