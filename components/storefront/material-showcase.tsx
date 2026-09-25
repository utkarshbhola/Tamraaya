import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MaterialShowcase() {
  const materials = [
    {
      name: "BRASS",
      tagline: "Timeless & Elegant",
      description:
        "Known as Pittal. Celebrated for radiant golden luster, superior heat circulation, and lifelong kitchen durability.",
      href: "/products?material=Brass",
      imageUrl:
        "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=900&auto=format&fit=crop",
      alloyNote: "Virgin Copper & Zinc alloy",
    },
    {
      name: "COPPER",
      tagline: "Pure & Powerful",
      description:
        "Known as Tamra. An ancient Ayurvedic purifier that naturally ionizes drinking water and imbues restorative vitality.",
      href: "/products?material=Copper",
      imageUrl:
        "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=900&auto=format&fit=crop",
      alloyNote: "99.5% Certified Pure Copper",
    },
    {
      name: "BRONZE",
      tagline: "Rare & Refined",
      description:
        "Known as Kansa. The bell-metal alloy of resonance and alkalinity that balances nutrition and preserves flavor purity.",
      href: "/products?material=Bronze",
      imageUrl:
        "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=900&auto=format&fit=crop",
      alloyNote: "78% Copper, 22% Pure Tin",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F6F0E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18 space-y-3">
          <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Sacred Metallurgy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B0B22] tracking-tight">
            Shop by Material
          </h2>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-4" />
          <p className="text-sm text-[#1D1B1A]/75 font-light leading-relaxed">
            Every metal possesses a unique culinary resonance, elemental temperament,
            and ancestral lineage. Explore our collections by their core alloy.
          </p>
        </div>

        {/* 3 Primary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {materials.map((mat) => (
            <Link
              key={mat.name}
              href={mat.href}
              className="group relative flex flex-col h-[480px] sm:h-[520px] overflow-hidden border border-[#1D1B1A20] bg-[#1B0B22] shadow-sm transition-all duration-500 hover:shadow-xl hover:border-[#C9A45C]"
            >
              {/* Background Image with Zoom */}
              <div className="absolute inset-0">
                <Image
                  src={mat.imageUrl}
                  alt={`${mat.name} material showcase`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-70 group-hover:opacity-85"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B0B22] via-[#1B0B22]/50 to-transparent" />
                <div className="absolute inset-0 bg-[#1B0B22]/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Top Alloy Badge */}
              <div className="relative z-10 p-6 flex justify-between items-start">
                <span className="text-[9px] uppercase tracking-editorial text-[#D8B875] border border-[#C9A45C40] px-2.5 py-1 bg-[#1B0B22]/70 backdrop-blur-sm">
                  {mat.alloyNote}
                </span>
              </div>

              {/* Bottom Card Content */}
              <div className="relative z-10 mt-auto p-6 sm:p-8 space-y-3">
                <p className="text-xs uppercase tracking-editorial text-[#D8B875] font-medium">
                  {mat.tagline}
                </p>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] tracking-wide">
                  {mat.name}
                </h3>
                <p className="text-xs text-[#FAF7F2]/80 font-light leading-relaxed line-clamp-3">
                  {mat.description}
                </p>

                <div className="pt-4 flex items-center gap-2 text-xs uppercase tracking-wider text-[#D8B875] font-semibold group-hover:text-white transition-colors">
                  <span>Explore {mat.name}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
