"use client";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import PhoneInput from "../../components/ui/phone-input";
import { Textarea } from "../../components/ui/textarea";

import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import * as RPNInput from "react-phone-number-input";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<RPNInput.Value | undefined>(undefined);
  const [familySize, setFamilySize] = useState("1");
  const [aidReason, setAidReason] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const familySizeOptions = [
    { value: "1", label: "" },
    { value: "2", label: "" },
    { value: "3", label: "" },
    { value: ">4", label: "" },
  ];

  const handleSignUpSubmit = async () => {
    const supabase = await createClient();
    setError(null);
    if (!agreedToPolicy) {
      setError("You must agree to the privacy policy.");
      return;
    }
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!firstName || !lastName || !job || !email || !password || !phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Sign up failed");
      }

      await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        },
      });

      const initialData = {
        firstName,
        lastName,
        job,
        phone,
        family_number: familySize,
        email,
        password: password,
      };
      localStorage.setItem("onboardingData", JSON.stringify(initialData));

      router.push(
        `/landing/onboarding?step=verify&email=${encodeURIComponent(email)}`
      );
    } catch (err: any) {
      setError(err.message);
      console.error("Sign up or OTP error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white flex flex-col md:flex-row justify-center w-full min-h-screen">
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col justify-center relative">
        <div className="font-bold text-black text-3xl md:text-4xl leading-tight mb-2">
          Create An Account
        </div>
        <div className="font-normal text-black text-base mb-6">
          Need Help To Get An Aid? Want To Try? <br />
          lets Sign Up, And Fill Your Identity For A Minute
        </div>

        <div>
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2] flex-1"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2] flex-1"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2]"
              placeholder="What Do Yo Do For A Living?"
              value={job}
              onChange={(e) => setJob(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              type="email"
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <Input
              type="password"
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <Input
              type="password"
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2]"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>

          <div className="mt-4">
            <PhoneInput value={phone} onChange={setPhone} required />
          </div>
        </div>

        <div className="mt-8">
          <div className="font-bold text-black text-base mb-3">
            Number Of Family
          </div>
          <div className="flex gap-2">
            {familySizeOptions.map((option, index) => {
              const isSelected = familySize === option.value;
              return (
                <Card
                  key={index}
                  className={`w-16 h-20 flex flex-col items-center justify-center rounded-[10px] border-2 cursor-pointer ${
                    isSelected ? "border-[#0039c7]" : "border-[#d2d2d2]"
                  }`}
                  onClick={() => setFamilySize(option.value)}
                >
                  <div
                    className={`font-bold text-3xl ${
                      isSelected ? "text-[#0039c7]" : "text-[#d2d2d2]"
                    }`}
                  >
                    {option.value}
                  </div>
                  {option.label && (
                    <div
                      className={`text-xs ${
                        isSelected ? "text-[#0039c7]" : "text-[#d2d2d2]"
                      }`}
                    >
                      {option.label}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <div className="font-bold text-black text-base mb-3">
            Tell Us Why You Need An Aid? (Optional)
          </div>
          <div className="relative">
            <Textarea
              className="w-full min-h-[120px] md:h-[156px] rounded-[10px] border-2 border-[#d2d2d2] resize-none p-3"
              placeholder=""
              value={aidReason}
              onChange={(e) => setAidReason(e.target.value)}
              maxLength={500}
            />
            <div className="absolute bottom-3 right-3 text-[#d2d2d2] text-xs">
              {aidReason.length}/500 Word
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2">
          <Checkbox
            id="privacy"
            className="w-4 h-4 rounded-sm border-[#b5b5b5]"
            checked={agreedToPolicy}
            onCheckedChange={(checked) => setAgreedToPolicy(checked as boolean)}
          />
          <label
            htmlFor="privacy"
            className="text-[#b5b5b5] text-xs cursor-pointer"
          >
            You agree to our friendly
            <span className="underline">privacy policy</span>
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <div className="mt-8">
          <Button
            type="button"
            onClick={handleSignUpSubmit}
            disabled={isLoading || !agreedToPolicy}
            className="w-full h-12 bg-[#0039c7] rounded-[10px] text-white text-lg font-bold disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Create Account & Verify Email"}
          </Button>
        </div>
      </div>
      <div className="hidden md:block bg-white w-full max-w-[900px] h-[928px] relative">
        <div className="absolute w-full h-full bg-[url(/signup-veritrust.png)] bg-cover bg-center">
          <div className="absolute w-[80%] bottom-10 left-10 font-bold text-white text-lg md:text-2xl lg:text-[26px] leading-normal">
            Social Aid Distributed Through Traditional Methods Never Reaches Its
            Intended Recipients Due To Middlemen, And Logistical Challenges.
          </div>
          <img
            className="absolute w-20 h-14 top-10 left-10"
            alt="Group"
            src="/group-1-1.png"
          />
        </div>
      </div>
    </div>
  );
}
