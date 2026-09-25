"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, CheckCircle, Archive, Eye } from "lucide-react";
import { MOCK_PRODUCTS } from "@/lib/data/mock-data";
import { ProductWithRelations } from "@/types/database.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";

export default function StudioProductsPage() {
  const [products, setProducts] = React.useState<ProductWithRelations[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [deleteModalProduct, setDeleteModalProduct] = React.useState<ProductWithRelations | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.variants.some((v) => v.sku.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus =
      statusFilter === "all" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id: string, newStatus: "published" | "archived" | "draft") => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const confirmDelete = () => {
    if (deleteModalProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteModalProduct.id));
      setDeleteModalProduct(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">
            Products
          </h1>
        </div>

        <Link
          href="/studio/products/new"
          className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-wider font-semibold bg-[#1B0B22] text-[#D8B875] hover:bg-[#2B1234] border border-[#C9A45C40] w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#1D1B1A15] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#1D1B1A]/40" />
          <input
            type="text"
            placeholder="Search by title or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs border border-[#1D1B1A20] focus:border-[#C9A45C] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] uppercase tracking-wider text-[#1D1B1A]/60 font-semibold">
            Status:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 text-xs border border-[#1D1B1A20] px-3 bg-white focus:outline-none focus:border-[#C9A45C]"
          >
            <option value="all">All Statuses ({products.length})</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="bg-white border border-[#1D1B1A15] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#1D1B1A15] text-[#1D1B1A]/70 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 w-16">Image</th>
                <th className="py-3 px-4">Product Name</th>
                <th className="py-3 px-4">Primary SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Variants</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D1B1A10]">
              {filteredProducts.map((p) => {
                const heroImg =
                  p.images.find((img) => img.image_type === "hero") || p.images[0];
                const primaryVariant = p.variants[0];

                return (
                  <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="relative h-12 w-12 rounded-none overflow-hidden bg-[#ECE4D6] border border-[#1D1B1A15]">
                        {heroImg && (
                          <Image
                            src={heroImg.url}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-cover object-center"
                          />
                        )}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#1B0B22]">{p.name}</div>
                      <div className="text-[10px] text-[#1D1B1A]/50">
                        /{p.slug}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-[11px] text-[#8C6D2B]">
                      {primaryVariant?.sku || "N/A"}
                    </td>

                    <td className="py-3 px-4 text-[#1D1B1A]/80">
                      {p.category?.name || "Unassigned"}
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-medium text-[#1B0B22]">
                        {p.material}
                      </span>
                      {p.finish && (
                        <span className="block text-[10px] text-[#1D1B1A]/50">
                          {p.finish}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          p.status === "published"
                            ? "published"
                            : p.status === "draft"
                            ? "draft"
                            : "archived"
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-[#1D1B1A]/70">
                      {p.variants.length} ({formatINR(primaryVariant?.price)})
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          target="_blank"
                          title="View on Storefront"
                          className="p-1.5 text-[#1D1B1A]/60 hover:text-[#1B0B22]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          href={`/studio/products/${p.id}`}
                          title="Edit Product"
                          className="p-1.5 text-[#1D1B1A]/60 hover:text-[#8C6D2B]"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>

                        {p.status === "published" ? (
                          <button
                            type="button"
                            onClick={() => toggleStatus(p.id, "archived")}
                            title="Archive Product"
                            className="p-1.5 text-[#1D1B1A]/60 hover:text-amber-700"
                          >
                            <Archive className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleStatus(p.id, "published")}
                            title="Publish Product"
                            className="p-1.5 text-[#1D1B1A]/60 hover:text-emerald-700"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => setDeleteModalProduct(p)}
                          title="Delete Product"
                          className="p-1.5 text-[#1D1B1A]/60 hover:text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 bg-[#1B0B22]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-red-300 max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl text-[#1B0B22]">
              Delete &ldquo;{deleteModalProduct.name}&rdquo;?
            </h3>
            <p className="text-xs text-[#1D1B1A]/70 leading-relaxed">
              Are you sure you want to permanently delete this product and its
              associated variants and image records? This action will be recorded in
              the studio audit logs and cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                className="px-4 py-2 text-xs uppercase tracking-wider font-semibold border border-[#1D1B1A30]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-red-700 text-white hover:bg-red-800"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
