"use client";

import * as React from "react";
import { Users, Shield, History, Plus, CheckCircle } from "lucide-react";
import { ROLES, Role } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  lastActive: string;
}

interface AuditItem {
  id: string;
  user: string;
  action: "CREATE" | "UPDATE" | "DELETE" | "PUBLISH" | "ARCHIVE";
  entity: string;
  entityId: string;
  details: string;
  timestamp: string;
}

export default function StudioUsersPage() {
  const [users, setUsers] = React.useState<AdminUser[]>([
    {
      id: "u-1",
      name: "Kashish Bhola",
      email: "superadmin@tamraaya.com",
      role: "super_admin",
      lastActive: "Just now",
    },
    {
      id: "u-2",
      name: "Pooja Sharma",
      email: "catalog@tamraaya.com",
      role: "catalog_manager",
      lastActive: "2 hours ago",
    },
    {
      id: "u-3",
      name: "Vikram Malhotra",
      email: "sales@tamraaya.com",
      role: "sales",
      lastActive: "15 mins ago",
    },
    {
      id: "u-4",
      name: "Ananya Roy",
      email: "content@tamraaya.com",
      role: "content_manager",
      lastActive: "Yesterday",
    },
  ]);

  const auditHistory: AuditItem[] = [
    {
      id: "aud-1",
      user: "superadmin@tamraaya.com",
      action: "PUBLISH",
      entity: "product",
      entityId: "hammered-brass-handi",
      details: "Published Hammered Brass Handi with 3 sizes",
      timestamp: "Today, 10:45 AM",
    },
    {
      id: "aud-2",
      user: "sales@tamraaya.com",
      action: "UPDATE",
      entity: "enquiry",
      entityId: "TAM-2026-01002",
      details: "Updated status from 'new' to 'contacted'",
      timestamp: "Today, 09:30 AM",
    },
    {
      id: "aud-3",
      user: "catalog@tamraaya.com",
      action: "CREATE",
      entity: "product",
      entityId: "bronze-kansa-royal-thali-set",
      details: "Created Kansa 6-Piece Set and variants",
      timestamp: "Yesterday, 04:15 PM",
    },
    {
      id: "aud-4",
      user: "content@tamraaya.com",
      action: "UPDATE",
      entity: "homepage_section",
      entityId: "hero",
      details: "Updated hero headline & imagery",
      timestamp: "23 Sep 2026, 11:20 AM",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="text-[10px] uppercase tracking-editorial text-[#8C6D2B] font-semibold block">
          Role-Based Access Control & Auditing
        </span>
        <h1 className="font-serif text-3xl text-[#1B0B22]">
          Admin Users & Governance
        </h1>
      </div>

      {/* Admin Users Table */}
      <div className="bg-white border border-[#1D1B1A15] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1D1B1A10]">
          <div>
            <h2 className="font-serif text-xl text-[#1B0B22]">Staff Personnel</h2>
            <p className="text-xs text-[#1D1B1A]/60">
              Assigned cryptographic roles protected by Supabase Row Level Security
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#1D1B1A10] text-[#1D1B1A]/70 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">Email Address</th>
                <th className="py-3 px-3">RBAC Role</th>
                <th className="py-3 px-3">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1D1B1A10]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF7F2]">
                  <td className="py-3 px-3 font-semibold text-[#1B0B22]">
                    {u.name}
                  </td>
                  <td className="py-3 px-3 text-[#1D1B1A]/80">{u.email}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider bg-[#1B0B22] text-[#D8B875] px-2.5 py-1 border border-[#C9A45C40]">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#1D1B1A]/60">{u.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Production Audit Log Stream */}
      <div className="bg-white border border-[#1D1B1A15] shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#1D1B1A10]">
          <div>
            <h2 className="font-serif text-xl text-[#1B0B22]">
              Security & Audit Trail
            </h2>
            <p className="text-xs text-[#1D1B1A]/60">
              Immutable log of mutations (CREATE, UPDATE, DELETE, PUBLISH) across products and leads
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>RLS Active</span>
          </div>
        </div>

        <div className="space-y-3">
          {auditHistory.map((item) => (
            <div
              key={item.id}
              className="p-3.5 border border-[#1D1B1A10] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                    item.action === "PUBLISH"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : item.action === "CREATE"
                      ? "bg-blue-100 text-blue-800 border border-blue-300"
                      : item.action === "DELETE"
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {item.action}
                </span>

                <div>
                  <span className="font-medium text-[#1B0B22]">
                    {item.details}
                  </span>
                  <span className="text-[10px] text-[#1D1B1A]/50 block">
                    by {item.user} &bull; entity: {item.entity} ({item.entityId})
                  </span>
                </div>
              </div>

              <span className="text-[11px] font-mono text-[#1D1B1A]/60 whitespace-nowrap">
                {item.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
