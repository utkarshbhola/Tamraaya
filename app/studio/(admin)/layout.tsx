import * as React from "react";
import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { StudioHeader } from "@/components/studio/studio-header";

export default function StudioAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F6F0E6] text-[#1D1B1A]">
      {/* Studio Navigation Sidebar */}
      <StudioSidebar />

      {/* Main Admin Working Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <StudioHeader />
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
