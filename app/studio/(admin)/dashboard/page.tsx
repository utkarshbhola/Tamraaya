import * as React from "react";
import Link from "next/link";
import {
  Package,
  Layers,
  MessageSquare,
  TrendingUp,
  Plus,
  Image as ImageIcon,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { getProducts, getCollections } from "@/lib/products/queries";
import { MOCK_ENQUIRIES } from "@/lib/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { formatINR } from "@/lib/utils";

export const metadata = {
  title: "Dashboard | Tamraaya Studio",
};

export default async function StudioDashboardPage() {
  const { products, total: totalProducts } = await getProducts();
  const collections = await getCollections();
  const recentEnquiries = MOCK_ENQUIRIES.slice(0, 5);

  const kpis = [
    {
      label: "Total Products",
      value: totalProducts.toString(),
      subtext: `${products.filter((p) => p.status === "published").length} Published`,
      icon: Package,
      href: "/studio/products",
    },
    {
      label: "Active Collections",
      value: collections.length.toString(),
      subtext: "Atelier Series",
      icon: Layers,
      href: "/studio/collections",
    },
    {
      label: "New Enquiries",
      value: recentEnquiries.filter((e) => e.status === "new").length.toString(),
      subtext: "Awaiting Concierge Follow-up",
      icon: MessageSquare,
      href: "/studio/enquiries",
    },
    {
      label: "Catalog Engagements",
      value: "1,420",
      subtext: "+18% from last month",
      icon: TrendingUp,
      href: "/studio/dashboard",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Executive Overview
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">
            Studio Operations
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/studio/products/new"
            className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-[0.18em] font-semibold bg-[#2B1A13] text-[#F4EEE3] hover:bg-[#4A2F20] border border-[#B58A3C]/40"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </Link>
          <Link
            href="/studio/media"
            className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-[0.18em] font-semibold border border-[#B8A58D]/60 bg-[#FFFDF8] text-[#2B1A13] hover:border-[#B58A3C]"
          >
            <ImageIcon className="w-4 h-4 text-[#B58A3C]" />
            <span>Upload Media</span>
          </Link>
          <Link
            href="/studio/content"
            className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-[0.18em] font-semibold border border-[#B8A58D]/60 bg-[#FFFDF8] text-[#2B1A13] hover:border-[#B58A3C]"
          >
            <Sparkles className="w-4 h-4 text-[#B58A3C]" />
            <span>Edit Homepage</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={kpi.label}
              href={kpi.href}
              className="flex flex-col justify-between border border-[#B8A58D]/60 bg-[#FFFDF8] p-5 shadow-[0_10px_35px_rgba(43,26,19,0.04)] transition-all duration-200 hover:border-[#B58A3C]"
            >
              <div className="mb-3 flex items-center justify-between text-[#4A2F20]">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2B1A13]/70">
                  {kpi.label}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#2B1A13] text-[#F4EEE3]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="block font-serif text-3xl font-semibold text-[#2B1A13]">
                  {kpi.value}
                </span>
                <span className="text-[11px] text-[#2B1A13]/60">
                  {kpi.subtext}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Pipeline Table */}
      <div className="border border-[#B8A58D]/60 bg-[#FFFDF8] p-6 shadow-[0_10px_35px_rgba(43,26,19,0.04)] space-y-4">
        <div className="flex items-center justify-between border-b border-[#B8A58D]/40 pb-3">
          <div>
            <h2 className="font-serif text-xl text-[#2B1A13]">
              Recent Customer Inquiries
            </h2>
            <p className="text-xs text-[#2B1A13]/60">
              Live prospective inquiries from storefront and WhatsApp
            </p>
          </div>
          <Link
            href="/studio/enquiries"
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#B58A3C] hover:text-[#2B1A13]"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-[#B8A58D]/40 bg-[#F4EEE3] text-[#2B1A13]/70 uppercase tracking-[0.18em]">
                <th className="px-3 py-3">Ref ID</th>
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Inquired Piece</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8A58D]/30">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="transition-colors hover:bg-[#F7F1E8]">
                  <td className="px-3 py-3 font-mono text-[11px] text-[#4A2F20]">
                    {enq.enquiry_number}
                  </td>
                  <td className="px-3 py-3 font-medium text-[#2B1A13]">
                    {enq.customer_name}
                  </td>
                  <td className="px-3 py-3 text-[#2B1A13]/80">
                    <div>{enq.customer_phone}</div>
                    <div className="text-[10px] text-[#2B1A13]/50">{enq.customer_email}</div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="font-medium text-[#2B1A13]">
                      {enq.product?.name || "General Atelier Inquiry"}
                    </span>
                    {enq.variant && (
                      <span className="block text-[10px] text-[#4A2F20]">
                        {enq.variant.name}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] uppercase font-semibold tracking-[0.18em] ${
                        enq.status === "new"
                          ? "border border-rose-200 bg-rose-50 text-rose-700"
                          : enq.status === "contacted"
                          ? "border border-amber-200 bg-amber-50 text-amber-800"
                          : "border border-emerald-200 bg-emerald-50 text-emerald-800"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      href="/studio/enquiries"
                      className="font-semibold text-[#B58A3C] underline hover:text-[#2B1A13]"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
