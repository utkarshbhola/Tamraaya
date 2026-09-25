import { createClient } from "@/lib/supabase/server";
import { Role } from "@/lib/constants";
import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  created_at: string;
}

/**
 * Retrieves the currently authenticated user and their profile with role.
 */
export async function getCurrentUserProfile(): Promise<{
  user: User | null;
  profile: UserProfile | null;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { user: null, profile: null };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      // Return basic user info with default customer role if profile not yet seeded
      return {
        user,
        profile: {
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || null,
          role: "customer",
          created_at: new Date().toISOString(),
        },
      };
    }

    return { user, profile: profile as UserProfile };
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return { user: null, profile: null };
  }
}

/**
 * Server-side RBAC guard. Ensures the current user has one of the allowed roles.
 * Throws an error or returns false if unauthorized.
 */
export async function requireRole(allowedRoles: Role[]): Promise<UserProfile> {
  const { user, profile } = await getCurrentUserProfile();

  if (!user || !profile) {
    throw new Error("Unauthorized: Authentication required.");
  }

  // Super admin always has access
  if (profile.role === "super_admin") {
    return profile;
  }

  if (!allowedRoles.includes(profile.role)) {
    throw new Error(
      `Forbidden: Insufficient privileges. Required one of: ${allowedRoles.join(
        ", "
      )}, current: ${profile.role}`
    );
  }

  return profile;
}
