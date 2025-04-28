import { createClient } from "@/lib/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/login?error=missing_token", requestUrl)
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.exchangeCodeForSession(token);

  if (!error) {
    return NextResponse.redirect(new URL("/dashboard", requestUrl));
  }

  return NextResponse.redirect(
    new URL(`/auth/error?error=${error.message}`, requestUrl)
  );
}
