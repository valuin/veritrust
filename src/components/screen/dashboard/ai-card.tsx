// components/AiCard.tsx (Updated)
import AiLogoVeritrust from "@/components/icons/ai-logo-veritrust.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AidSelectionModalContent } from "./aid-selection-modal-content"; // Import selection modal
import { AnalyzingModalContent } from "./analyzing-modal-content"; // Import analyzing modal
import { createClient } from "@/lib/client"; // <-- Import Supabase client

// Define types (re-use or define in a shared file)
type AidOption = {
  id: string;
  logoSrc: string;
  organization: string;
  recommendation?: string;
  title: string;
  amount: number;
  amountUnit: string;
  tags: string[];
};

// Tipe data dari Supabase (untuk fetch di AiCard)
interface AidProgram {
  program_id: string;
  name: string;
  description?: string;
  required_tags: string[] | null;
  nominal: number | null;
}

type AiCardProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function AiCard({
  title = "AI Assistant",
  description = "Interact with your AI assistant here.",
  action,
  footer,
  children,
  className,
}: AiCardProps) {
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const [isAnalyzingModalOpen, setIsAnalyzingModalOpen] = useState(false);
  const [selectedAidForAnalysis, setSelectedAidForAnalysis] =
    useState<AidOption | null>(null);
  const [fetchedAidOptions, setFetchedAidOptions] = useState<AidOption[]>([]);
  const [isFetchingAids, setIsFetchingAids] = useState(true);
  const [fetchAidsError, setFetchAidsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAidPrograms = async () => {
      setIsFetchingAids(true);
      setFetchAidsError(null);
      try {
        const supabase = await createClient();
        const { data, error } = await supabase
          .from("aid_programs")
          .select("program_id, name, description, required_tags, nominal");

        if (error) throw error;

        if (data) {
          const mappedOptions: AidOption[] = data.map(
            (program: AidProgram) => ({
              id: program.program_id,
              logoSrc: "/icons/default-aid-logo.png",
              organization: "Unknown Org",
              recommendation: undefined,
              title: program.name,
              amount: program.nominal ?? 0,
              amountUnit: "in CHEQ",
              tags: program.required_tags ?? [],
            })
          );
          setFetchedAidOptions(mappedOptions);
        }
      } catch (err: any) {
        console.error("Error fetching aid programs in AiCard:", err);
        setFetchAidsError("Failed to load aid options.");
      } finally {
        setIsFetchingAids(false);
      }
    };

    fetchAidPrograms();
  }, []);

  const handleApplySelected = (selectedAidIds: string[]) => {
    console.log("Applying selected aids:", selectedAidIds);
    const selected = fetchedAidOptions.filter((aid) =>
      selectedAidIds.includes(aid.id)
    );

    if (selected.length > 0) {
      setSelectedAidForAnalysis(selected[0]);

      setIsSelectionModalOpen(false);

      setIsAnalyzingModalOpen(true);

    } else {
      console.warn("No aid selected, cannot start analysis.");
      setIsSelectionModalOpen(false); 
    }
  };

  const handleApplyAll = (allAidIds: string[]) => {
    console.log("Applying all aids:", allAidIds);
    const all = fetchedAidOptions.filter((aid) => allAidIds.includes(aid.id));

    if (all.length > 0) {
      const aidToDisplay =
        all.find((aid) => aid.recommendation === "Most Recommend") || all[0];
      setSelectedAidForAnalysis(aidToDisplay);

      setIsSelectionModalOpen(false);

      setIsAnalyzingModalOpen(true);

    } else {
      console.warn("No aids available to apply to.");
      setIsSelectionModalOpen(false);
    }
  };

  return (
    <>
      {/* Use Fragment if AiCard itself shouldn't be the DialogTrigger */}
      <Card className={className}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
          {action && <CardAction>{action}</CardAction>}
        </CardHeader>
        <CardContent>
          {/* ... existing AiCard content (image, rings, text) ... */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={AiLogoVeritrust}
              alt="AI Logo"
              width={64}
              height={64}
              draggable={false}
              className="object-contain opacity-75 w-64 h-64 absolute overflow-visible"
            />
            <div className=" opacity-30 pointer-events-none select-none">
              <div className="w-64 h-64 rounded-full border-8 border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-8 border-white/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-white/40 flex items-center justify-center">
                    <div className="w-16 h-16 overflow-visible rounded-full bg-white/50 relative"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto relative z-10">
            <p className="text-white text-lg mb-4">
              Didn't know where to apply?
            </p>
            {/* Tombol Call AI yang memicu modal pemilihan bantuan */}
            <Button // Menggunakan komponen Button dari library Anda
              onClick={() => {
                console.log("Membuka modal pemilihan Aid...");
                setIsSelectionModalOpen(true); // Open the selection modal
              }}
              className="bg-white text-[#0039c7] font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition"
            >
              Call AI
            </Button>
          </div>
          {children}
        </CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
      {/* Dialog untuk Modal Pemilihan Bantuan */}
      <Dialog
        open={isSelectionModalOpen}
        onOpenChange={setIsSelectionModalOpen}
      >
        <DialogContent className="sm:max-w-[600px] p-6 overflow-hidden rounded-xl">
          <AidSelectionModalContent
            aidOptions={fetchedAidOptions} // <-- Teruskan data yang di-fetch
            isLoading={isFetchingAids} // <-- Teruskan status loading
            error={fetchAidsError} // <-- Teruskan status error
            onClose={() => setIsSelectionModalOpen(false)} // Close selection modal
            onApplySelected={handleApplySelected} // Handles logic and opens analyzing modal
            onApplyAll={handleApplyAll} // Handles logic and opens analyzing modal
          />
        </DialogContent>
      </Dialog>
      {/* Dialog untuk Modal Analisis */}
      <Dialog
        open={isAnalyzingModalOpen}
        onOpenChange={setIsAnalyzingModalOpen}
      >
        {/* Pass the selected aid data if available */}
        {selectedAidForAnalysis && (
          <AnalyzingModalContent
            selectedAid={selectedAidForAnalysis}
            programId={selectedAidForAnalysis.id}
            onClose={() => setIsAnalyzingModalOpen(false)}
            startAnalysisOnMount={true}
            // TODO: Pass actual workflow progress data here when it's implemented
            // workflowStepsData={actualProgressData}
          />
        )}
      </Dialog>
    </>
  );
}

export default AiCard;
