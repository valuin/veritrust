import { Button } from "@/components/ui/button"; 
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserStore } from "@/store/useUser"; 
import Image from "next/image";
import { useState, useEffect } from "react"; 
import { WorkflowStep } from "./workflow-step";

export type SelectedAidForDisplay = {
  logoSrc: string;
  organization: string;
  recommendation?: string;
  title: string;
  amount: number;
  amountUnit: string;
  tags: string[];
};

type WorkflowStepData = {
  id: string;
  title: string;
  description: string;
  progress: number; 
  isComplete: boolean;
};

const dummyWorkflowSteps: WorkflowStepData[] = [
  {
    id: "doc-analysis",
    title: "Analyzing user document",
    description: "Extract and analyze the data",
    progress: 0, 
    isComplete: false,
  },
  {
    id: "program-req",
    title: "Analyzing Program Requirement",
    description: "Evaluates profile with eligibility criteria",
    progress: 0,
    isComplete: false,
  },
  {
    id: "calc-rate",
    title: "Calculate approval rate",
    description: "Likelihood of approval for the program",
    progress: 0,
    isComplete: false,
  },
  {
    id: "send-data",
    title: "Send user data to selected program",
    description: "Send your data to the aid provider",
    progress: 0,
    isComplete: false,
  },
];

type AnalyzingModalContentProps = {
  selectedAid: SelectedAidForDisplay;
  programId: string;
  onClose?: () => void;
  startAnalysisOnMount?: boolean;
};

