import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Missing or invalid token" },
        { status: 401 }
      );
    }
    const jwt = authHeader.split(" ")[1];

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(jwt);

    if (userError || !user) {
      console.error("Error fetching user or no user in session:", userError);
      return NextResponse.json(
        { error: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }

    // userId is now obtained from the session
    const userIdFromSession = user.id;

    const { data: applicationData, error: applicationError } = await supabase
      .from("applications")
      .select(
        `
        id,
        application_status,
        eligibility_score,
        timeline,
        created_at,
        program_id,
        aid_programs (
          *
        )
      `
      )
      .eq("user_id", userIdFromSession) // Use userId from session
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (applicationError) {
      if (applicationError.code === "PGRST116") {
        return NextResponse.json(
          { error: "No application found for this user." },
          { status: 404 }
        );
      }
      console.error("Error fetching application data:", applicationError);
      return NextResponse.json(
        {
          error: "Failed to fetch application data",
          details: applicationError.message,
        },
        { status: 500 }
      );
    }

    if (!applicationData) {
      return NextResponse.json(
        { error: "No application found for this user." },
        { status: 404 }
      );
    }

    const { aid_programs, ...appDataWithoutAidPrograms } = applicationData;
    const responseData = {
      ...appDataWithoutAidPrograms,
      program_details: aid_programs,
    };

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("Error in GET /api/monitoring:", error);
    // Check if it's an auth error from supabase.auth.getUser() if not caught above explicitly
    if (error.message.includes("Unauthorized") || error.status === 401) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid session or user not authenticated" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
