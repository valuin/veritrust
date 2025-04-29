"use client";
import { useEffect, useState } from "react";
import { useSavedAidsStore } from "@/store/savedAids";
import AidProgramCard from "@/components/screen/dashboard/aid-program-card";
import { createClient } from "@/lib/client";

interface AidProgram {
  program_id: string;
  name: string;
  description: string;
  created_at: string;
  required_tags: string[] | null;
  nominal: number | null;
}

export default function SavedAid() {
  const savedIds = useSavedAidsStore((s) => s.savedIds);
  const [aidPrograms, setAidPrograms] = useState<AidProgram[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = await createClient();
        const { data, error: dataError } = await supabase
          .from("aid_programs")
          .select(
            "program_id, name, description, created_at, required_tags, nominal"
          );

        if (dataError) throw dataError;
        if (data) {
          setAidPrograms(data as AidProgram[]);
        }
      } catch (err: any) {
        console.error("Error fetching aid programs:", err);
        setFetchError("Failed to load aid programs. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const savedPrograms = aidPrograms.filter((p) =>
    savedIds.includes(p.program_id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Saved Aid Programs</h1>
      {fetchError && <div className="text-red-500 mb-4">{fetchError}</div>}
      {savedPrograms.length === 0 ? (
        <div className="text-gray-500">No saved aid programs.</div>
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
