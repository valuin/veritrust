import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"; // Hapus
// import { cookies } from "next/headers"; // Hapus

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  // const cookieStore = cookies(); // Hapus
  // const supabase = createRouteHandlerClient({ cookies: () => cookieStore }); // Hapus, supabase sudah global
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // 1. Fetch distinct program_ids from applications for the user
    const { data: applicationProgramIds, error: applicationError } =
      await supabase
        .from("applications")
        .select("program_id")
        .eq("user_id", userId);

    if (applicationError) {
      console.error("Error fetching applied program IDs:", applicationError);
      return NextResponse.json(
        {
          error: "Failed to fetch applied program IDs",
          details: applicationError.message,
        },
        { status: 500 }
      );
    }

    if (!applicationProgramIds || applicationProgramIds.length === 0) {
      return NextResponse.json([], { status: 200 }); // No applied programs, return empty array
    }

    const distinctProgramIds = [
      ...new Set(applicationProgramIds.map((app) => app.program_id)),
    ];

    // 2. Fetch aid program details for these program_ids
    const { data: aidPrograms, error: programsError } = await supabase
      .from("aid_programs")
      .select(
        "program_id, name, description, created_at, required_tags, nominal, about, details, eligibility, how_to_apply"
      )
      .in("program_id", distinctProgramIds);

    if (programsError) {
      console.error("Error fetching aid program details:", programsError);
      return NextResponse.json(
        {
          error: "Failed to fetch aid program details",
          details: programsError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(aidPrograms || []);
  } catch (error: any) {
    console.error("Error in GET /api/saved-aid:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
