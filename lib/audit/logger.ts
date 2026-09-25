import { createAdminClient } from "@/lib/supabase/admin";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "PUBLISH"
  | "ARCHIVE"
  | "LOGIN";

export interface AuditLogEntry {
  userId?: string | null;
  action: AuditAction;
  entity: "product" | "category" | "collection" | "enquiry" | "homepage_section" | "media" | "user";
  entityId: string;
  changes?: Record<string, unknown> | null;
  ipAddress?: string;
}

/**
 * Centrally records an audit log entry in PostgreSQL using the privileged admin client.
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("audit_logs").insert({
      user_id: entry.userId || null,
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entityId,
      changes: entry.changes || null,
      ip_address: entry.ipAddress || null,
    });

    if (error) {
      console.warn("Audit log insert warning:", error.message);
    }
  } catch (err) {
    // Audit logging should not crash business operations if Supabase is offline in dev
    console.warn("Audit logging encountered an error:", err);
  }
}
