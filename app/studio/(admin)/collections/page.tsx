"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Trash2, Layers } from "lucide-react";
import { MOCK_COLLECTIONS } from "@/lib/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function StudioCollectionsPage() {
  const [collections, setCollections] = React.useState(MOCK_COLLECTIONS);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [tagline, setTagline] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug) return;

    setCollections((prev) => [
      ...prev,
      {
        id: `b-new-${Date.now()}`,
        name,
        slug,
        tagline,
        description,
        hero_image_url:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
        featured: false,
        sort_order: prev.length + 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);

    setName("");
    setSlug("");
    setTagline("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Curated Ensembles
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">Collections</h1>
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={() => setModalOpen(true)}
          className="gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Collection</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-white border border-[#1D1B1A15] shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] w-full bg-[#1B0B22]">
              {col.hero_image_url && (
                <Image
                  src={col.hero_image_url}
                  alt={col.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-80"
                />
              )}
              {col.featured && (
                <span className="absolute top-3 left-3 bg-[#1B0B22] text-[#D8B875] text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#C9A45C40]">
                  Featured
                </span>
              )}
            </div>

            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C6D2B] font-semibold block">
                  {col.tagline || "Atelier Series"}
                </span>
                <h3 className="font-serif text-xl text-[#1B0B22]">{col.name}</h3>
                <p className="text-xs text-[#1D1B1A]/70 line-clamp-2 mt-1">
                  {col.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1D1B1A10] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#1D1B1A]/50">
                  /{col.slug}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCollections((prev) =>
                      prev.filter((c) => c.id !== col.id)
                    )
                  }
                  className="text-red-600 hover:text-red-800 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Collection Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B0B22]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleCreate}
            className="bg-white border border-[#C9A45C] max-w-lg w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="font-serif text-xl text-[#1B0B22]">
              Create New Collection
            </h3>
            <Input
              label="Collection Title *"
              placeholder="e.g. Royal Rajputana Banquet"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
              }}
              required
            />
            <Input
              label="Slug *"
              placeholder="e.g. royal-rajputana-banquet"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
            <Input
              label="Tagline"
              placeholder="e.g. Heavy-gauge banquet masterworks"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            />
            <Textarea
              label="Narrative Description"
              placeholder="Atmospheric story of this series..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
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
                Create Collection
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
