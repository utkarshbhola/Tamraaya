"use client";

import * as React from "react";
import Image from "next/image";
import {
  Upload,
  Copy,
  Trash2,
  Search,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MediaItem {
  id: string;
  url: string;
  alt_text: string;
  image_type: "hero" | "gallery" | "detail" | "lifestyle" | "packaging";
  created_at: string;
}

export default function StudioMediaPage() {
  const [mediaList, setMediaList] = React.useState<MediaItem[]>([
    {
      id: "m-1",
      url: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1200&auto=format&fit=crop",
      alt_text: "Hammered brass handi on wooden countertop",
      image_type: "hero",
      created_at: "2026-09-20",
    },
    {
      id: "m-2",
      url: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop",
      alt_text: "Pure copper matka with brass dispensing tap",
      image_type: "hero",
      created_at: "2026-09-21",
    },
    {
      id: "m-3",
      url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop",
      alt_text: "Kansa royal thali banquet dining set",
      image_type: "lifestyle",
      created_at: "2026-09-22",
    },
    {
      id: "m-4",
      url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
      alt_text: "Master artisan striking metal on anvil in flame light",
      image_type: "detail",
      created_at: "2026-09-23",
    },
    {
      id: "m-5",
      url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
      alt_text: "Traditional brass kadai in kitchen setting",
      image_type: "gallery",
      created_at: "2026-09-24",
    },
  ]);

  const [search, setSearch] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = React.useState("");
  const [uploadAlt, setUploadAlt] = React.useState("");
  const [uploadType, setUploadType] = React.useState<MediaItem["image_type"]>("gallery");
  const [modalOpen, setModalOpen] = React.useState(false);

  const filteredMedia = mediaList.filter((m) =>
    m.alt_text.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl) return;

    setMediaList((prev) => [
      {
        id: `m-${Date.now()}`,
        url: uploadUrl,
        alt_text: uploadAlt || "Tamraaya metalware",
        image_type: uploadType,
        created_at: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);

    setUploadUrl("");
    setUploadAlt("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Supabase Storage & CDN
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">Media Library</h1>
        </div>

        <Button
          variant="gold"
          size="md"
          onClick={() => setModalOpen(true)}
          className="gap-1.5"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Image / Link Asset</span>
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white border border-[#1D1B1A15] p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#1D1B1A]/40" />
        <input
          type="text"
          placeholder="Filter media assets by alt text..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs focus:outline-none"
        />
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="group bg-white border border-[#1D1B1A15] overflow-hidden shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full bg-[#1B0B22]">
              <Image
                src={item.url}
                alt={item.alt_text}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-[#1B0B22]/80 backdrop-blur-sm text-[#D8B875] text-[9px] uppercase tracking-wider px-2 py-0.5 border border-[#C9A45C30]">
                {item.image_type}
              </span>
            </div>

            <div className="p-3.5 space-y-2">
              <p className="text-xs text-[#1D1B1A] font-medium line-clamp-1">
                {item.alt_text}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#1D1B1A10]">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(item)}
                  className="text-[11px] uppercase tracking-wider font-semibold text-[#8C6D2B] hover:text-[#1B0B22] flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMediaList((prev) => prev.filter((m) => m.id !== item.id))
                  }
                  className="p-1 text-red-600 hover:text-red-800"
                  title="Delete Asset"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B0B22]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleAddMedia}
            className="bg-white border border-[#C9A45C] max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="font-serif text-xl text-[#1B0B22]">
              Add Media Asset
            </h3>
            <Input
              label="Asset URL (Supabase Storage / CDN) *"
              placeholder="https://..."
              value={uploadUrl}
              onChange={(e) => setUploadUrl(e.target.value)}
              required
            />
            <Input
              label="Accessibility Alt Text *"
              placeholder="e.g. Copper surahi jug with carved brass handle"
              value={uploadAlt}
              onChange={(e) => setUploadAlt(e.target.value)}
              required
            />
            <div className="space-y-1.5">
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                Image Role
              </label>
              <select
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value as MediaItem["image_type"])}
                className="flex h-11 w-full border border-[#1D1B1A25] bg-white px-3 text-xs text-[#1B0B22] focus:outline-none"
              >
                <option value="hero">Hero Primary</option>
                <option value="gallery">Gallery Angle</option>
                <option value="detail">Hammer Detail</option>
                <option value="lifestyle">Banquet Setting</option>
                <option value="packaging">Gift Box Packaging</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="gold">
                Save to Library
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
