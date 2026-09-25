"use client";

import * as React from "react";
import Link from "next/link";
import {
  MessageSquare,
  Search,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  Edit,
  Save,
  X,
} from "lucide-react";
import { MOCK_ENQUIRIES } from "@/lib/data/mock-data";
import { Enquiry } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function StudioEnquiriesPage() {
  const [enquiries, setEnquiries] = React.useState(MOCK_ENQUIRIES);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedEnquiry, setSelectedEnquiry] = React.useState<Enquiry | null>(null);
  const [internalNotes, setInternalNotes] = React.useState("");
  const [editStatus, setEditStatus] = React.useState<Enquiry["status"]>("new");
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus =
      statusFilter === "all" ? true : e.status === statusFilter;
    const matchesSearch =
      e.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.enquiry_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.customer_phone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const openDrawer = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setInternalNotes(enq.internal_notes || "");
    setEditStatus(enq.status);
  };

  const handleUpdate = () => {
    if (!selectedEnquiry) return;

    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === selectedEnquiry.id
          ? { ...e, status: editStatus, internal_notes: internalNotes }
          : e
      )
    );

    setFeedback(`Enquiry ${selectedEnquiry.enquiry_number} status updated.`);
    setSelectedEnquiry(null);
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Client Inquiries & Conversions
          </span>
          <h1 className="font-serif text-3xl text-[#1B0B22]">
            Enquiries & Leads
          </h1>
        </div>

        {feedback && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#1D1B1A15] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#1D1B1A]/40" />
          <input
            type="text"
            placeholder="Search by client, phone, or Ref ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-3 text-xs border border-[#1D1B1A20] focus:border-[#C9A45C] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-[11px] uppercase tracking-wider text-[#1D1B1A]/60 font-semibold">
            Pipeline:
          </span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 text-xs border border-[#1D1B1A20] px-3 bg-white focus:outline-none focus:border-[#C9A45C]"
          >
            <option value="all">All Inquiries ({enquiries.length})</option>
            <option value="new">New (Uncontacted)</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-[#1D1B1A15] shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#FAF7F2] border-b border-[#1D1B1A15] text-[#1D1B1A]/70 uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4">Ref Number</th>
              <th className="py-3 px-4">Client Details</th>
              <th className="py-3 px-4">Piece of Interest</th>
              <th className="py-3 px-4">Pipeline Status</th>
              <th className="py-3 px-4">Inquiry Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D1B1A10]">
            {filteredEnquiries.map((enq) => {
              const cleanPhone = enq.customer_phone.replace(/[^0-9]/g, "");
              const directWhatsApp = `https://wa.me/${cleanPhone}?text=Namaste%20${encodeURIComponent(
                enq.customer_name
              )},%20this%20is%20the%20Tamraaya%20Concierge%20following%20up%20on%20your%20inquiry%20${enq.enquiry_number}.`;

              return (
                <tr key={enq.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#8C6D2B] font-semibold">
                    {enq.enquiry_number}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-[#1B0B22]">
                      {enq.customer_name}
                    </div>
                    <div className="text-[11px] text-[#1D1B1A]/70">
                      {enq.customer_phone}
                    </div>
                    <div className="text-[10px] text-[#1D1B1A]/50">
                      {enq.customer_email}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-[#1B0B22]">
                      {enq.product?.name || "Bespoke Curation"}
                    </span>
                    {enq.variant && (
                      <span className="block text-[10px] text-[#8C6D2B]">
                        {enq.variant.name} ({enq.variant.sku})
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-[9px] uppercase font-semibold tracking-wider ${
                        enq.status === "new"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : enq.status === "contacted"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : enq.status === "converted"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#1D1B1A]/60">
                    {new Date(enq.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <a
                        href={directWhatsApp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-[#25D366] text-white hover:bg-[#20ba59] rounded-none"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </a>

                      <button
                        type="button"
                        onClick={() => openDrawer(enq)}
                        className="px-2.5 py-1 text-xs font-semibold text-[#8C6D2B] border border-[#C9A45C50] hover:bg-[#1B0B22] hover:text-[#D8B875] transition-colors"
                      >
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail / Update Slide-Over Drawer */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-[#1B0B22]/70 backdrop-blur-sm"
            onClick={() => setSelectedEnquiry(null)}
          />

          <div className="relative w-full max-w-lg bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1D1B1A15] pb-3">
              <div>
                <span className="font-mono text-xs text-[#8C6D2B] font-semibold">
                  {selectedEnquiry.enquiry_number}
                </span>
                <h3 className="font-serif text-2xl text-[#1B0B22]">
                  Lead Detail
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 text-gray-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Client Card */}
            <div className="bg-white p-4 border border-[#1D1B1A15] space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#8C6D2B] font-semibold block">
                Customer Information
              </span>
              <div className="text-sm font-semibold text-[#1B0B22]">
                {selectedEnquiry.customer_name}
              </div>
              <div className="text-xs text-[#1D1B1A]/80 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8C6D2B]" />
                <a href={`tel:${selectedEnquiry.customer_phone}`} className="hover:underline">
                  {selectedEnquiry.customer_phone}
                </a>
              </div>
              <div className="text-xs text-[#1D1B1A]/80 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#8C6D2B]" />
                <a href={`mailto:${selectedEnquiry.customer_email}`} className="hover:underline">
                  {selectedEnquiry.customer_email}
                </a>
              </div>
            </div>

            {/* Inquiry Message */}
            <div className="bg-white p-4 border border-[#1D1B1A15] space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#8C6D2B] font-semibold block">
                Client Request / Specifications
              </span>
              <p className="text-xs text-[#1D1B1A] leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message || "No specific message attached."}
              </p>
            </div>

            {/* Status & Internal Notes Form */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                  Pipeline Stage
                </label>
                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(e.target.value as Enquiry["status"])
                  }
                  className="flex h-11 w-full border border-[#1D1B1A25] bg-white px-3 text-xs uppercase font-semibold text-[#1B0B22] focus:outline-none"
                >
                  <option value="new">New (Uncontacted)</option>
                  <option value="contacted">Contacted / Call Completed</option>
                  <option value="qualified">Qualified Lead</option>
                  <option value="converted">Converted to Order</option>
                  <option value="closed">Closed / Cancelled</option>
                </select>
              </div>

              <Textarea
                label="Internal Concierge Notes"
                placeholder="Log notes about custom engraving, special delivery dates, payment follow-up..."
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={4}
              />

              <div className="pt-2 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="gold"
                  onClick={handleUpdate}
                  className="gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Lead Status</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
