import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tamraaya.com"
  ),
  title: {
    default: "TAMRAAYA | Rooted in Tradition. Designed for You.",
    template: "%s | TAMRAAYA",
  },
  description:
    "Handcrafted luxury kitchenware and tableware in brass, copper, bronze, and mixed metals. Indian metallurgy reimagined for contemporary living.",
  keywords: [
    "Tamraaya",
    "brass cookware",
    "copper tableware",
    "bronze thali",
    "Indian craftsmanship",
    "luxury kitchenware",
    "handcrafted metalware",
  ],
  authors: [{ name: "Tamraaya Luxury Metalcraft" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://tamraaya.com",
    siteName: "TAMRAAYA",
    title: "TAMRAAYA | Rooted in Tradition. Designed for You.",
    description:
      "Handcrafted luxury kitchenware and tableware in brass, copper, bronze, and mixed metals.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
        width: 1600,
        height: 900,
        alt: "Tamraaya Handcrafted Luxury Metalware",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAMRAAYA | Rooted in Tradition. Designed for You.",
    description:
      "Handcrafted luxury kitchenware and tableware in brass, copper, bronze, and mixed metals.",
  },
};

export const viewport: Viewport = {
  themeColor: "#1B0B22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F6F0E6] text-[#1D1B1A]">
        {children}
      </body>
    </html>
  );
}
