import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const token = requestUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/login?error=missing_token", requestUrl)
    );
  }

  const { error } = await supabase.auth.exchangeCodeForSession(token);

  if (!error) {
    return NextResponse.redirect(new URL("/dashboard", requestUrl));
  }

  return NextResponse.redirect(
    new URL(`/auth/error?error=${error.message}`, requestUrl)
  );
}
