"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SlidersHorizontal, X, RotateCcw, Check } from "lucide-react";
import { MATERIALS, CATEGORIES, FINISHES, SORT_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProductFilterBar({ totalCount }: { totalCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  // Read current active filters from URL query parameters
  const activeMaterials = (searchParams.get("material") || "")
    .split(",")
    .filter(Boolean);
  const activeCategories = (searchParams.get("category") || "")
    .split(",")
    .filter(Boolean);
  const activeFinishes = (searchParams.get("finish") || "")
    .split(",")
    .filter(Boolean);
  const activeAvailability = searchParams.get("availability") || "";
  const currentSort = searchParams.get("sort") || "featured";
  const currentQuery = searchParams.get("q") || "";

  const totalActiveFilters =
    activeMaterials.length +
    activeCategories.length +
    activeFinishes.length +
    (activeAvailability ? 1 : 0) +
    (currentQuery ? 1 : 0);

  // Helper to toggle a multi-value query param
  const toggleArrayParam = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentList = (params.get(paramName) || "")
      .split(",")
      .filter(Boolean);

    let updatedList: string[];
    if (currentList.includes(value)) {
      updatedList = currentList.filter((item) => item !== value);
    } else {
      updatedList = [...currentList, value];
    }

    if (updatedList.length > 0) {
      params.set(paramName, updatedList.join(","));
    } else {
      params.delete(paramName);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Helper to set a single query param
  const setSingleParam = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "featured") {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Reset all filters
  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <>
      {/* Top Mobile & Responsive Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-4 bg-[#FAF7F2] border border-[#1D1B1A15] mb-8">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 h-10 px-4 text-xs uppercase tracking-wider font-semibold bg-[#1B0B22] text-[#FAF7F2]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D8B875]" />
            <span>Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}</span>
          </button>

          <span className="text-xs text-[#1D1B1A]/70 uppercase tracking-wider">
            Showing <strong className="text-[#1B0B22]">{totalCount}</strong> pieces
          </span>

          {currentQuery && (
            <span className="text-xs text-[#8C6D2B] bg-[#C9A45C15] px-2.5 py-1 border border-[#C9A45C30] flex items-center gap-1.5">
              <span>&ldquo;{currentQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => setSingleParam("q", "")}
                className="hover:text-red-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>

        {/* Right: Sort Dropdown & Reset */}
        <div className="flex items-center gap-4">
          {totalActiveFilters > 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-[11px] uppercase tracking-wider text-[#8C6D2B] hover:text-[#1B0B22] flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear ({totalActiveFilters})</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <label
              htmlFor="sort-select"
              className="text-[11px] uppercase tracking-wider text-[#1D1B1A]/70 hidden sm:block"
            >
              Sort by:
            </label>
            <select
              id="sort-select"
              value={currentSort}
              onChange={(e) => setSingleParam("sort", e.target.value)}
              className="h-10 border border-[#1D1B1A20] bg-white px-3 text-xs uppercase tracking-wider text-[#1B0B22] focus:border-[#C9A45C] focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Left Filter Sidebar Component (rendered in page grid) */}

      {/* Mobile Slide-Over Drawer */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1B0B22]/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative ml-auto w-full max-w-xs bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-hidden">
            <div className="p-5 border-b border-[#1D1B1A15] flex items-center justify-between bg-[#1B0B22] text-[#FAF7F2]">
              <span className="font-serif text-lg tracking-wide">
                Refine Collection
              </span>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 text-[#FAF7F2]/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Materials Filter */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C6D2B] block">
                  Material
                </span>
                <div className="space-y-2">
                  {MATERIALS.map((mat) => {
                    const isChecked = activeMaterials.includes(mat);
                    return (
                      <label
                        key={mat}
                        className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1"
                      >
                        <span>{mat}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleArrayParam("material", mat)}
                          className="h-4 w-4 accent-[#1B0B22] rounded-none border-gray-300"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="space-y-3 pt-4 border-t border-[#1D1B1A15]">
                <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C6D2B] block">
                  Category
                </span>
                <div className="space-y-2">
                  {CATEGORIES.map((cat) => {
                    const isChecked = activeCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1"
                      >
                        <span>{cat}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleArrayParam("category", cat)}
                          className="h-4 w-4 accent-[#1B0B22] rounded-none border-gray-300"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Finishes Filter */}
              <div className="space-y-3 pt-4 border-t border-[#1D1B1A15]">
                <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C6D2B] block">
                  Finish
                </span>
                <div className="space-y-2">
                  {FINISHES.map((finish) => {
                    const isChecked = activeFinishes.includes(finish);
                    return (
                      <label
                        key={finish}
                        className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1"
                      >
                        <span>{finish}</span>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleArrayParam("finish", finish)}
                          className="h-4 w-4 accent-[#1B0B22] rounded-none border-gray-300"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Availability Filter */}
              <div className="space-y-3 pt-4 border-t border-[#1D1B1A15]">
                <span className="text-xs uppercase tracking-editorial font-semibold text-[#8C6D2B] block">
                  Availability
                </span>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1">
                    <span>In Stock</span>
                    <input
                      type="radio"
                      name="mobile-avail"
                      checked={activeAvailability === "in_stock"}
                      onChange={() => setSingleParam("availability", "in_stock")}
                      className="accent-[#1B0B22]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1">
                    <span>Made to Order</span>
                    <input
                      type="radio"
                      name="mobile-avail"
                      checked={activeAvailability === "made_to_order"}
                      onChange={() => setSingleParam("availability", "made_to_order")}
                      className="accent-[#1B0B22]"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#1D1B1A15] bg-white flex gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 h-11 border border-[#1D1B1A] text-[#1D1B1A] text-xs uppercase tracking-wider font-semibold"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="flex-1 h-11 bg-[#1B0B22] text-[#D8B875] text-xs uppercase tracking-wider font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Desktop Sidebar Filter Panel
 */
export function DesktopFilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeMaterials = (searchParams.get("material") || "")
    .split(",")
    .filter(Boolean);
  const activeCategories = (searchParams.get("category") || "")
    .split(",")
    .filter(Boolean);
  const activeFinishes = (searchParams.get("finish") || "")
    .split(",")
    .filter(Boolean);
  const activeAvailability = searchParams.get("availability") || "";

  const toggleArrayParam = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentList = (params.get(paramName) || "")
      .split(",")
      .filter(Boolean);

    let updatedList: string[];
    if (currentList.includes(value)) {
      updatedList = currentList.filter((item) => item !== value);
    } else {
      updatedList = [...currentList, value];
    }

    if (updatedList.length > 0) {
      params.set(paramName, updatedList.join(","));
    } else {
      params.delete(paramName);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const setSingleParam = (paramName: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== activeAvailability) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 pr-6 border-r border-[#1D1B1A15]">
      {/* Material */}
      <div className="space-y-3">
        <h4 className="text-[11px] uppercase tracking-editorial font-semibold text-[#8C6D2B]">
          Material Alloy
        </h4>
        <div className="space-y-2">
          {MATERIALS.map((mat) => {
            const isChecked = activeMaterials.includes(mat);
            return (
              <label
                key={mat}
                className={cn(
                  "flex items-center justify-between text-xs py-1 cursor-pointer transition-colors",
                  isChecked
                    ? "font-semibold text-[#1B0B22]"
                    : "text-[#1D1B1A]/80 hover:text-[#1B0B22]"
                )}
              >
                <span>{mat}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayParam("material", mat)}
                  className="h-4 w-4 accent-[#1B0B22] rounded-none border-[#1D1B1A30]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3 pt-6 border-t border-[#1D1B1A15]">
        <h4 className="text-[11px] uppercase tracking-editorial font-semibold text-[#8C6D2B]">
          Category
        </h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => {
            const isChecked = activeCategories.includes(cat);
            return (
              <label
                key={cat}
                className={cn(
                  "flex items-center justify-between text-xs py-1 cursor-pointer transition-colors",
                  isChecked
                    ? "font-semibold text-[#1B0B22]"
                    : "text-[#1D1B1A]/80 hover:text-[#1B0B22]"
                )}
              >
                <span>{cat}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayParam("category", cat)}
                  className="h-4 w-4 accent-[#1B0B22] rounded-none border-[#1D1B1A30]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Finish */}
      <div className="space-y-3 pt-6 border-t border-[#1D1B1A15]">
        <h4 className="text-[11px] uppercase tracking-editorial font-semibold text-[#8C6D2B]">
          Artisan Finish
        </h4>
        <div className="space-y-2">
          {FINISHES.map((finish) => {
            const isChecked = activeFinishes.includes(finish);
            return (
              <label
                key={finish}
                className={cn(
                  "flex items-center justify-between text-xs py-1 cursor-pointer transition-colors",
                  isChecked
                    ? "font-semibold text-[#1B0B22]"
                    : "text-[#1D1B1A]/80 hover:text-[#1B0B22]"
                )}
              >
                <span>{finish}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleArrayParam("finish", finish)}
                  className="h-4 w-4 accent-[#1B0B22] rounded-none border-[#1D1B1A30]"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3 pt-6 border-t border-[#1D1B1A15]">
        <h4 className="text-[11px] uppercase tracking-editorial font-semibold text-[#8C6D2B]">
          Availability
        </h4>
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1">
            <span>In Stock</span>
            <input
              type="checkbox"
              checked={activeAvailability === "in_stock"}
              onChange={() => setSingleParam("availability", "in_stock")}
              className="h-4 w-4 accent-[#1B0B22]"
            />
          </label>
          <label className="flex items-center justify-between text-xs text-[#1D1B1A] cursor-pointer py-1">
            <span>Made to Order</span>
            <input
              type="checkbox"
              checked={activeAvailability === "made_to_order"}
              onChange={() => setSingleParam("availability", "made_to_order")}
              className="h-4 w-4 accent-[#1B0B22]"
            />
          </label>
        </div>
      </div>
    </aside>
  );
}
