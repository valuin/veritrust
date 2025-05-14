import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"; // Hapus
// import { cookies } from "next/headers"; // Hapus

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface EligibilityAnalysis {
  user_id: string;
  application_id: string;
  analysis_result: string;
  eligibility_score: number | null;
  eligibility_metrics?: Record<string, any> | null;
  aid_program: string;
  status?: string;
  created_at: string;
}

// Save eligibility analysis result
export async function POST(request: NextRequest) {
  // const cookieStore = cookies(); // Hapus
  // const supabase = createRouteHandlerClient({ cookies: () => cookieStore }); // Hapus, supabase sudah global
  try {
    const {
      userId,
      applicationId,
      analysisResult,
      eligibilityScore,
      eligibilityMetrics,
      aidProgram,
    } = await request.json();

    if (!userId || !applicationId || !analysisResult) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Calculate status based on score
    const status = eligibilityScore
      ? eligibilityScore >= 70
        ? "Likely Eligible"
        : eligibilityScore >= 40
          ? "Possibly Eligible"
          : "Likely Ineligible"
      : "Pending Review";

    // Save to Supabase
    const { data, error } = await supabase
      .from("eligibility_analyses")
      .insert({
        user_id: userId,
        application_id: applicationId,
        analysis_result: analysisResult,
        eligibility_score: eligibilityScore,
        eligibility_metrics: eligibilityMetrics,
        aid_program: aidProgram,
        status: status,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving eligibility analysis:", error);
      return NextResponse.json(
        { error: "Failed to save analysis" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      status: status,
      message: "Eligibility analysis saved successfully",
    });
  } catch (error) {
    console.error("Error in eligibility status API:", error);
    return NextResponse.json(
      { error: "Failed to process eligibility status" },
      { status: 500 }
    );
  }
}

// Get eligibility analysis result
export async function GET(request: NextRequest) {
  // const cookieStore = cookies(); // Hapus
  // const supabase = createRouteHandlerClient({ cookies: () => cookieStore }); // Hapus, supabase sudah global
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const applicationId = searchParams.get("applicationId");

    if (!userId && !applicationId) {
      return NextResponse.json(
        { error: "Either userId or applicationId is required" },
        { status: 400 }
      );
    }

    let query = supabase.from("eligibility_analyses").select("*");

    if (userId) {
      query = query.eq("user_id", userId);
    }

    if (applicationId) {
      query = query.eq("application_id", applicationId);
    }

    // Get the most recent analyses first
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error retrieving eligibility analyses:", error);
      return NextResponse.json(
        { error: "Failed to retrieve analyses" },
        { status: 500 }
      );
    }

    // Format the response with status field if not present
    const formattedData = data.map((analysis: EligibilityAnalysis) => {
      if (!analysis.status && analysis.eligibility_score !== null) {
        analysis.status =
          analysis.eligibility_score >= 70
            ? "Likely Eligible"
            : analysis.eligibility_score >= 40
              ? "Possibly Eligible"
              : "Likely Ineligible";
      }
      return analysis;
    });

    return NextResponse.json({
      success: true,
      analyses: formattedData,
    });
  } catch (error) {
    console.error("Error in eligibility status API:", error);
    return NextResponse.json(
      { error: "Failed to retrieve eligibility status" },
      { status: 500 }
    );
  }
}
