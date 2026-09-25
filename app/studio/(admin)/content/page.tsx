"use client";

import * as React from "react";
import Image from "next/image";
import {
  Sparkles,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Edit,
  Save,
  CheckCircle,
} from "lucide-react";
import { MOCK_HOMEPAGE_SECTIONS } from "@/lib/data/mock-data";
import { Database } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SectionRow = Database["public"]["Tables"]["homepage_sections"]["Row"];

export default function StudioContentPage() {
  const [sections, setSections] = React.useState<SectionRow[]>(
    [...MOCK_HOMEPAGE_SECTIONS].sort((a, b) => a.sort_order - b.sort_order)
  );

  const [editingSectionId, setEditingSectionId] = React.useState<string | null>(
    null
  );
  const [editTitle, setEditTitle] = React.useState("");
  const [editSubtitle, setEditSubtitle] = React.useState("");
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const toggleSectionActive = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s))
    );
    setFeedback("Section visibility updated.");
    setTimeout(() => setFeedback(null), 2500);
  };

  const moveSection = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // Re-index sort_order
    const updated = newSections.map((s, idx) => ({
      ...s,
      sort_order: idx + 1,
    }));

    setSections(updated);
    setFeedback("Section display order saved.");
    setTimeout(() => setFeedback(null), 2500);
  };

  const startEdit = (sec: SectionRow) => {
    setEditingSectionId(sec.id);
    setEditTitle(sec.title || "");
    setEditSubtitle(sec.subtitle || "");
  };

  const saveEdit = (id: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, title: editTitle, subtitle: editSubtitle } : s
      )
    );
    setEditingSectionId(null);
    setFeedback("Section content successfully updated.");
    setTimeout(() => setFeedback(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Storefront Presentation CMS
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">
            Homepage Sections
          </h1>
        </div>

        {feedback && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-[#1D1B1A]/70 max-w-2xl leading-relaxed">
        Reorder, toggle, or edit editorial headings and copy across the public
        Tamraaya storefront. Changes take effect on the live website immediately.
      </p>

      {/* Sections List */}
      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <div
            key={sec.id}
            className={`p-5 bg-white border transition-all ${
              sec.is_active
                ? "border-[#1D1B1A15] shadow-sm"
                : "border-gray-200 opacity-60 bg-gray-50"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left Info */}
              <div className="flex items-center gap-4">
                {/* Order Index */}
                <span className="font-mono text-xs font-semibold text-[#8C6D2B] w-6 text-center">
                  #{sec.sort_order}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-mono text-[#D8B875] bg-[#1B0B22] px-2 py-0.5">
                      {sec.section_type}
                    </span>
                    <span className="text-[11px] font-mono text-[#1D1B1A]/40">
                      key: {sec.section_key}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1B0B22]">
                    {sec.title || "Untitled Section"}
                  </h3>
                  {sec.subtitle && (
                    <p className="text-xs text-[#1D1B1A]/70 font-light">
                      {sec.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveSection(idx, "up")}
                  className="p-2 border border-[#1D1B1A20] text-[#1D1B1A] disabled:opacity-30 hover:border-[#C9A45C]"
                  title="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={idx === sections.length - 1}
                  onClick={() => moveSection(idx, "down")}
                  className="p-2 border border-[#1D1B1A20] text-[#1D1B1A] disabled:opacity-30 hover:border-[#C9A45C]"
                  title="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Edit Toggle */}
                <button
                  type="button"
                  onClick={() => startEdit(sec)}
                  className="p-2 border border-[#1D1B1A20] text-[#8C6D2B] hover:border-[#C9A45C]"
                  title="Edit Content"
                >
                  <Edit className="w-4 h-4" />
                </button>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => toggleSectionActive(sec.id)}
                  className={`p-2 border ${
                    sec.is_active
                      ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                      : "border-gray-300 text-gray-500"
                  }`}
                  title={sec.is_active ? "Visible on Storefront" : "Hidden"}
                >
                  {sec.is_active ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* In-Place Section Editor Form */}
            {editingSectionId === sec.id && (
              <div className="mt-4 pt-4 border-t border-[#1D1B1A10] space-y-4 bg-[#FAF7F2] p-4">
                <Input
                  label="Headline Title *"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <Input
                  label="Supporting Subtitle"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                />

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingSectionId(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="gold"
                    size="sm"
                    onClick={() => saveEdit(sec.id)}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