export function AnalyzingModalContent({
  selectedAid,
  programId,
  onClose,
  startAnalysisOnMount = false,
}: AnalyzingModalContentProps) {
  const { user, isLoading: isUserLoading, error: userError } = useUserStore();
  const userId = user?.id;
  const userProfile = user?.profile;

  const [workflowSteps, setWorkflowSteps] = useState(dummyWorkflowSteps);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [applicationResponse, setApplicationResponse] = useState<any | null>(
    null
  );
  
  const updateWorkflowStep = (
    id: string,
    progress: number,
    isComplete: boolean
  ) => {
    setWorkflowSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, progress, isComplete } : step
      )
    );
  };

  const handleSubmit = async () => {
    if (!userId || !userProfile) {
      setError("User data not available. Cannot submit application.");
      return;
    }
    if (isUserLoading) {
      setError("User data is still loading. Please wait.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setApplicationResponse(null);
    setWorkflowSteps(dummyWorkflowSteps);

    const profileDataForAPI = {
      name: userProfile.full_name,
      email: userProfile.email,
      phone_number: userProfile.phone_number,
      country: userProfile.country,
      job: userProfile.job,
      family_number: userProfile.family_number,
      backgroundStory: userProfile.background_story,
      category: userProfile.category ? userProfile.category[0] : undefined, 
    };

    try {
      updateWorkflowStep("doc-analysis", 50, false);
      const formDataAnalyze = new FormData();
      formDataAnalyze.append("userData", JSON.stringify(profileDataForAPI));
      console.warn(
        "handleSubmit: API call to /eligibility/analyze is missing File data as per current API requirements."
      );

      const analyzeResponse = await fetch("/api/eligibility/analyze", {
        method: "POST",
        body: formDataAnalyze,
      });

      if (!analyzeResponse.ok) {
        const errorData = await analyzeResponse.json();
        throw new Error(errorData.error || "Eligibility analysis failed");
      }
      const analyzeResult = await analyzeResponse.json();
      updateWorkflowStep("doc-analysis", 100, true);
      updateWorkflowStep("program-req", 50, false);
      updateWorkflowStep("calc-rate", 50, false);
      const eligibilityData = analyzeResult.eligibilityResult;
      updateWorkflowStep("program-req", 100, true);
      updateWorkflowStep("calc-rate", 100, true);
      const isEligible =
        eligibilityData.status === "Likely Eligible" ||
        eligibilityData.status === "Possibly Eligible";

      if (!isEligible) {
        setError(
          `Not eligible: ${eligibilityData.summary || eligibilityData.status}`
        );
        setIsLoading(false);
        return;
      }

      updateWorkflowStep("send-data", 50, false);
      const formDataApply = new FormData();
      formDataApply.append("userId", userId); 
      formDataApply.append("aidProgramId", programId);
      formDataApply.append("profileData", JSON.stringify(profileDataForAPI)); 
      if (profileDataForAPI.category)
        formDataApply.append("category", profileDataForAPI.category);
      console.warn(
        "handleSubmit: API call to /api/aid/apply is missing File data as per current API requirements."
      );

      const applyResponse = await fetch("/api/aid/apply", {
        method: "POST",
        body: formDataApply,
      });
      if (!applyResponse.ok) {
        const errorData = await applyResponse.json();
        throw new Error(errorData.error || "Application submission failed");
      }
      const applyResult = await applyResponse.json();
      updateWorkflowStep("send-data", 100, true);
      setApplicationResponse(applyResult);
      setSuccessMessage(
        `Application submitted successfully! Application ID: ${applyResult.applicationId}. Status: ${applyResult.status}`
      );
    } catch (err: any) {
      console.error("Application Process Error:", err);
      setError(err.message || "An unexpected error occurred.");
      setWorkflowSteps((prev) =>
        prev.map((step) => ({ ...step, progress: step.isComplete ? 100 : 0 }))
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startAnalysisOnMount && !isLoading && !error && !successMessage) {
      if (userId && userProfile && !isUserLoading) {
        console.log(
          "AnalyzingModalContent: Auto-starting analysis via useEffect..."
        );
        handleSubmit();
      } else {
        console.warn(
          "AnalyzingModalContent: Conditions not met for auto-start (user data might be loading or missing)."
        );
      }
    }
  }, [
    startAnalysisOnMount,
    isLoading,
    error,
    successMessage,
    userId,
    userProfile,
    isUserLoading,
    programId,
  ]); 

  if (isUserLoading) {
    return (
      <DialogContent className="p-6 text-center">
        Loading user data...
      </DialogContent>
    );
  }

  if (userError || !userId) {
    return (
      <DialogContent className="sm:max-w-[400px] p-6">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            {userError ||
              "Could not load user information. Please try logging in again."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden rounded-xl bg-white px-6">
      <DialogTitle className="mt-6 ml-6">Selected Aid Application</DialogTitle>

      <div className="flex flex-row max-h-[60vh]">
        <div className="w-1/2 flex flex-col p-6">
          <div className="flex items-center mb-6 border border-gray-200 rounded-lg p-3 shadow-sm">
            <div className="w-12 h-12 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
              <Image
                src={selectedAid.logoSrc}
                alt={`${selectedAid.organization} Logo`}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-semibold text-xs block">
                {selectedAid.organization}
              </span>
              <h3 className="text-lg font-bold">{selectedAid.title}</h3>
            </div>
          </div>
          <div className="bg-[#0039C7] flex flex-col rounded-lg p-6 mb-6 flex-grow">
            <h2 className="text-lg font-semibold mb-3 text-white">
              AI Workflow Status
            </h2>
            <div className="flex-grow space-y-2">
              {workflowSteps.map((step, index) => (
                <WorkflowStep
                  key={step.id}
                  {...step}
                  isComplete={step.isComplete}
                  isCurrent={
                    !step.isComplete &&
                    (index === 0 || workflowSteps[index - 1].isComplete)
                  }
                  isLast={index === workflowSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-gray-50  shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center flex-grow mb-6 px-4">
            {successMessage && applicationResponse ? (
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center">
                  <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 shadow-md">
                    <p className="text-5xl font-bold text-blue-600">
                      {applicationResponse.eligibilityScore !== null
                        ? `${applicationResponse.eligibilityScore}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Approval Probability
                </p>
                <button
                  className="text-sm text-blue-600 hover:underline focus:outline-none"
                  onClick={() =>
                    alert(
                      'Tindakan untuk "Check more details" belum diimplementasikan.'
                    )
                  }
                >
                  Check more details
                </button>
              </div>
            ) : !error && !successMessage ? (
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute border border-blue-300 rounded-full w-48 h-48 opacity-50 animate-pulse"></div>
                <div className="absolute border border-blue-300 rounded-full w-32 h-32 opacity-50 animate-pulse delay-150"></div>
                <div className="absolute border border-blue-300 rounded-full w-16 h-16 opacity-50 animate-pulse delay-300"></div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 rounded-full opacity-80"></div>
                <div className="absolute w-6 h-6 bg-blue-600 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-blue-600 rounded-full opacity-80"></div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <DialogFooter className="p-6 flex justify-between">
        {!isLoading && !successMessage && !error && !startAnalysisOnMount && (
          <Button
            onClick={handleSubmit}
            disabled={isUserLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start AI Application
          </Button>
        )}
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading && !successMessage && !error}
        >
          {successMessage || error ? "Close" : "Cancel"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
