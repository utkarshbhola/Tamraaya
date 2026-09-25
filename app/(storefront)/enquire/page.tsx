"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitCustomerEnquiry } from "@/lib/enquiries/actions";
import { BRAND } from "@/lib/constants";
import { generateWhatsAppUrl } from "@/lib/utils";

export default function EnquirePage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [enquiryType, setEnquiryType] = React.useState("Bespoke Dining Set");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successNumber, setSuccessNumber] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const fullMessage = `[Enquiry Category: ${enquiryType}]\n\n${message}`;

    const res = await submitCustomerEnquiry({
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      message: fullMessage,
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setSuccessNumber(res.data.enquiryNumber);
    } else {
      setErrorMessage(
        res.message || "Unable to submit your inquiry. Please try again."
      );
    }
  };

  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
            Bespoke Atelier Advisory
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1B0B22]">
            Commission an Heirloom
          </h1>
          <div className="w-16 h-[1.5px] bg-[#C9A45C] mx-auto my-3" />
          <p className="text-sm text-[#1D1B1A]/75 font-light leading-relaxed">
            From monogrammed wedding trousseau trunks to custom royal banquet
            ensembles and private architectural installations.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white border border-[#C9A45C40] p-8 sm:p-12 shadow-xl relative">
          {successNumber ? (
            /* Success State */
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
                Commission Logged Successfully
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B0B22]">
                Thank You, {name}
              </h2>
              <p className="text-sm text-[#1D1B1A]/80 leading-relaxed max-w-md mx-auto">
                Your bespoke inquiry reference is{" "}
                <strong className="text-[#1B0B22] font-semibold">
                  {successNumber}
                </strong>
                . Our principal client director will review your specifications and
                contact you within 4 business hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#20ba59]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Connect on WhatsApp Now
                </a>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center h-12 px-8 border border-[#1B0B22] text-[#1B0B22] text-xs uppercase tracking-wider font-semibold hover:bg-[#1B0B22]/10"
                >
                  Return to Catalogue
                </Link>
              </div>
            </div>
          ) : (
            /* Form Input */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Your Full Name *"
                  placeholder="e.g. Radhika Apte"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Phone / WhatsApp Number *"
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Email Address *"
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-[#1D1B1A]/80">
                    Inquiry Scope
                  </label>
                  <select
                    value={enquiryType}
                    onChange={(e) => setEnquiryType(e.target.value)}
                    className="flex h-11 w-full border border-[#1D1B1A25] bg-[#FAF7F2] px-3.5 py-2 text-sm text-[#1D1B1A] focus:border-[#C9A45C] focus:outline-none"
                  >
                    <option value="Bespoke Dining Set">
                      Bespoke Dining Set (Bronze/Brass)
                    </option>
                    <option value="Wedding Trousseau Gifting">
                      Wedding Trousseau Gifting Ensembles
                    </option>
                    <option value="Custom Monogram / Crest Engraving">
                      Custom Monogram / Crest Engraving
                    </option>
                    <option value="Hospitality / Restaurant Banquet">
                      Hospitality & Boutique Resort Ware
                    </option>
                    <option value="Other Bespoke Commission">
                      Other Bespoke Commission
                    </option>
                  </select>
                </div>
              </div>

              <Textarea
                label="Commission Brief & Details"
                placeholder="Please describe your requirements, guest capacity, desired alloys, timeline, and delivery destination..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto px-10 h-13"
                >
                  Submit Bespoke Brief
                </Button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Immediate Chat on WhatsApp Concierge</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
