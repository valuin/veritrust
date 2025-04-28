"use client";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import PhoneInput from "../../components/ui/phone-input";

import { useState } from "react";

export default function SignUp() {
  const [selectedFamily, setSelectedFamily] = useState("1");
  const familySizeOptions = [
    { value: "1", label: "" },
    { value: "2", label: "" },
    { value: "3", label: "" },
    { value: ">4", label: "" },
  ];

  return (
    <div className="bg-white flex flex-col md:flex-row justify-center w-full min-h-screen">
      {/* Form section */}
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col justify-center relative">
        <div className="font-bold text-black text-3xl md:text-4xl leading-tight mb-2">
          Create An Account
        </div>
        <div className="font-normal text-black text-base mb-6">
          Need Help To Get An Aid? Want To Try? <br />
          lets Sign Up, And Fill Your Identity For A Minute
        </div>

        {/* Form fields with separator lines */}
        <div>
          {/* First name and Last name fields */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2] flex-1"
              placeholder="First Name"
            />
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2] flex-1"
              placeholder="Last Name"
            />
          </div>

          {/* Occupation field */}
          <div className="mt-4">
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2]"
              placeholder="What Do Yo Do For A Living?"
            />
          </div>

          {/* Email field */}
          <div className="mt-4">
            <Input
              className="border-0 border-b h-10 rounded-none px-0 text-base font-normal placeholder:text-[#d2d2d2]"
              placeholder="Email"
            />
          </div>

          {/* Phone field with country code */}
          <div className="mt-4">
            <PhoneInput />
          </div>
        </div>

        {/* Family size selection */}
        <div className="mt-8">
          <div className="font-bold text-black text-base mb-3">
            Number Of Family
          </div>
          <div className="flex gap-2">
            {familySizeOptions.map((option, index) => {
              const isSelected = selectedFamily === option.value;
              return (
                <Card
                  key={index}
                  className={`w-16 h-20 flex flex-col items-center justify-center rounded-[10px] border-2 cursor-pointer ${
                    isSelected ? "border-[#0039c7]" : "border-[#d2d2d2]"
                  }`}
                  onClick={() => setSelectedFamily(option.value)}
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

        {/* Aid reason textarea */}
        <div className="mt-8">
          <div className="font-bold text-black text-base mb-3">
            Tell Us Why You Need An Aid?
          </div>
          <div className="relative">
            <Textarea
              className="w-full min-h-[120px] md:h-[156px] rounded-[10px] border-2 border-[#d2d2d2] resize-none p-3"
              placeholder=""
            />
            <div className="absolute bottom-3 right-20 text-[#d2d2d2] text-xs">
              0/500 Word
            </div>
            <div className="absolute bottom-3 right-3 bg-[#0039c7] rounded-[100px] px-3 py-1">
              <span className="text-white text-xs font-bold">Save</span>
            </div>
          </div>
        </div>

        {/* Privacy policy checkbox */}
        <div className="mt-8 flex items-center gap-2">
          <Checkbox
            id="privacy"
            className="w-4 h-4 rounded-sm border-[#b5b5b5]"
          />
          <label htmlFor="privacy" className="text-[#b5b5b5] text-xs">
            You agree to our friendly{" "}
            <span className="underline">privacy policy</span>
          </label>
        </div>

        {/* Submit button */}
        <div className="mt-8">
          <Button
            asChild
            className="w-full h-12 bg-[#0039c7] rounded-[10px] text-white text-lg font-bold"
          >
            <a href="/landing/onboarding">Process To Next Step</a>
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
