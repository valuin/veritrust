"use client";
import AidProgramCard from "@/components/screen/dashboard/aid-program-card";
import { useUserStore } from "@/store/useUser";
import { useSavedAidsStore } from "@/store/savedAids";
import { useEffect, useState } from "react";

interface AidProgram {
  program_id: string;
  name: string;
  description: string;
  created_at: string;
  required_tags: string[] | null;
  nominal: number | null;
  img?: string;
  about?: string;
  details?: string;
  eligibility?: string;
  how_to_apply?: string;
}

export default function SavedAidPage() {
  const { savedIds } = useSavedAidsStore();

  const [savedPrograms, setSavedPrograms] = useState<AidProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedProgramsDetails = async () => {
      if (savedIds.length === 0) {
        setSavedPrograms([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch("/api/aid-programs");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch aid programs details"
          );
        }
        const allPrograms: AidProgram[] = await response.json();

        const filteredPrograms = allPrograms.filter((program) =>
          savedIds.includes(program.program_id)
        );
        setSavedPrograms(filteredPrograms);
      } catch (err: any) {
        console.error("Error fetching saved aid programs details:", err);
        setFetchError(
          err.message ||
            "Failed to load saved aid programs. Please try again later."
        );
      }
      setIsLoading(false);
    };

    fetchSavedProgramsDetails();
  }, [savedIds]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading saved aid programs...
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500">
        {fetchError}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Saved Aid Programs</h1>
      {savedPrograms.length === 0 && !isLoading ? (
        <div className="text-gray-500">
          You have not saved any aid programs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPrograms.map((program) => (
            <AidProgramCard key={program.program_id} program={program} />
          ))}
        </div>
      )}
    </div>
  );
}
