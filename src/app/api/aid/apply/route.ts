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
  aid_program_id: string;
  status: string;
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

    // Extract documents
    const idCard = formData.get("idCard") as File | null;
    const profileImage = formData.get("profileImage") as File | null;
    const paySlip = formData.get("paySlip") as File | null;
    const additionalDocs = formData.getAll("additionalDocs") as File[];

    // Upload documents to Supabase Storage
    const documentUrls: string[] = [];

    if (idCard) {
      const buffer = await idCard.arrayBuffer();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(`${userId}/id_card_${Date.now()}.jpg`, buffer, {
          contentType: idCard.type,
        });

      if (uploadError) {
        console.error("Error uploading ID card:", uploadError);
      } else if (uploadData) {
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(uploadData.path);

        documentUrls.push(urlData.publicUrl);
      }
    }

    if (profileImage) {
      const buffer = await profileImage.arrayBuffer();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(`${userId}/profile_image_${Date.now()}.jpg`, buffer, {
          contentType: profileImage.type,
        });

      if (uploadError) {
        console.error("Error uploading profile image:", uploadError);
      } else if (uploadData) {
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(uploadData.path);

        documentUrls.push(urlData.publicUrl);
      }
    }

    if (paySlip) {
      const buffer = await paySlip.arrayBuffer();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(`${userId}/pay_slip_${Date.now()}.jpg`, buffer, {
          contentType: paySlip.type,
        });

      if (uploadError) {
        console.error("Error uploading pay slip:", uploadError);
      } else if (uploadData) {
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(uploadData.path);

        documentUrls.push(urlData.publicUrl);
      }
    }

    // Process additional documents
    for (let i = 0; i < additionalDocs.length; i++) {
      const doc = additionalDocs[i];
      const buffer = await doc.arrayBuffer();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(`${userId}/additional_doc_${i}_${Date.now()}.jpg`, buffer, {
          contentType: doc.type,
        });

      if (uploadError) {
        console.error(`Error uploading additional document ${i}:`, uploadError);
      } else if (uploadData) {
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(uploadData.path);

        documentUrls.push(urlData.publicUrl);
      }
    }

    // Prepare images and data for AI analysis
    const imageContents: ChatContentItem[] = [];

    if (idCard) {
      const buffer = await idCard.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      imageContents.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${base64}`,
          detail: "high",
        },
      });
    }

    if (profileImage) {
      const buffer = await profileImage.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      imageContents.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${base64}`,
          detail: "high",
        },
      });
    }

    if (paySlip) {
      const buffer = await paySlip.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      imageContents.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${base64}`,
          detail: "high",
        },
      });
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

    // Determine status based on overall score
    const status = eligibilityScore
      ? eligibilityScore >= 70
        ? "Likely Eligible"
        : eligibilityScore >= 40
          ? "Possibly Eligible"
          : "Likely Ineligible"
      : "Pending Review";

    // Save application to database
    const application: AidApplication = {
      user_id: userId as string,
      aid_program_id: aidProgramId as string,
      status: "pending",
      eligibility_score: eligibilityScore,
      analysis_result: analysisResult,
      eligibility_metrics: eligibilityMetrics,
      documents: documentUrls,
      profile_data: profileDataObj,
      category: category as string | undefined,
    };

    // Insert into Supabase
    const { data, error } = await supabase
      .from("aid_applications")
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

    return NextResponse.json({
      success: true,
      applicationId: data.id,
      eligibilityScore,
      eligibilityMetrics,
      status,
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
