import * as React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Concierge & Appointments | Tamraaya",
  description:
    "Connect with the Tamraaya client concierge for bespoke commissions, heirloom consultations, and private showroom visits.",
};

export default function ContactPage() {
  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Client Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1B0B22]">
            Connect With Our Concierge
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-3" />
          <p className="text-sm text-[#1D1B1A]/75 font-light leading-relaxed">
            Whether inquiring about a signature piece, commissioning a custom banquet service,
            or discussing trousseau wedding curations, our client advisors are at your service.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border border-[#1D1B1A15] shadow-sm space-y-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1B0B22] text-[#D8B875] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1B0B22]">Direct Telephone</h3>
            <p className="text-xs text-[#1D1B1A]/70 font-light">
              Available Monday through Saturday, 10:00 AM &ndash; 7:00 PM IST
            </p>
            <a
              href={`tel:${BRAND.conciergePhone}`}
              className="text-sm font-semibold text-[#8C6D2B] hover:text-[#1B0B22]"
            >
              {BRAND.conciergePhone}
            </a>
          </div>

          <div className="p-8 bg-white border border-[#1D1B1A15] shadow-sm space-y-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1B0B22]">WhatsApp Concierge</h3>
            <p className="text-xs text-[#1D1B1A]/70 font-light">
              Instant responses with high-resolution imagery and video consultation
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-emerald-700 hover:text-emerald-900"
            >
              <span>Chat Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-8 bg-white border border-[#1D1B1A15] shadow-sm space-y-4 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#1B0B22] text-[#D8B875] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl text-[#1B0B22]">Written Inquiries</h3>
            <p className="text-xs text-[#1D1B1A]/70 font-light">
              For architectural, hospitality, and custom corporate commissions
            </p>
            <a
              href={`mailto:${BRAND.conciergeEmail}`}
              className="text-sm font-semibold text-[#8C6D2B] hover:text-[#1B0B22]"
            >
              {BRAND.conciergeEmail}
            </a>
          </div>
        </div>

        {/* Private Showroom Appointments */}
        <div className="p-8 sm:p-12 bg-[#1B0B22] text-[#FAF7F2] border border-[#C9A45C40] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-editorial text-[#D8B875] font-semibold block">
              Private Viewing
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2]">
              Visit the Atelier Showroom
            </h2>
            <div className="w-12 h-[1px] bg-[#C9A45C]" />
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light leading-relaxed">
              Experience the weight, tactile hammer marks, and chime of our metalcraft
              in person. By appointment only to ensure dedicated advisory attention.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              href="/enquire"
              className="inline-flex items-center justify-center h-12 px-7 text-xs uppercase tracking-editorial font-semibold bg-[#C9A45C] text-[#1B0B22] hover:bg-[#D8B875] transition-all"
            >
              Request Viewing Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
