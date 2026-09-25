import * as React from "react";
import { StudioSidebar } from "@/components/studio/studio-sidebar";
import { StudioHeader } from "@/components/studio/studio-header";

export default function StudioAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F4EEE3] text-[#2B1A13]">
      <StudioSidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <StudioHeader />
        <main className="flex-1 overflow-y-auto bg-[#F7F1E8] p-6 sm:p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
