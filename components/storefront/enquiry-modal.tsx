"use client";

import * as React from "react";
import { X, CheckCircle, MessageCircle } from "lucide-react";
import { ProductWithRelations } from "@/types/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitCustomerEnquiry } from "@/lib/enquiries/actions";
import { BRAND } from "@/lib/constants";
import { generateWhatsAppUrl, formatINR } from "@/lib/utils";

export interface EnquiryModalProps {
  product?: ProductWithRelations;
  selectedVariantId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({
  product,
  selectedVariantId,
  isOpen,
  onClose,
}: EnquiryModalProps) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successNumber, setSuccessNumber] = React.useState<string | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const selectedVariant = product?.variants.find(
    (v) => v.id === selectedVariantId
  ) || product?.variants[0];

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const res = await submitCustomerEnquiry({
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      product_id: product?.id || null,
      variant_id: selectedVariant?.id || null,
      message,
    });

    setIsSubmitting(false);

    if (res.success && res.data) {
      setSuccessNumber(res.data.enquiryNumber);
    } else {
      setErrorMessage(
        res.message || "Unable to submit inquiry. Please try again."
      );
    }
  };

  const whatsappUrl = generateWhatsAppUrl({
    phone: BRAND.conciergePhone,
    productName: product?.name,
    variantName: selectedVariant?.name,
    sku: selectedVariant?.sku,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B0B22]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] border border-[#C9A45C] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#1D1B1A]/60 hover:text-[#1D1B1A] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {successNumber ? (
          /* Success State */
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
              Enquiry Confirmed
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1B0B22]">
              Thank You for Inquiring
            </h3>
            <p className="text-xs sm:text-sm text-[#1D1B1A]/80 leading-relaxed max-w-sm mx-auto">
              Your reference number is{" "}
              <strong className="text-[#1B0B22] font-semibold">
                {successNumber}
              </strong>
              . Our concierge will review your requirements and reach out via
              WhatsApp/Phone within 4 business hours.
            </p>

            <div className="pt-4 flex flex-col gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#20ba59]"
              >
                <MessageCircle className="w-4 h-4" />
                Connect on WhatsApp Now
              </a>
              <Button variant="ghost" onClick={onClose}>
                Close Window
              </Button>
            </div>
          </div>
        ) : (
          /* Form State */
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
                Tamraaya Concierge Service
              </span>
              <h3 className="font-serif text-2xl text-[#1B0B22]">
                Enquire for Bespoke Curation
              </h3>
              {product && (
                <div className="pt-2 pb-1 border-b border-[#1D1B1A15] flex items-center justify-between text-xs text-[#1D1B1A]/80">
                  <div>
                    <span className="font-medium text-[#1B0B22]">{product.name}</span>
                    {selectedVariant && (
                      <span className="text-[#8C6D2B] ml-1.5">
                        &bull; {selectedVariant.name}
                      </span>
                    )}
                  </div>
                  {selectedVariant?.price && (
                    <span className="font-semibold text-[#1B0B22]">
                      {formatINR(selectedVariant.price)}
                    </span>
                  )}
                </div>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name *"
                placeholder="e.g. Maharani Gayatri"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone / WhatsApp *"
                  placeholder="+91 98765 43210"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Input
                  label="Email Address *"
                  placeholder="name@domain.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Textarea
                label="Bespoke Requirements / Delivery Timeline"
                placeholder="Mention desired quantity, custom monogramming, or wedding event date..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />

              <div className="pt-2 flex flex-col gap-3">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full"
                >
                  Submit Private Enquiry
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-[#1D1B1A]/60">
                  <span>Prefer immediate assistance?</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
