import { createClient } from "@/lib/server";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { User, VerifiableCredential } from "@/lib/type";

async function analyzeDocumentsWithGemini(
  profileData: any,
  docUrls: { identity: string[]; income: string | null; additional: string[] }
): Promise<string[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Gemini API Key (NEXT_PUBLIC_GEMINI_API_KEY) is not set.");
    return [];
  }

  const geminiModel = "gemini-2.0-flash";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${apiKey}`;

  console.log("Preparing data for Gemini Analysis...");
  console.log("Profile Data (excluding password):", {
    ...profileData,
    password: "[REDACTED]",
  });
  console.log("Document URLs:", docUrls);

  const userProfileText = `Analyze the following user profile and document contents to determine suitable social assistance tags (aid_tags).
User Profile:
- Full Name: ${profileData.full_name || "N/A"}
- Job: ${profileData.job || "N/A"}
- Phone: ${profileData.phone_number || "N/A"}
- Family Size: ${profileData.family_number || "N/A"}
- Gender: ${profileData.gender || "N/A"}
- Location: ${profileData.address || "N/A"}, ${profileData.village || "N/A"}, ${profileData.regional || "N/A"}, ${profileData.country || "N/A"}
- Background Story: ${profileData.background_story || "N/A"}
- Declared Categories: ${Array.isArray(profileData.category) ? profileData.category.join(", ") : profileData.category || "N/A"}
`;

  const documentParts = [];

  for (const url of docUrls.identity) {
    documentParts.push({ text: `Identity Document: ${url}` });
  }

  if (docUrls.income) {
    documentParts.push({ text: `Income Document: ${docUrls.income}` });
  }

  for (const url of docUrls.additional) {
    documentParts.push({ text: `Additional Document: ${url}` });
  }

  const promptInstructions = `
Task: Based *only* on the provided user profile text and the *content inferred* from the document URLs (treat them as containing relevant identity, income, or supporting information), identify relevant social assistance tags. Focus on needs implied by income level (if inferrable), family size, job status, location, background story, declared categories, and potential evidence in documents (like age, dependents, disability proofs etc.).

Output Format: Respond ONLY with a JSON object containing a single key "aid_tags" whose value is an array of strings representing the suggested social assistance tags. Be concise and relevant. Example: {"aid_tags": ["low_income_support", "family_assistance", "unemployment_benefit"]}
`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: userProfileText },
          ...documentParts,
          { text: promptInstructions },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
    },
  };

  try {
    console.log("Calling Gemini API...");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Gemini API error (${response.status}): ${errorBody}`);
      try {
        const parsedError = JSON.parse(errorBody);
        throw new Error(
          `Gemini analysis failed (Status: ${response.status}): ${parsedError.error?.message || errorBody}`
        );
      } catch {
        throw new Error(
          `Gemini analysis failed (Status: ${response.status}): ${errorBody}`
        );
      }
    }

    const result = await response.json();
    console.log("Gemini API Raw Response:", JSON.stringify(result));

    const candidate = result.candidates?.[0];
    const content = candidate?.content;
    const part = content?.parts?.[0];
    let aidTags: string[] = [];

    if (part?.text) {
      try {
        const parsedJson = JSON.parse(part.text);
        if (parsedJson.aid_tags && Array.isArray(parsedJson.aid_tags)) {
          aidTags = parsedJson.aid_tags.filter(
            (tag: any) => typeof tag === "string"
          );
          console.log("Extracted aid_tags from Gemini:", aidTags);
        } else {
          console.warn(
            "Gemini response JSON does not contain a valid 'aid_tags' array.",
            parsedJson
          );
        }
      } catch (parseError) {
        console.error("Failed to parse Gemini JSON response:", parseError);
        console.error("Gemini raw text:", part.text);
      }
    } else {
      console.warn(
        "Could not find text part in Gemini response containing JSON.",
        result
      );
    }

    return aidTags;
  } catch (error: any) {
    console.error("Error calling Gemini or processing result:", error);
    return [];
  }
}

