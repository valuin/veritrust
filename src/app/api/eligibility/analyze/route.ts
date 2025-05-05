import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
// Note: You'll need to set OPENAI_API_KEY in your environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define interfaces for OpenAI message content
interface ImageContent {
  type: 'image_url';
  image_url: {
    url: string;
    detail: 'low' | 'high' | 'auto';
  };
}

interface TextContent {
  type: 'text';
  text: string;
}

type MessageContent = TextContent | ImageContent;

interface ImageData {
  type: string;
  content: string;
}

// Define interfaces for more detailed eligibility metrics
interface EligibilityMetric {
  name: string;
  score: number;
  maxScore: number;
  explanation: string;
}

interface EligibilityResult {
  overallScore: number;
  status: string;
  metrics: EligibilityMetric[];
  summary: string;
  possibleFraud: boolean;
  confidenceLevel: 'low' | 'medium' | 'high';
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract user profile data
    const userData = formData.get('userData');
    if (!userData || typeof userData !== 'string') {
      return NextResponse.json(
        { error: 'User data is required' },
        { status: 400 }
      );
    }
    
    const userDataObj = JSON.parse(userData);
    
    // Extract uploaded images (ID card, profile picture, pay slip)
    const idCard = formData.get('idCard') as File | null;
    const profileImage = formData.get('profileImage') as File | null;
    const paySlip = formData.get('paySlip') as File | null;
    const additionalDocs = formData.getAll('additionalDocs') as File[];
    
    // Prepare images for analysis
    const imageContents: ImageData[] = [];
    
    // Convert files to base64 for OpenAI API
    if (idCard) {
      const buffer = await idCard.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageContents.push({
        type: 'id_card',
        content: base64,
      });
    }
    
    if (profileImage) {
      const buffer = await profileImage.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageContents.push({
        type: 'profile_image',
        content: base64,
      });
    }
    
    if (paySlip) {
      const buffer = await paySlip.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageContents.push({
        type: 'pay_slip',
        content: base64,
      });
    }
    
    // Process additional documents
    for (const doc of additionalDocs) {
      const buffer = await doc.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageContents.push({
        type: 'additional_document',
        content: base64,
      });
    }
    
    // Create prompt for GPT-4 Vision with detailed metrics requirements
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

    // Create message content with images and user data
    const messageContent: MessageContent[] = [
      {
        type: 'text',
        text: `Please analyze the following user profile and documents to determine eligibility for social aid:
User Profile: ${JSON.stringify(userDataObj, null, 2)}
Selected Category: ${userDataObj.category || 'Not specified'}
Background Story: ${userDataObj.backgroundStory || 'Not provided'}`,
      },
    ];
    
    // Add image content to the message
    for (const imageData of imageContents) {
      messageContent.push({
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${imageData.content}`,
          detail: 'high',
        },
      });
    }
    
    // Call OpenAI API with the latest model (GPT-4o)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: messageContent },
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    });
    
    // Process and extract structured data from the response
    const analysisText = response.choices[0]?.message?.content || '';
    
    // Parse the JSON response
    let eligibilityResult: EligibilityResult;
    try {
      eligibilityResult = JSON.parse(analysisText);
    } catch (error) {
      console.error('Error parsing JSON from OpenAI:', error);
      console.log('Raw response:', analysisText);
      
      // Return a formatted error
      return NextResponse.json(
        { error: 'Failed to parse eligibility analysis result' },
        { status: 500 }
      );
    }
    
    // Determine status based on overall score
    const status = 
      eligibilityResult.overallScore >= 70 ? 'Likely Eligible' : 
      eligibilityResult.overallScore >= 40 ? 'Possibly Eligible' : 
      'Likely Ineligible';
    
    // Return the detailed analysis 
    return NextResponse.json({
      success: true,
      eligibilityResult: {
        ...eligibilityResult,
        status
      },
      rawAnalysis: analysisText
    });
    
  } catch (error) {
    console.error('Error in eligibility analysis:', error);
    return NextResponse.json(
      { error: 'Failed to analyze eligibility' },
      { status: 500 }
    );
  }
} 