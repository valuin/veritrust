import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Sample test user data
const sampleUserData = {
  name: "John Smith",
  email: "john.smith@example.com",
  phone: "+601234567890",
  jobs: "Construction worker",
  address: "Block A, Apartment 123, KL",
  country: "Malaysia",
  regional: "Kuala Lumpur",
  village: "Sentul",
  family: "4 members",
  category: "Refugees",
  backgroundStory:
    "Fled from conflict in home country with my family including two young children. Currently working in construction but struggling to meet basic needs. My youngest child has a medical condition requiring regular treatment.",
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function GET(request: NextRequest) {
  try {
    // Check for secret key to prevent unauthorized access
    const { searchParams } = new URL(request.url);
    const secretKey = searchParams.get("secretKey");

    if (secretKey !== process.env.SETUP_SECRET_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate mock analysis without using real images
    // This simulates what the eligibility/analyze endpoint would return
    const systemPrompt = `You are an aid eligibility analyst. Generate a sample eligibility analysis for a test user.
    
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
    // Add all 5 metrics
  ],
  "summary": "<1-2 paragraph summary of overall findings>",
  "possibleFraud": <boolean>,
  "confidenceLevel": "<low|medium|high>"
}

The user is a refugee named ${sampleUserData.name} who fled from conflict with a family of 4 including two young children. One child has a medical condition. They work in construction but struggle financially.`;

    // Call OpenAI with the latest model (GPT-4o)
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: systemPrompt }],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });

    const analysisText = response.choices[0]?.message?.content || "";

    // Parse the JSON response
    let eligibilityResult;
    try {
      eligibilityResult = JSON.parse(analysisText);
    } catch (error) {
      console.error("Error parsing JSON from OpenAI:", error);
      console.log("Raw response:", analysisText);

      return NextResponse.json(
        { error: "Failed to parse eligibility analysis result" },
        { status: 500 }
      );
    }

    // Determine status based on overall score
    const status =
      eligibilityResult.overallScore >= 70
        ? "Likely Eligible"
        : eligibilityResult.overallScore >= 40
          ? "Possibly Eligible"
          : "Likely Ineligible";

    // Return test data along with the analysis
    return NextResponse.json({
      success: true,
      message: "This is a test analysis using mock data with GPT-4o",
      testUserData: sampleUserData,
      eligibilityResult: {
        ...eligibilityResult,
        status,
      },
      howToTest: {
        description:
          "To test the actual analyze endpoint with images, use the following curl command:",
        curlCommand: `curl -X POST http://localhost:3000/api/eligibility/analyze \\
  -F "userData=$(cat <<EOF
${JSON.stringify(sampleUserData, null, 2)}
EOF
)" \\
  -F "idCard=@/path/to/id_card.jpg" \\
  -F "profileImage=@/path/to/profile.jpg" \\
  -F "paySlip=@/path/to/payslip.jpg"`,
      },
    });
  } catch (error) {
    console.error("Error in test eligibility:", error);
    return NextResponse.json(
      { error: "Failed to generate test analysis" },
      { status: 500 }
    );
  }
}