async function issueVerifiableCredential(
  userDid: string,
  userId: string,
  profileData: any,
  aidTags: string[]
): Promise<{
  success: boolean;
  credentialData?: any;
  uniqueTypes?: string[];
  error?: string;
}> {
  const apiKey = process.env.NEXT_PUBLIC_CHEQD_API_KEY;
  if (!apiKey) {
    console.error(
      "CHEQD_API_KEY environment variable is not set. Cannot issue VC."
    );
    return {
      success: false,
      error: "Configuration error: Cheqd API key missing.",
    };
  }

  const apiUrl = "https://studio-api.cheqd.net/credential/issue";

  const attributes: { [key: string]: any } = {};
  const excludeKeys = [
    "id",
    "password",
    "updated_at",
    "cheqd_did",
    "prove_of_identity",
    "prove_of_income",
    "additional_document",
    "category",
    "aid_tags",
  ];
  for (const key in profileData) {
    if (
      Object.prototype.hasOwnProperty.call(profileData, key) &&
      !excludeKeys.includes(key)
    ) {
      const value = profileData[key];
      if (value !== undefined && value !== null) {
        attributes[key] = value;
      }
    }
  }

  const credentialTypes = ["Person"];
  if (Array.isArray(profileData.category)) {
    credentialTypes.push(
      ...profileData.category.filter((c: any) => typeof c === "string")
    );
  } else if (
    typeof profileData.category === "string" &&
    profileData.category.trim() !== ""
  ) {
    credentialTypes.push(profileData.category);
  }
  if (Array.isArray(aidTags)) {
    credentialTypes.push(...aidTags.filter((t: any) => typeof t === "string"));
  }

  const uniqueTypes = [...new Set(credentialTypes)];

  const payload = {
    issuerDid: userDid,
    subjectDid: userDid,
    attributes: attributes,
    "@context": ["https://schema.org"],
    type: uniqueTypes,
    format: "jwt",
    credentialStatus: {
      statusPurpose: "suspension",
      statusListName: `aid-receiver-${userId}`,
      statusListIndex: 0,
    },
  };

  console.log(
    "Preparing Cheqd VC Issuance Payload:",
    JSON.stringify(payload, null, 2)
  );

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (e) {
      responseBody = await response.text();
    }

    if (!response.ok) {
      console.error(
        `Cheqd VC Issuance API error (${response.status}):`,
        responseBody
      );
      const errorMessage =
        typeof responseBody === "object"
          ? responseBody.message ||
            responseBody.error ||
            JSON.stringify(responseBody)
          : responseBody;
      throw new Error(
        `Failed to issue Cheqd VC (Status: ${response.status}): ${errorMessage}`
      );
    }

    console.log("Cheqd VC Issued Successfully:", responseBody);
    return {
      success: true,
      credentialData: responseBody,
      uniqueTypes: uniqueTypes,
    };
  } catch (error: any) {
    console.error("Error during Cheqd VC Issuance:", error.message);
    return { success: false, error: error.message };
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    console.error("Profile save error: User not authenticated", sessionError);
    return NextResponse.json(
      { error: "Unauthorized: User not authenticated." },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const userEmail = session.user.email;

  console.log(
    `Processing profile save request for user: ${userId}, email: ${userEmail}`
  );

  let receivedProfileData: any;
  try {
    const body = await request.json();
    receivedProfileData = body.profileData;
    if (!receivedProfileData)
      throw new Error("'profileData' missing in request body");

    console.log(
      "Received raw profile data:",
      JSON.stringify({
        ...receivedProfileData,
        password: "[REDACTED IF PRESENT]",
      })
    );
  } catch (e: any) {
    console.error("Profile save error: Invalid request body", e);
    return NextResponse.json(
      { error: `Invalid request body: ${e.message}` },
      { status: 400 }
    );
  }

  let did: string | null = null;
  let aidTags: string[] = [];
  let vcIssuanceResult: {
    success: boolean;
    credentialData?: any;
    uniqueTypes?: string[];
    error?: string;
  } = { success: false };

  try {
    console.log("Attempting Cheqd DID creation...");
    const cheqdApiKey = process.env.NEXT_PUBLIC_CHEQD_API_KEY;
    if (!cheqdApiKey) {
      throw new Error("Configuration error: Cheqd API key is missing.");
    }
    const didUUID = crypto.randomUUID();
    const generatedDid = `did:cheqd:testnet:${didUUID}`;
    const cheqdPayload = {
      network: "testnet",
      identifierFormatType: "uuid",
      assertionMethod: true,
      options: {
        key: "2d90f7efe81056be58816343077ecaf921e9fd431694446d72228d6ba9f3716f",
        verificationMethodType: "Ed25519VerificationKey2020",
      },
      didDocument: {
        "@context": ["https://w3id.org/security/suites/ed25519-2020/v1"],
        id: generatedDid,
        controller: [generatedDid],
        authentication: [`${generatedDid}#key-1`],
        service: [
          {
            id: `${generatedDid}#service-1`,
            type: "LinkedDomains",
            serviceEndpoint: ["https://example.com"],
          },
        ],
      },
    };
    const cheqdResponse = await fetch(
      "https://studio-api.cheqd.net/did/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": cheqdApiKey,
        },
        body: JSON.stringify(cheqdPayload),
      }
    );
    let cheqdResponseBody;
    try {
      cheqdResponseBody = await cheqdResponse.json();
    } catch (e) {
      cheqdResponseBody = await cheqdResponse.text();
    }
    if (!cheqdResponse.ok) {
      const errorMessage =
        typeof cheqdResponseBody === "object"
          ? cheqdResponseBody.message ||
            cheqdResponseBody.error ||
            JSON.stringify(cheqdResponseBody)
          : cheqdResponseBody;
      throw new Error(
        `Cheqd DID creation failed (Status: ${cheqdResponse.status}): ${errorMessage}`
      );
    }
    console.log("Cheqd DID created successfully:", cheqdResponseBody);
    did = generatedDid;
    console.log(`Cheqd DID ${did} created.`);

    console.log("Calling Gemini for aid_tags analysis...");
    const identityUrls = Array.isArray(receivedProfileData.prove_of_identity)
      ? receivedProfileData.prove_of_identity.filter(
          (url: any) => typeof url === "string"
        )
      : [];
    const incomeUrl =
      typeof receivedProfileData.prove_of_income === "string"
        ? receivedProfileData.prove_of_income
        : null;
    const additionalUrls = Array.isArray(
      receivedProfileData.additional_document
    )
      ? receivedProfileData.additional_document.filter(
          (url: any) => typeof url === "string"
        )
      : [];
    const docUrls = {
      identity: identityUrls,
      income: incomeUrl,
      additional: additionalUrls,
    };
    const profileForGemini = { ...receivedProfileData };
    delete profileForGemini.password;

    aidTags = await analyzeDocumentsWithGemini(profileForGemini, docUrls);
    console.log(
      `Gemini analysis completed. Generated aid_tags: ${aidTags.join(", ") || "None"}`
    );

    console.log(
      `Attempting to issue Verifiable Credential for user ${userId} with DID ${did}...`
    );
    vcIssuanceResult = await issueVerifiableCredential(
      did,
      userId,
      receivedProfileData,
      aidTags
    );
    if (!vcIssuanceResult.success) {
      throw new Error(
        `Failed to issue Verifiable Credential: ${vcIssuanceResult.error || "Unknown VC issuance error"}`
      );
    }

    const userData: User = {
      id: userId,
      password: receivedProfileData.password,
      email: userEmail as string,
      full_name: receivedProfileData.full_name,
      job: receivedProfileData.job,
      phone_number: Number(receivedProfileData.phone_number),
      family_number: Number(receivedProfileData.family_number),
      gender: receivedProfileData.gender,
      country: receivedProfileData.country,
      regional: receivedProfileData.regional,
      village: receivedProfileData.village,
      address: receivedProfileData.address,
      background_story: receivedProfileData.background_story,
      category: Array.isArray(receivedProfileData.category)
        ? `{${receivedProfileData.category.filter((c: any) => typeof c === "string").join(",")}}`
        : typeof receivedProfileData.category === "string"
          ? `{${receivedProfileData.category}}`
          : "{}",
      prove_of_identity: Array.isArray(receivedProfileData.prove_of_identity)
        ? `{${receivedProfileData.prove_of_identity.filter((u: any) => typeof u === "string").join(",")}}`
        : "{}",
      prove_of_income:
        typeof receivedProfileData.prove_of_income === "string"
          ? receivedProfileData.prove_of_income
          : null,
      additional_document: Array.isArray(
        receivedProfileData.additional_document
      )
        ? `{${receivedProfileData.additional_document.filter((u: any) => typeof u === "string").join(",")}}`
        : "{}",
      updated_at: new Date().toISOString(),
      cheqd_did: did,
      aid_tags:
        Array.isArray(aidTags) && aidTags.length > 0
          ? `{${aidTags.join(",")}}`
          : undefined,
    };
    if (isNaN(userData.phone_number as number)) userData.phone_number = null;
    if (isNaN(userData.family_number as number)) userData.family_number = null;
    console.log(
      "Final data prepared for DB upsert (password WILL be stored):",
      JSON.stringify({ ...userData, password: "[REDACTED FOR LOG]" })
    );

    try {
      console.log("Attempting database upsert for user...");
      const { error: upsertUserError } = await supabase
        .from("users")
        .upsert(userData, { onConflict: "id" });

      if (upsertUserError) {
        console.error("Database user upsert error:", upsertUserError);
        throw new Error(
          `Database error saving user profile: ${upsertUserError.message} (Code: ${upsertUserError.code})`
        );
      }
      console.log(`User profile for ${userId} upserted successfully.`);

      console.log("Attempting database insert for verifiable credential...");

      if (!vcIssuanceResult.credentialData || !vcIssuanceResult.uniqueTypes) {
        throw new Error(
          "Missing required data (credential data, types, ID from response) to save credential."
        );
      }

      const vcDataToInsert: VerifiableCredential = {
        user_id: userId,
        type: vcIssuanceResult.uniqueTypes.join(","),
        vc_json: vcIssuanceResult.credentialData,
        status: "issued",
      };

      const { error: insertVcError } = await supabase
        .from("verifiable_credentials")
        .insert(vcDataToInsert);

      if (insertVcError) {
        console.error("Database VC insert error:", insertVcError);
        throw new Error(
          `User profile saved, but failed to save Verifiable Credential: ${insertVcError.message} (Code: ${insertVcError.code})`
        );
      }
    } catch (dbError: any) {
      console.error("Error during database operations:", dbError.message);
      throw dbError;
    }

    return NextResponse.json(
      {
        message:
          "User profile saved, DID created, Verifiable Credential issued and saved successfully.",
        vcStatus: {
          success: true,
        },
        userId: userId,
        did: did,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during profile processing pipeline:", error.message);
    return NextResponse.json(
      {
        error: `Failed to process user profile: ${error.message}`,
        vcStatus: {
          success: vcIssuanceResult.success,
          error: vcIssuanceResult.error,
        },
      },
      { status: 500 }
    );
  }
}
