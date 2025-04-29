"use client";

import VerticalStepper from "@/components/ui/vertical-stepper";
import { useState } from "react";
import { EmailVerificationForm } from "@/components/screen/onboarding/email-verification-form";
import { Button } from "@/components/ui/button";
import PersonalInfoFormContainer from "@/components/screen/onboarding/personal-info-form";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const onboardingSteps = [
  "Set up your account",
  "Verify your account",
  "Add your personal information details",
  "Welcome to VeriTrust!",
];

function SetupSidebar({
  steps,
  activeStep,
  backToLoginUrl,
  onStepClick,
}: {
  steps: string[];
  activeStep: number;
  backToLoginUrl: string;
  onStepClick?: (idx: number) => void;
}) {
  return (
    <aside className="bg-blue-800 flex flex-col ml-12 rounded-2xl items-center px-6 py-8 w-full md:w-80 min-h-[100vh]">
      <div className="mb-8">
        <img src="/group-1-1.png" alt="Logo" className="w-16 h-16" />
      </div>
      <VerticalStepper
        steps={steps}
        activeStep={activeStep}
        onStepClick={onStepClick}
      />
      <div className="mt-auto mb-2 flex items-center gap-2">
        <ChevronLeft className="w-4 h-4 text-white" />
        <a href={backToLoginUrl} className="text-white underline text-sm">
          Back to login
        </a>
      </div>
    </aside>
  );
}

export default function AddPersonalInfoPage() {
  const [activeStep, setActiveStep] = useState(1);
  const router = useRouter();
  console.log("tes", activeStep);

  const handleNext = () => {
    if (activeStep === onboardingSteps.length - 1) {
      router.push("/dashboard");
    } else {
      setActiveStep((prev) => Math.min(prev + 1, onboardingSteps.length - 1));
    }
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:block">
        <SetupSidebar
          steps={onboardingSteps}
          activeStep={activeStep}
          backToLoginUrl="/landing/login"
          onStepClick={setActiveStep}
        />
      </div>
      <main className="flex-1 flex items-center justify-center bg-white px-2 py-4 md:px-8 md:py-0">
        <div className="w-full max-w-2xl">
          {activeStep === 1 ? (
            <EmailVerificationForm onVerificationSuccess={handleNext} />
          ) : activeStep === 2 ? (
            <PersonalInfoFormContainer />
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                {onboardingSteps[activeStep]}
              </h2>
              <div className="flex gap-2 justify-center">
                <Button onClick={handlePrev} variant="outline">
                  Previous
                </Button>
                <Button onClick={handleNext} className="bg-blue-600 text-white">
                  Go to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
