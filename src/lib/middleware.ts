import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export interface Env {
  NEXT_PUBLIC_SUPABASE_URL: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
}

export const updateSession = async (request: NextRequest, env?: Env) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl =
    env?.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey =
    env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[]
      ) {
        // NOTE: Looping and setting multiple cookies seems potentially problematic
        // in Next.js Middleware responses. Let's try setting them on the request first,
        // then modifying the response.
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
        });
        // Re-create the response with updated request cookies
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        // Now, set the cookies on the response
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Refresh session before checking auth status
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser();

  const isAuthenticated = user && !getUserError;
  const currentPath = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/dashboard"];
  // Define routes for authenticated users to be redirected away from
  const publicOnlyRoutes = [
    "/",
    "/landing/login",
    "/landing/sign-up",
    "/landing/onboarding",
  ];

  // 1. Protect routes: If trying to access protected routes AND not authenticated
  if (
    !isAuthenticated &&
    protectedRoutes.some((path) => currentPath.startsWith(path))
  ) {
    console.log(
      `Middleware: Unauthenticated access to ${currentPath}. Redirecting to login.`
    );
    return NextResponse.redirect(new URL("/landing/login", request.url));
  }

  // 2. Redirect logged-in users: If authenticated AND trying to access public-only routes
  if (
    isAuthenticated &&
    publicOnlyRoutes.some(
      (path) =>
        currentPath === path || (path !== "/" && currentPath.startsWith(path))
    )
  ) {
    console.log(
      `Middleware: Authenticated user accessing ${currentPath}. Redirecting to dashboard.`
    );
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 3. Allow access / Update session cookies
  return response;
};
