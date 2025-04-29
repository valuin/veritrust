import { createClient } from "@/lib/server";
import crypto from "crypto";
import { NextResponse } from "next/server";

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

  let receivedProfileData;
  try {
    const body = await request.json();
    receivedProfileData = body.profileData;
    if (!receivedProfileData)
      throw new Error("'profileData' missing in request body");
    // Basic check if password exists in payload (as requested)
    if (typeof receivedProfileData.password !== "string") {
      console.warn("Password field missing or not a string in profileData");
      // Depending on policy, you might reject or proceed without password
      // For now, we'll proceed but log a warning.
    }
    console.log(
      "Received profile data (including password - UNSAFE):",
      receivedProfileData
    );
  } catch (e: any) {
    console.error("Profile save error: Invalid request body", e);
    return NextResponse.json(
      { error: `Invalid request body: ${e.message}` },
      { status: 400 }
    );
  }

  let did: string | null = null;
  try {
    console.log("Attempting Cheqd DID creation before saving profile...");
    const apiKey = process.env.NEXT_PUBLIC_CHEQD_API_KEY;
    if (!apiKey) {
      console.error(
        // Log as error because it prevents saving
        "CHEQD_API_KEY environment variable is not set. Cannot create DID and save profile."
      );
      throw new Error(
        "Configuration error: Cheqd API key is missing, cannot proceed with profile creation."
      );
    }

    // Generate DID components
    const didUUID = crypto.randomUUID();
    const generatedDid = `did:cheqd:testnet:${didUUID}`;

    // Construct Cheqd API Payload
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

    console.log(`Sending request to Cheqd API for DID: ${generatedDid}`);

    // Call Cheqd API using fetch
    const cheqdResponse = await fetch(
      "https://studio-api.cheqd.net/did/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(cheqdPayload),
      }
    );

    // Check Cheqd API response
    if (!cheqdResponse.ok) {
      const errorBody = await cheqdResponse.text();
      console.error(
        `Cheqd API request failed with status ${cheqdResponse.status}: ${errorBody}`
      );
      throw new Error(
        `Failed to create Cheqd DID (Status: ${cheqdResponse.status}). Profile cannot be saved.`
      );
    }

    const cheqdResult = await cheqdResponse.json();
    console.log("Cheqd DID created successfully:", cheqdResult);
    did = generatedDid; // Assign the successfully created DID
    console.log(`Cheqd DID ${did} will be saved with the profile.`);
  } catch (didError: any) {
    console.error("Error during Cheqd DID creation:", didError.message);
    return NextResponse.json(
      {
        error: `Failed to create necessary DID: ${didError.message}. Profile was not saved.`,
      },
      { status: 500 } // Internal Server Error or appropriate status
    );
  }

  if (!did) {
    console.error(
      "Logical error: DID is null after successful block, preventing profile save."
    );
    return NextResponse.json(
      { error: "Internal error: Failed to obtain DID before saving profile." },
      { status: 500 }
    );
  }

  const userData: any = {
    id: userId,
    email: userEmail,
    full_name: receivedProfileData.full_name,
    job: receivedProfileData.job,
    phone_number: receivedProfileData.phone_number,
    family_number: receivedProfileData.family_number,
    gender: receivedProfileData.gender,
    country: receivedProfileData.country,
    regional: receivedProfileData.regional,
    village: receivedProfileData.village,
    address: receivedProfileData.address,
    background_story: receivedProfileData.background_story,
    category: receivedProfileData.category,
    prove_of_identity: receivedProfileData.prove_of_identity, // Will format below
    prove_of_income: receivedProfileData.prove_of_income,
    additional_document: receivedProfileData.additional_document, // Will format below
    updated_at: new Date().toISOString(),
    cheqd_did: did, // Include the generated DID
  };

  if (receivedProfileData.password) {
    userData.password = receivedProfileData.password; // Still potentially unsafe
  }

  if (Array.isArray(userData.prove_of_identity)) {
    userData.prove_of_identity = `{${userData.prove_of_identity.join(",")}}`;
  } else {
    console.warn(
      "prove_of_identity was not an array, setting to empty array literal {}"
    );
    userData.prove_of_identity = "{}";
  }

  if (Array.isArray(userData.additional_document)) {
    userData.additional_document = `{${userData.additional_document.join(",")}}`;
  } else {
    console.warn(
      "additional_document was not an array, setting to empty array literal {}"
    );
    userData.additional_document = "{}";
  }

  console.log("Data formatted for DB upsert (including DID):", userData);

  try {
    console.log("Attempting upsert with formatted data and DID...");
    const { error: upsertError } = await supabase
      .from("users")
      .upsert(userData, { onConflict: "id" }); // Use the formatted userData with DID

    if (upsertError) {
      console.error("Database upsert error after DID creation:", upsertError);
      // Optional: Attempt to delete the created DID if the DB save fails? (Adds complexity)
      throw new Error(`Database error saving profile: ${upsertError.message}`);
    }
    console.log(
      `Profile for user ${userId} with DID ${did} upserted successfully.`
    );

    return NextResponse.json(
      { message: "User profile and DID saved successfully." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during final profile save:", error);
    return NextResponse.json(
      {
        error:
          error.message ||
          "Failed to save profile data after DID creation. DID may have been created but profile is not updated.",
      },
      { status: 500 }
    );
  }
}
