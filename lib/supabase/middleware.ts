import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // DEV ONLY bypass for display/demo access before Supabase is connected.
  // Remove this once Supabase Auth is configured for the project.
  if (process.env.NODE_ENV === "development" && pathname.startsWith("/studio")) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://placeholder-project.supabase.co";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Do NOT run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Studio Admin Route Protection
  if (pathname.startsWith("/studio") && !pathname.startsWith("/studio/login")) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = "/studio/login";
      url.searchParams.set("returnUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // If visiting /studio/login while already authenticated with an admin role, allow or redirect to dashboard
  if (pathname === "/studio/login" && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/studio/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
