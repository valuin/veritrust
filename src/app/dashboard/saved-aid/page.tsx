"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUser";
import AidProgramCard from "@/components/screen/dashboard/aid-program-card";
import { useRouter } from "next/navigation";

interface AidProgram {
  program_id: string;
  name: string;
  description: string;
  created_at: string;
  required_tags: string[] | null;
  nominal: number | null;
  about?: string;
  details?: string;
  eligibility?: string;
  how_to_apply?: string;
}

export default function AppliedAidPage() {
  const { user } = useUserStore();
  const userId = user?.id;
  const router = useRouter();

  const [appliedPrograms, setAppliedPrograms] = useState<AidProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const response = await fetch(`/api/saved-aid?userId=${userId}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error || "Failed to fetch applied aid programs"
          );
        }
        const data = await response.json();
        setAppliedPrograms(data as AidProgram[]);
      } catch (err: any) {
        console.error("Error fetching applied aid programs:", err);
        setFetchError(
          err.message ||
            "Failed to load applied aid programs. Please try again later."
        );
      }
      setIsLoading(false);
    };

    fetchData();
  }, [userId]);

  const handleCardClick = (programId: string) => {
    router.push("/dashboard/monitoring");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        Loading applied aid programs...
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

  if (!userId && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-gray-500">
        Please log in to view your applied aid programs.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Applied Aid Programs</h1>
      {appliedPrograms.length === 0 && !isLoading ? (
        <div className="text-gray-500">
          You have not applied for any aid programs yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedPrograms.map((program) => (
            <div
              key={program.program_id}
              onClick={() => handleCardClick(program.program_id)}
              className="cursor-pointer"
            >
              <AidProgramCard program={program} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
