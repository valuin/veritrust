import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      console.error("API Error: User not authenticated or userId not found.");
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { data: applications, error: applicationError } = await supabase
      .from("applications")
      .select("program_id, application_status, id, created_at")
      .eq("user_id", userId);

    if (applicationError) {
      console.error("Error fetching user applications:", applicationError);
      return NextResponse.json(
        {
          error: "Failed to fetch user applications",
          details: applicationError.message,
        },
        { status: 500 }
      );
    }

    if (!applications || applications.length === 0) {
      console.log("No applications found for user:", userId);
      return NextResponse.json([], { status: 200 });
    }

    const distinctProgramIds = [
      ...new Set(applications.map((app) => app.program_id)),
    ].filter((id) => id != null); // Ensure no null/undefined IDs

    console.log(
      "Distinct Program IDs for aid_programs query:",
      distinctProgramIds
    );

    if (distinctProgramIds.length === 0) {
      console.log(
        "No valid distinct program IDs found after filtering, returning empty array for combined data."
      );
      return NextResponse.json([], { status: 200 });
    }

    const { data: aidPrograms, error: programsError } = await supabase
      .from("aid_programs") // VERIFY THIS TABLE NAME
      .select(
        "program_id, name, description, created_at, required_tags, nominal, about, details, eligibility, how_to_apply, img" // VERIFY 'img' COLUMN NAME
      )
      .in("program_id", distinctProgramIds);

    if (programsError) {
      console.error("Error fetching aid program details:", programsError);
      console.error("Query was .in('program_id',", distinctProgramIds, ")");
      return NextResponse.json(
        {
          error: "Failed to fetch aid program details",
          details: programsError.message,
        },
        { status: 500 }
      );
    }

    const aidProgramsMap = new Map(
      aidPrograms?.map((program) => [program.program_id, program]) || []
    );

    const combinedData = applications.map((app) => {
      const programDetails = aidProgramsMap.get(app.program_id);
      return {
        ...programDetails,
        id: app.id,
        application_status: app.application_status,
        created_at: app.created_at,
        // Ensure 'img' is correctly passed if available in programDetails
        img: programDetails?.img,
      };
    });

    return NextResponse.json(combinedData);
  } catch (error: any) {
    console.error("Error in GET /api/dashboard-wallet:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred", details: error.message },
      { status: 500 }
    );
  }
}
