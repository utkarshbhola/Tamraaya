"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, FolderTree } from "lucide-react";
import { MOCK_CATEGORIES } from "@/lib/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudioCategoriesPage() {
  const [categories, setCategories] = React.useState(MOCK_CATEGORIES);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setCategories((prev) => [
      ...prev,
      {
        id: `c-new-${Date.now()}`,
        name,
        slug,
        description,
        image_url:
          "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop",
        sort_order: prev.length + 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    setName("");
    setSlug("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Catalog Structure
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">Categories</h1>
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={() => setModalOpen(true)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </Button>
      </div>

      <div className="bg-white border border-[#1D1B1A15] shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FAF7F2] border-b border-[#1D1B1A15] text-[#1D1B1A]/70 uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-16">Preview</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Sort Order</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D1B1A10]">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-[#FAF7F2]/60">
                <td className="py-3 px-4">
                  <div className="relative h-10 w-10 overflow-hidden bg-gray-200">
                    {cat.image_url && (
                      <Image
                        src={cat.image_url}
                        alt={cat.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-[#1B0B22]">
                  {cat.name}
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-[#8C6D2B]">
                  /{cat.slug}
                </td>
                <td className="py-3 px-4 text-[#1D1B1A]/70 max-w-xs truncate">
                  {cat.description}
                </td>
                <td className="py-3 px-4 text-center">{cat.sort_order}</td>
                <td className="py-3 px-4">
                  <Badge variant={cat.is_active ? "published" : "archived"}>
                    {cat.is_active ? "Active" : "Hidden"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() =>
                      setCategories((prev) =>
                        prev.filter((c) => c.id !== cat.id)
                      )
                    }
                    className="p-1.5 text-red-600 hover:text-red-800"
                    title="Delete Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B0B22]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-white border border-[#C9A45C] max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="font-serif text-xl text-[#1B0B22]">Add New Category</h3>
            <Input
              label="Category Name *"
              placeholder="e.g. Copper Serveware"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              required
            />
            <Input
              label="Slug *"
              placeholder="e.g. copper-serveware"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <Input
              label="Short Description"
              placeholder="Summary of this culinary category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end gap-3 pt-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="gold">
                Create Category
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
