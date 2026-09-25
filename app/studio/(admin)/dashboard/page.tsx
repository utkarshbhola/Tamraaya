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
            className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-wider font-semibold bg-[#1B0B22] text-[#D8B875] hover:bg-[#2B1234] border border-[#C9A45C40]"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </Link>
          <Link
            href="/studio/media"
            className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-wider font-semibold border border-[#1D1B1A30] bg-white text-[#1D1B1A] hover:border-[#C9A45C]"
          >
            <ImageIcon className="w-4 h-4 text-[#8C6D2B]" />
            <span>Upload Media</span>
          </Link>
          <Link
            href="/studio/content"
            className="inline-flex items-center gap-1.5 h-10 px-4 text-xs uppercase tracking-wider font-semibold border border-[#1D1B1A30] bg-white text-[#1D1B1A] hover:border-[#C9A45C]"
          >
            <Sparkles className="w-4 h-4 text-[#8C6D2B]" />
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
              className="bg-white p-5 border border-[#1D1B1A15] shadow-sm hover:border-[#C9A45C] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[#8C6D2B] mb-3">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/70">
                  {kpi.label}
                </span>
                <div className="w-8 h-8 rounded bg-[#1B0B22] text-[#D8B875] flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#1B0B22] block font-semibold">
                  {kpi.value}
                </span>
                <span className="text-[11px] text-[#1D1B1A]/60">
                  {kpi.subtext}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Pipeline Table */}
      <div className="bg-white border border-[#1D1B1A15] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1D1B1A10]">
          <div>
            <h2 className="font-serif text-xl text-[#1B0B22]">
              Recent Customer Inquiries
            </h2>
            <p className="text-xs text-[#1D1B1A]/60">
              Live prospective inquiries from storefront and WhatsApp
            </p>
          </div>
          <Link
            href="/studio/enquiries"
            className="text-xs uppercase tracking-wider font-semibold text-[#8C6D2B] hover:text-[#1B0B22] flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1D1B1A10] text-[#1D1B1A]/60 uppercase tracking-wider">
                <th className="py-3 px-3">Ref ID</th>
                <th className="py-3 px-3">Client</th>
                <th className="py-3 px-3">Contact</th>
                <th className="py-3 px-3">Inquired Piece</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D1B1A08]">
              {recentEnquiries.map((enq) => (
                <tr key={enq.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-3 font-mono text-[11px] text-[#8C6D2B]">
                    {enq.enquiry_number}
                  </td>
                  <td className="py-3 px-3 font-medium text-[#1B0B22]">
                    {enq.customer_name}
                  </td>
                  <td className="py-3 px-3 text-[#1D1B1A]/80">
                    <div>{enq.customer_phone}</div>
                    <div className="text-[10px] text-[#1D1B1A]/50">{enq.customer_email}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-medium text-[#1B0B22]">
                      {enq.product?.name || "General Atelier Inquiry"}
                    </span>
                    {enq.variant && (
                      <span className="block text-[10px] text-[#8C6D2B]">
                        {enq.variant.name}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                        enq.status === "new"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : enq.status === "contacted"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href="/studio/enquiries"
                      className="text-[#8C6D2B] hover:text-[#1B0B22] font-semibold underline"
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
