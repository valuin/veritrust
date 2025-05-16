"use client";
import { Card, CardContent } from "./card";
import { cn } from "@/lib/utils";
import {
  Stepper as StepperPrimitive,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "./stepper-primitive";

import { useState } from "react";

const steps = [
  {
    title: "Setup Your Account",
    description:
      "Start by providing your basic information such as name, email and password.",
    icon: "/ic-outline-email.svg",
    iconAlt: "Profile Icon",
    label: "Profile Creation",
  },
  {
    title: "Input your details information",
    description:
      "Provide your verified credentials (like ID, income proof, or family size) to perfect your application.",
    icon: "/gg-profile.svg",
    iconAlt: "Profile Icon",
    label: "Verified Credentials",
  },
  {
    title: "Call AI to find suitable social aid",
    description:
      "Matches them to your profile, and submits your application automatically.",
    icon: "/uil-robot.svg",
    iconAlt: "AI Icon",
    label: "AI Matching",
  },
  {
    title: "Check your wallet, and claim your aid",
    description:
      "Your aid is sent straight to your Cheqd Wallet in the form of secure $CHEQ tokens",
    icon: "/mdi-wallet.svg",
    iconAlt: "Wallet Icon",
    label: "Claim Aid",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="how-it-works-section" className="mt-16 px-32">
      <div className="flex items-center mb-8">
        <div className="w-[41px] h-[41px] bg-[#d4e0ff] rounded-[20.5px] flex items-center justify-center">
          <img
            className="w-[22px] h-[22px]"
            alt="Gear Icon"
            src="/noto-v1-gear.svg"
          />
        </div>
        <h2 className="ml-3 font-semibold text-black text-xl leading-[24.0px] font-['Geist',Helvetica]">
          How it Works?
        </h2>
      </div>
      <div className="flex justify-center mt-16">
        <div className="w-full max-w-xl">
          <div className="mx-auto max-w-xl space-y-8 text-center">
            <StepperPrimitive
              value={activeStep}
              onValueChange={setActiveStep}
              orientation="horizontal"
            >
              {[1, 2, 3, 4].map((step, idx) => (
                <StepperItem key={step} step={step} className="not-last:flex-1">
                  <StepperTrigger>
                    <StepperIndicator
                      className={cn(
                        "w-14 h-14 text-black  border-blue-700 data-[state=completed]:text-white data-[state=completed]:bg-blue-700",
                        "data-[state=active]:bg-blue-800 border-2"
                      )}
                    />
                  </StepperTrigger>
                  {idx < 3 && <StepperSeparator />}
                </StepperItem>
              ))}
            </StepperPrimitive>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-16">
        <div className="max-w-[493px]">
          <div className="w-[107px] h-[37px] bg-[#0039c7] rounded-[100px] flex items-center justify-center mb-6">
            <span className="font-bold text-white text-base text-center leading-normal font-['Geist',Helvetica]">
              Step {activeStep}
            </span>
          </div>
          <h2 className="font-bold text-black text-4xl tracking-[0.48px] leading-[48px] font-['Geist',Helvetica]">
            {steps[activeStep - 1]?.title || ""}
          </h2>
          <p className="mt-4 font-normal text-black text-xl tracking-[0.32px] leading-[32px] font-['Geist',Helvetica]">
            {steps[activeStep - 1]?.description || ""}
          </p>
        </div>
        <Card className="w-[627px] h-[220px] rounded-[20px] border border-solid border-[#c7c7c7] flex items-center justify-center">
          <CardContent className="p-0 flex flex-col items-center justify-center h-full">
            <img
              src={steps[activeStep - 1]?.icon || ""}
              alt={steps[activeStep - 1]?.iconAlt || ""}
              className="w-16 h-16 mb-4"
            />
            <span className="font-semibold text-[#0039c7] text-2xl">
              {steps[activeStep - 1]?.label || ""}
            </span>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
