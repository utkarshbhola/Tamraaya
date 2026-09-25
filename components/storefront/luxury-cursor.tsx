"use client";

import * as React from "react";

export function LuxuryCursor() {
  const [mounted, setMounted] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [role='button'], input, textarea");
      setHovering(Boolean(interactive));
    };

    const handleMouseOut = () => setHovering(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!mounted || typeof window === "undefined") return null;

  const media = window.matchMedia("(pointer: fine)");
  if (!media.matches) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 80ms ease-out",
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full border transition-all duration-300 ${
          hovering
            ? "h-20 w-20 border-[#B58A3C] bg-[#B58A3C]/20 text-[#2B1A13]"
            : "h-6 w-6 border-[#F4EEE3]/80 bg-[#F4EEE3]/80"
        }`}
        style={{
          marginLeft: hovering ? "-40px" : "-12px",
          marginTop: hovering ? "-40px" : "-12px",
        }}
      >
        {hovering && (
          <span className="text-[9px] uppercase tracking-[0.18em] font-semibold">
            View
          </span>
        )}
      </div>
    </div>
  );
}
