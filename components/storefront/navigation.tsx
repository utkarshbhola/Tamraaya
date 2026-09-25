"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Heart, Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { cn, generateWhatsAppUrl } from "@/lib/utils";

export function StorefrontNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeNavigationPanels = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const navLinks = [
    { name: "Collections", href: "/collections" },
    { name: "Shop Catalogue", href: "/products" },
    { name: "Our Craft", href: "/craft" },
    { name: "Artisan Lineage", href: "/about" },
    { name: "Concierge", href: "/contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#1B0B22]/95 backdrop-blur-md border-b border-[#C9A45C30] shadow-md py-3"
            : "bg-[#1B0B22] border-b border-[#C9A45C20] py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-6">
              <Link href="/" className="group flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl tracking-wide-editorial text-[#FAF7F2] group-hover:text-[#D8B875] transition-colors">
                  TAMRAAYA
                </span>
                <span className="text-[9px] uppercase tracking-editorial text-[#D8B875]/80 -mt-1 font-sans hidden sm:block">
                  Rooted in Tradition
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeNavigationPanels}
                    className={cn(
                      "text-xs uppercase tracking-editorial transition-colors relative py-1",
                      isActive
                        ? "text-[#D8B875] font-semibold"
                        : "text-[#FAF7F2]/80 hover:text-[#D8B875]"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A45C]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Icon Trigger */}
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(true);
                  setMobileMenuOpen(false);
                }}
                aria-label="Search collection"
                className="p-2 text-[#FAF7F2]/80 hover:text-[#D8B875] transition-colors"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/products?wishlist=true"
                onClick={closeNavigationPanels}
                aria-label="Wishlist"
                className="p-2 text-[#FAF7F2]/80 hover:text-[#D8B875] transition-colors relative"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              {/* Enquire CTA Desktop */}
              <Link
                href="/enquire"
                onClick={closeNavigationPanels}
                className="hidden sm:inline-flex items-center justify-center h-9 px-4 text-[11px] uppercase tracking-wider font-semibold bg-[#C9A45C] text-[#1B0B22] hover:bg-[#D8B875] transition-all"
              >
                Enquire
              </Link>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen((open) => !open);
                  setSearchOpen(false);
                }}
                aria-label="Toggle navigation menu"
                className="p-2 text-[#FAF7F2] lg:hidden hover:text-[#D8B875] transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B0B22]/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#FAF7F2] border border-[#C9A45C] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-[#1D1B1A]/60 hover:text-[#1D1B1A]"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] uppercase tracking-editorial text-[#C9A45C] font-semibold block mb-2">
              Tamraaya Curated Search
            </span>
            <h2 className="font-serif text-2xl text-[#1B0B22] mb-4">
              Search by Piece, Alloy, or Culinary Technique
            </h2>

            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="e.g. Hammered Brass Handi, Copper Carafe, Bronze Thali..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-12 border border-[#C9A45C60] bg-white text-sm text-[#1D1B1A] placeholder:text-[#1D1B1A40] focus:outline-none focus:ring-1 focus:ring-[#C9A45C]"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 h-8 w-8 flex items-center justify-center text-[#1B0B22] hover:text-[#C9A45C]"
                aria-label="Execute search"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#1D1B1A10] flex flex-wrap gap-2 text-xs text-[#1D1B1A]/70">
              <span className="font-semibold text-[#1B0B22]">Popular:</span>
              <button
                type="button"
                onClick={() => {
                  router.push("/products?material=Brass");
                  setSearchOpen(false);
                }}
                className="hover:text-[#C9A45C] underline underline-offset-2"
              >
                Brass Handi
              </button>
              <span className="text-gray-300">•</span>
              <button
                type="button"
                onClick={() => {
                  router.push("/products?material=Copper");
                  setSearchOpen(false);
                }}
                className="hover:text-[#C9A45C] underline underline-offset-2"
              >
                Copper Matka
              </button>
              <span className="text-gray-300">•</span>
              <button
                type="button"
                onClick={() => {
                  router.push("/products?material=Bronze");
                  setSearchOpen(false);
                }}
                className="hover:text-[#C9A45C] underline underline-offset-2"
              >
                Kansa Royal Thali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#1B0B22] text-[#FAF7F2] pt-20 px-6 pb-12 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-editorial text-[#C9A45C] block">
              Navigation
            </span>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-2xl tracking-wide hover:text-[#D8B875] transition-colors py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-[#C9A45C20] space-y-3">
              <span className="text-[10px] uppercase tracking-editorial text-[#D8B875] block">
                Shop By Material
              </span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/products?material=Brass"
                  className="px-3 py-1.5 border border-[#C9A45C30] text-xs uppercase hover:border-[#C9A45C]"
                >
                  Brass
                </Link>
                <Link
                  href="/products?material=Copper"
                  className="px-3 py-1.5 border border-[#C9A45C30] text-xs uppercase hover:border-[#C9A45C]"
                >
                  Copper
                </Link>
                <Link
                  href="/products?material=Bronze"
                  className="px-3 py-1.5 border border-[#C9A45C30] text-xs uppercase hover:border-[#C9A45C]"
                >
                  Bronze (Kansa)
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#C9A45C20] space-y-4">
            <Link
              href="/enquire"
              className="w-full h-12 flex items-center justify-center bg-[#C9A45C] text-[#1B0B22] font-semibold text-xs uppercase tracking-wider"
            >
              Enquire for Bespoke Curation
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] text-xs uppercase tracking-wider hover:bg-[#25D36615] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp Concierge
            </a>
          </div>
        </div>
      )}
    </>
  );
}
