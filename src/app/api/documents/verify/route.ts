import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ExtractedInfo {
  name?: string;
  date?: string;
  amount?: string;
  [key: string]: string | undefined;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Get document type and file
    const documentType = formData.get('documentType');
    const documentFile = formData.get('document') as File | null;
    
    if (!documentType || !documentFile) {
      return NextResponse.json(
        { error: 'Document type and file are required' },
        { status: 400 }
      );
    }
    
    // Convert file to base64
    const buffer = await documentFile.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    // Create appropriate prompt based on document type
    let systemPrompt = 'You are a document verification expert. ';
    
    switch (documentType) {
      case 'id_card':
        systemPrompt += 'Verify if this is a valid ID card. Check for signs of tampering, inconsistencies, and extract personal information.';
        break;
      case 'pay_slip':
        systemPrompt += 'Analyze this pay slip to verify its authenticity. Extract income information, employer details, and payment period.';
        break;
      case 'profile_image':
        systemPrompt += 'Verify if this image appears to be a genuine profile photo of a real person. Look for any signs of AI generation or manipulation.';
        break;
      default:
        systemPrompt += 'Verify the authenticity of this document and extract key information.';
    }
    
    // Call OpenAI API with the latest model (GPT-4o)
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: systemPrompt
        },
        { 
          role: 'user', 
          content: [
            {
              type: 'text',
              text: `Please verify this ${documentType} document and extract relevant information.`
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
                detail: 'high',
              },
            }
          ]
        }
      ],
      max_tokens: 1000,
    });
    
    const analysisText = response.choices[0]?.message?.content || '';
    
    // Extract verification status
    let isVerified = false;
    if (
      analysisText.toLowerCase().includes('verified') ||
      analysisText.toLowerCase().includes('authentic') ||
      analysisText.toLowerCase().includes('legitimate')
    ) {
      isVerified = true;
    }
    
    // Extract extracted information
    const extractedInfo: ExtractedInfo = {};
    
    // Extract name if present
    const nameMatch = analysisText.match(/Name:?\s*([^\n]+)/i);
    if (nameMatch) {
      extractedInfo.name = nameMatch[1].trim();
    }
    
    // Extract date/dates if present
    const dateMatch = analysisText.match(/Date:?\s*([^\n]+)/i);
    if (dateMatch) {
      extractedInfo.date = dateMatch[1].trim();
    }
    
    // Extract amount/income if present (for pay slips)
    const amountMatch = analysisText.match(/Amount:?\s*([^\n]+)/i) || 
                       analysisText.match(/Income:?\s*([^\n]+)/i) || 
                       analysisText.match(/Salary:?\s*([^\n]+)/i);
    if (amountMatch) {
      extractedInfo.amount = amountMatch[1].trim();
    }
    
    return NextResponse.json({
      success: true,
      isVerified,
      analysisText,
      extractedInfo,
      documentType,
    });
    
  } catch (error) {
    console.error('Error in document verification:', error);
    return NextResponse.json(
      { error: 'Failed to verify document' },
      { status: 500 }
    );
  }
} 