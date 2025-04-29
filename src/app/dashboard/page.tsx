"use client";
import { createClient } from "@/lib/client"; // Use the server helper
import { ChevronDown, Search } from "lucide-react";
import { useState, useEffect } from "react";
import AiCard from "@/components/screen/dashboard/ai-card";
import AidProgramCard from "@/components/screen/dashboard/aid-program-card";

interface AidProgram {
  program_id: string; // Assuming UUID or similar string ID
  name: string;
  description: string;
  created_at: string;
  required_tags: string[] | null; // Assuming tags are stored as text[] or similar
  nominal: number | null; // Assuming numerical value for aid amount
}

// Make the page an async component
export default function DashboardPage() {
  const [allScheduleChecked, setAllScheduleChecked] = useState(true);
  const [allCategoryChecked, setAllCategoryChecked] = useState(true);
  const [allCountryChecked, setAllCountryChecked] = useState(true);
  const [aidPrograms, setAidPrograms] = useState<AidProgram[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Ambil data program bantuan saat komponen dimuat pertama kali
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

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#d9d9d9] p-6">
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Filters</h2>
          <h3 className="text-[#b5b5b5] mb-2">Schedule</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2 accent-[#0039c7]"
                checked={allScheduleChecked}
                onChange={(e) => setAllScheduleChecked(e.target.checked)}
              />
              <span>All</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>On Going</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>Done</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>Coming Soon</span>
            </label>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold mb-2">Category</h2>
          <h3 className="text-[#b5b5b5] mb-2">Social Aid for</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2 accent-[#0039c7]"
                checked={allCategoryChecked}
                onChange={(e) => setAllCategoryChecked(e.target.checked)}
              />
              <span>All</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>Refugees</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>Orphans</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>Single Mom</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>Families in Poverty</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>More Category</span>
            </label>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Country</h2>
          <h3 className="text-[#b5b5b5] mb-2">Select your country</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 mr-2 accent-[#0039c7]"
                checked={allCountryChecked}
                onChange={(e) => setAllCountryChecked(e.target.checked)}
              />
              <span>All</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>USA</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>China</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="w-5 h-5 mr-2" />
              <span>More Countries</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-3">All Aid</h1>
            <span className="bg-[#f9f9f9] border border-[#d9d9d9] rounded-full px-4 py-1">
              {aidPrograms.length}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-full border border-[#d9d9d9] w-64"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-[#b5b5b5]" />
            </div>
            <div className="flex items-center">
              <span className="text-[#b5b5b5] mr-2">Sort by:</span>
              <div className="flex items-center">
                <span className="font-medium">Last updated</span>
                <ChevronDown className="w-5 h-5 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Display error if fetching failed */}
        {fetchError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {fetchError}</span>
          </div>
        )}

        {/* Aid Cards Grid - Render dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* AI Assistant Card (Static) */}
          <AiCard
            className="bg-gradient-to-br from-[#0039c7] to-[#0039c7]/80 rounded-xl flex flex-col justify-between h-80 relative overflow-hidden"
            title=""
            description=""
            action={null}
            footer={null}
          ></AiCard>

          {/* Map over fetched aid programs */}
          {aidPrograms.map((program) => (
            <AidProgramCard key={program.program_id} program={program} />
          ))}

          {/* Show message if no programs found and no error */}
          {aidPrograms.length === 0 && !fetchError && (
            <p className="text-gray-500 md:col-span-2 lg:col-span-3 text-center">
              No aid programs found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
