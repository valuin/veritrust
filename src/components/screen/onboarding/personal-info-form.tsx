"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Info, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CategorySelector } from "./category-selector";
import { FileUpload } from "./file-upload";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

interface InitialOnboardingData {
  firstName?: string;
  lastName?: string;
  job?: string;
  phone?: string;
  family_number?: string;
  email?: string;
  password?: string;
}

export default function PersonalInfoFormContainer(props: object) {
  const supabase = createClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [familyNumber, setFamilyNumber] = useState("");
  const [password, setPassword] = useState("");

  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [regional, setRegional] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [backgroundStory, setBackgroundStory] = useState("");
  const [backgroundEditable, setBackgroundEditable] = useState(false);

  const [identityFile, setIdentityFile] = useState<File | null>(null);
  const [familyMemberFile, setFamilyMemberFile] = useState<File | null>(null);
  const [incomeFile, setIncomeFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<(File | null)[]>([]);
  const [additionalDocCount, setAdditionalDocCount] = useState(1);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = [
    "Orphan",
    "Single Mom",
    "Disability",
    "Elderly",
    "Refugees",
    "Jobless",
    "Veteran",
    "Health Crisis",
  ];

  useEffect(() => {
    const storedDataString = localStorage.getItem("onboardingData");
    if (storedDataString) {
      try {
        const storedData: InitialOnboardingData = JSON.parse(storedDataString);

        setFullName(
          `${storedData.firstName || ""} ${storedData.lastName || ""}`.trim()
        );
        setJob(storedData.job || "");
        setEmail(storedData.email || "");
        setPhone(storedData.phone || "");
        setFamilyNumber(storedData.family_number || "");
        setPassword(storedData.password || "");
      } catch (e) {
        console.error("Failed to parse onboarding data from localStorage", e);
        setError(
          "Failed to load initial profile data. Please try signing up again."
        );
      }
    } else {
      setError(
        "Initial profile data not found. Please complete the sign-up step first."
      );
    }
  }, []);

  const handleAddDoc = () => {
    setAdditionalDocCount((prev) => prev + 1);
    setAdditionalFiles((prev) => [...prev, null]);
  };

  const handleAdditionalFileChange = (index: number, file: File | null) => {
    setAdditionalFiles((prev) => {
      const newFiles = [...prev];
      newFiles[index] = file;
      return newFiles;
    });
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const uploadFile = async (
    file: File | null,
    pathPrefix: string,
    bucketName: string
  ): Promise<string | null> => {
    if (!file) return null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated for file upload.");
    const userId = user.id;

    const fileExt = file.name.split(".").pop();
    const filePath = `${userId}/${pathPrefix}-${Date.now()}.${fileExt}`;

    console.log(
      `Uploading ${file.name} to bucket: ${bucketName}, path: ${filePath}`
    );

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) {
      console.error(
        `Error uploading ${pathPrefix} to ${bucketName}:`,
        uploadError
      );
      if (uploadError.message.includes("bucket not found")) {
        throw new Error(
          `Storage bucket "${bucketName}" not found. Please create it first.`
        );
      }
      throw new Error(`Failed to upload ${pathPrefix}. ${uploadError.message}`);
    }

    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) {
      console.warn(
        `Could not get public URL for ${filePath} in bucket ${bucketName}.`
      );
      throw new Error(`Failed to get public URL for uploaded ${pathPrefix}.`);
    }

    console.log(`Successfully uploaded ${pathPrefix} to ${urlData.publicUrl}`);
    return urlData.publicUrl;
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error(
          userError?.message || "User session expired. Please log in again."
        );
      }

      console.log("Starting file uploads to specific buckets...");

      // Define target buckets
      const identityBucket = "proveidentity";
      const incomeBucket = "proveincome";
      const additionalBucket = "additionaldocument";

      // Create upload promises with correct bucket names
      const uploadPromises = [
        uploadFile(identityFile, "identity", identityBucket),
        uploadFile(familyMemberFile, "family", identityBucket),
        uploadFile(incomeFile, "income", incomeBucket),
        ...additionalFiles
          .filter((file): file is File => file !== null)
          .map((file, index) =>
            uploadFile(file, `additional-${index}`, additionalBucket)
          ),
      ];

      // Wait for all uploads to complete
      const [identityUrl, familyMemberUrl, incomeUrl, ...additionalUrls] =
        await Promise.all(uploadPromises);
      console.log("File uploads complete.");

      // --- Explicitly filter null/undefined URLs ---
      const validIdentityUrls = [identityUrl, familyMemberUrl].filter(
        (url): url is string => typeof url === "string" && url.length > 0
      );
      // Ensure incomeUrl is valid or handle appropriately
      const validIncomeUrl =
        typeof incomeUrl === "string" && incomeUrl.length > 0
          ? incomeUrl
          : null;
      const validAdditionalUrls = additionalUrls.filter(
        (url): url is string => typeof url === "string" && url.length > 0
      );

      console.log("Valid URLs:", {
        prove_of_identity: validIdentityUrls,
        prove_of_income: validIncomeUrl,
        additional_document: validAdditionalUrls,
      });

      if (validIdentityUrls.length < 2 || !validIncomeUrl) {
        throw new Error(
          "Required documents (ID Card, Family Proof, Income Proof) must be uploaded successfully."
        );
      }

      const profileData = {
        full_name: fullName,
        job: job,
        phone_number: phone,
        family_number: familyNumber,
        email: email,
        password: password,
        gender,
        country,
        regional,
        village,
        address,
        background_story: backgroundStory,
        category: selectedCategories,

        prove_of_identity: validIdentityUrls,
        prove_of_income: validIncomeUrl,
        additional_document: validAdditionalUrls,
      };

      console.log("Submitting profile data (validated URLs):", profileData);

      const response = await fetch("/api/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileData }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save profile to database.");
      }

      console.log("Profile saved successfully!");
      localStorage.removeItem("onboardingData");
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Save profile error:", err);
      setError(
        err.message || "An unexpected error occurred while saving your profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4 py-8 gap-8 overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl md:text-3xl mb-1">
          Make sure your data are valid!
        </h1>
        <p className="text-gray-600 mb-4">
          The more complete your data, the greater your chances of getting
          social assistance
        </p>
        <hr className="mb-4" />
      </div>

      {/* Profile Header Bar */}
      <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 mb-2">
        <span className="font-bold text-blue-700">YOUR PROFILE</span>
        <a
          href="#"
          className="text-blue-600 underline flex items-center gap-1 text-sm"
        >
          <Info className="w-4 h-4" />
          Click here for submission guidance
        </a>
      </div>

      {/* General Information - Pre-filled and disabled */}
      <section>
        <h2 className="font-semibold text-lg mb-2">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Name"
            value={fullName}
            disabled
            className="disabled:opacity-75 disabled:cursor-not-allowed"
          />
          <Input
            placeholder="Jobs"
            value={job}
            disabled
            className="disabled:opacity-75 disabled:cursor-not-allowed"
          />
          <Input
            placeholder="Email"
            type="email"
            value={email}
            disabled
            className="disabled:opacity-75 disabled:cursor-not-allowed"
          />
          <Input
            placeholder="Phone"
            type="tel"
            value={phone}
            disabled
            className="disabled:opacity-75 disabled:cursor-not-allowed"
          />
          <Select value={gender} onValueChange={setGender} disabled={isLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Family"
            value={familyNumber}
            disabled
            className="disabled:opacity-75 disabled:cursor-not-allowed"
          />
        </div>
      </section>

      {/* Location - New inputs */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="Regional"
            value={regional}
            onChange={(e) => setRegional(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="Village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            disabled={isLoading}
          />
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </section>

      {/* Background Story */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Background Story</h2>
        <div className="flex items-start gap-2">
          <Textarea
            placeholder="Tell us your story..."
            className="flex-1 min-h-[100px]"
            value={backgroundStory}
            onChange={(e) => setBackgroundStory(e.target.value)}
            disabled={!backgroundEditable || isLoading}
          />
          <Button
            type="button"
            variant="outline"
            className="h-10"
            onClick={() => setBackgroundEditable((v) => !v)}
            disabled={isLoading}
          >
            {backgroundEditable ? "Lock" : "Edit"}
          </Button>
        </div>
      </section>

      {/* Prove of Identity */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Prove of Identity</h2>
        <p className="text-gray-500 text-sm mb-2">
          (add your ID card and Family Member Proof)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileUpload
            label="Input ID Card"
            onChange={setIdentityFile}
            disabled={isLoading}
          />
          <FileUpload
            label="Input Family Member Proof"
            onChange={setFamilyMemberFile}
            disabled={isLoading}
          />
        </div>
      </section>

      {/* Prove of Income */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Prove of Income</h2>
        <p className="text-gray-500 text-sm mb-2">
          (add your pay slip document)
        </p>
        <FileUpload
          label="Input pay slip"
          onChange={setIncomeFile}
          disabled={isLoading}
        />
      </section>

      {/* Additional Document */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Additional Document</h2>
        <p className="text-gray-500 text-sm mb-2">
          (add document to support your profile)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: additionalDocCount }).map((_, idx) => (
            <FileUpload
              key={`add-doc-${idx}`}
              label={`Input PDF/IMG ${idx + 1}`}
              onChange={(file) => handleAdditionalFileChange(idx, file)}
              disabled={isLoading}
            />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-2 flex items-center gap-2"
          onClick={handleAddDoc}
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Add more document
        </Button>
      </section>

      {/* Category Selection */}
      <section>
        <h2 className="font-semibold text-lg mb-2">
          Are you one of these category?
        </h2>
        <CategorySelector
          categories={categories}
          selected={selectedCategories}
          onSelect={handleCategorySelect}
        />
      </section>

      {/* Error Message */}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

      {/* Actions - Changed to single Save/Submit button */}
      <div className="flex items-center justify-end gap-4 mt-6">
        <Button
          className="bg-blue-600 text-white"
          onClick={handleSaveProfile}
          disabled={isLoading}
        >
          {isLoading ? "Saving Profile..." : "Save Profile & Complete"}
        </Button>
      </div>
    </div>
  );
}
