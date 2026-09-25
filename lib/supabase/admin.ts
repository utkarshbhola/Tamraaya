import { createClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client using SUPABASE_SERVICE_ROLE_KEY.
 * STRICTLY for server-side operations (Admin user management, Audit logging, System jobs).
 * NEVER expose this or import it into client-side components.
 */
export function createAdminClient() {
  if (typeof window !== "undefined") {
    throw new Error("Security Violation: createAdminClient called in client context.");
  }

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://placeholder-project.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-role-key";

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
