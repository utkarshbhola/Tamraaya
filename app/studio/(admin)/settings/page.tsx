"use client";

import * as React from "react";
import { Settings, Save, CheckCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function StudioSettingsPage() {
  const [brandName, setBrandName] = React.useState<string>(BRAND.name);
  const [tagline, setTagline] = React.useState<string>(BRAND.tagline);
  const [conciergePhone, setConciergePhone] = React.useState<string>(BRAND.conciergePhone);
  const [conciergeEmail, setConciergeEmail] = React.useState<string>(BRAND.conciergeEmail);
  const [feedback, setFeedback] = React.useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("Brand and concierge operational settings saved.");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
          Platform Configuration
        </span>
        <h1 className="font-serif text-3xl text-[#1B0B22]">Studio Settings</h1>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-white border border-[#1D1B1A15] p-6 sm:p-8 shadow-sm">
        <h2 className="font-serif text-xl text-[#1B0B22] border-b border-[#1D1B1A10] pb-2">
          Brand & Concierge Identity
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Brand Title"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <Input
            label="Brand Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Concierge Phone / WhatsApp"
            value={conciergePhone}
            onChange={(e) => setConciergePhone(e.target.value)}
          />
          <Input
            label="Inquiry Concierge Email"
            value={conciergeEmail}
            onChange={(e) => setConciergeEmail(e.target.value)}
          />
        </div>

        <div className="pt-4 border-t border-[#1D1B1A10] flex justify-end">
          <Button type="submit" variant="gold" className="gap-1.5">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
