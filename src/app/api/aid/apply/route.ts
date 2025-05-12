import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

// Initialize Supabase and OpenAI clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

interface AidApplication {
  user_id: string;
  program_id: string;
  application_status: string;
  eligibility_score?: number | null;
  analysis_result?: string | null;
  eligibility_metrics?: Record<string, any> | null;
  documents?: string[];
  profile_data: Record<string, any>;
  category?: string;
  feedback?: string;
}

// Interface for content types in OpenAI API
type ChatContentItem =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "image_url";
      image_url: {
        url: string;
        detail: "low" | "high" | "auto";
      };
    };

// Define interfaces for more detailed eligibility metrics
interface EligibilityMetric {
  name: string;
  score: number;
  maxScore: number;
  explanation: string;
}

interface EligibilityResult {
  overallScore: number;
  metrics: EligibilityMetric[];
  summary: string;
  possibleFraud: boolean;
  confidenceLevel: "low" | "medium" | "high";
  status?: string;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract application data
    const userId = formData.get("userId");
    const aidProgramId = formData.get("aidProgramId");
    const profileData = formData.get("profileData");
    const category = formData.get("category");

    // Validate required fields
    if (
      !userId ||
      !aidProgramId ||
      !profileData ||
      typeof profileData !== "string"
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const profileDataObj = JSON.parse(profileData);

    // -- Ambil Data Pengguna dari Supabase --
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("prove_of_identity, prove_of_income, additional_document")
      .eq("id", userId as string)
      .single();

    if (userError || !userData) {
      console.error("Error fetching user data:", userError);
      return NextResponse.json(
        { error: "Failed to fetch user document data" },
        { status: 500 }
      );
    }

    // -- Kumpulkan URL Dokumen dari Data Pengguna --
    const existingDocumentUrls: string[] = [];

    // Handle prove_of_identity (text[])
    if (Array.isArray(userData.prove_of_identity)) {
      existingDocumentUrls.push(
        ...userData.prove_of_identity.filter(
          (url) => typeof url === "string" && url.startsWith("http")
        )
      );
    } else if (
      typeof userData.prove_of_identity === "string" &&
      userData.prove_of_identity.startsWith("http")
    ) {
      // Fallback jika ternyata bukan array tapi string tunggal
      existingDocumentUrls.push(userData.prove_of_identity);
    }

    // Handle prove_of_income (asumsi string tunggal berdasarkan error)
    if (
      userData.prove_of_income &&
      typeof userData.prove_of_income === "string" &&
      userData.prove_of_income.startsWith("http")
    ) {
      existingDocumentUrls.push(userData.prove_of_income);
    }

    // Handle additional_document (text[])
    if (Array.isArray(userData.additional_document)) {
      existingDocumentUrls.push(
        ...userData.additional_document.filter(
          (url) => typeof url === "string" && url.startsWith("http")
        )
      );
    } else if (
      typeof userData.additional_document === "string" &&
      userData.additional_document.startsWith("http")
    ) {
      // Fallback jika ternyata bukan array tapi string tunggal
      existingDocumentUrls.push(userData.additional_document);
    }

    // Prepare images and data for AI analysis using EXISTING URLs
    const imageContents: ChatContentItem[] = [];

    for (const url of existingDocumentUrls) {
      // Pastikan URL valid sebelum ditambahkan
      if (url && typeof url === "string" && url.startsWith("http")) {
        imageContents.push({
          type: "image_url",
          image_url: {
            url: url,
            detail: "low",
          },
        });
      } else {
        console.warn(`Invalid or missing URL skipped for AI analysis: ${url}`);
      }
    }

    // Analyze with OpenAI if documents are provided
    let eligibilityScore = null;
    let analysisResult = null;
    let eligibilityMetrics = null;

    if (imageContents.length > 0) {
      // Create prompt for GPT-4 Vision with detailed metrics
      const systemPrompt = `You are an aid eligibility analyst. Your task is to:
1. Verify the authenticity of submitted documents (check for signs of manipulation or inconsistency)
2. Extract relevant information from the documents and images
3. Compare the extracted information with the user-provided profile data for consistency
4. Evaluate the eligibility based on the criteria for the selected aid category
5. Provide detailed metrics with scoring and reasoning

For your assessment, evaluate and score the following metrics (each out of 20 points):
- DOCUMENT_AUTHENTICITY: Assess if the documents appear genuine and unaltered
- NEED_ASSESSMENT: Evaluate the level of financial or social need based on documents and profile
- INFORMATION_CONSISTENCY: Check if information across documents and profile data is consistent
- CATEGORY_ELIGIBILITY: Determine how well they match the specific aid category requirements
- VULNERABILITY_FACTORS: Identify presence of additional vulnerability factors that strengthen the case

Provide your response in the following JSON format:
{
  "overallScore": <0-100 number>,
  "metrics": [
    {
      "name": "DOCUMENT_AUTHENTICITY",
      "score": <0-20 number>,
      "maxScore": 20,
      "explanation": "<detailed reasoning for this score>"
    },
    // Repeat for all 5 metrics
  ],
  "summary": "<1-2 paragraph summary of overall findings>",
  "possibleFraud": <boolean>,
  "confidenceLevel": "<low|medium|high>"
}`;

      // Prepare full prompt with user data
      const textContent: ChatContentItem = {
        type: "text",
        text: `Please analyze the following user profile and documents to determine eligibility for social aid:
User Profile: ${JSON.stringify(profileDataObj, null, 2)}
Selected Category: ${category || "Not specified"}`,
      };

      // Create message content array
      const userContent = [textContent, ...imageContents];

      // Call OpenAI API with the latest model (GPT-4o)
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000,
      });

      analysisResult = response.choices[0]?.message?.content || "";

      // Try to parse the JSON response
      try {
        const eligibilityResult: EligibilityResult = JSON.parse(analysisResult);
        eligibilityScore = eligibilityResult.overallScore;
        eligibilityMetrics = eligibilityResult;
      } catch (error) {
        console.error("Error parsing JSON from OpenAI:", error);
        console.log("Raw response:", analysisResult);

        // Extract score using regex as a fallback
        const scoreMatch = analysisResult.match(
          /overallScore"?\s*[:=]\s*(\d+)/i
        );
        eligibilityScore = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
      }
    }

    // Save application to database
    const application: AidApplication = {
      user_id: userId as string,
      program_id: aidProgramId as string,
      application_status: "pending",
      eligibility_score: eligibilityScore,
      analysis_result: analysisResult,
      eligibility_metrics: eligibilityMetrics,
      documents: existingDocumentUrls,
      profile_data: profileDataObj,
      category: category as string | undefined,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("applications")
      .insert(application)
      .select()
      .single();

    if (error) {
      console.error("Error saving aid application:", error);
      return NextResponse.json(
        { error: "Failed to submit application" },
        { status: 500 }
      );
    }

    // Determine final status based on analysis (if performed)
    const finalStatus =
      eligibilityMetrics &&
      typeof eligibilityMetrics === "object" &&
      "overallScore" in eligibilityMetrics
        ? eligibilityMetrics.overallScore >= 70
          ? "Likely Eligible"
          : eligibilityMetrics.overallScore >= 40
            ? "Possibly Eligible"
            : "Likely Ineligible"
        : "Submitted (Pending Verification)"; // Default if no analysis done here

    return NextResponse.json({
      success: true,
      applicationId: data.id,
      eligibilityScore,
      eligibilityMetrics,
      status: finalStatus, // Return the determined status
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Error in aid application:", error);
    return NextResponse.json(
      { error: "Failed to process application" },
      { status: 500 }
    );
  }
}
