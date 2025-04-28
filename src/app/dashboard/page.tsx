"use client";
import { createClient } from "@/lib/client"; // Use the server helper
import { ChevronDown, Search } from "lucide-react";
import { useState, useEffect } from "react";

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

  // Fungsi untuk memanggil AI
  const handleCallAI = () => {
    alert("AI Assistant feature coming soon!");
  };

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
          <div className="bg-gradient-to-br from-[#0039c7] to-[#0039c7]/80 rounded-xl p-6 flex flex-col justify-between h-72 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="w-64 h-64 rounded-full border-8 border-white/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-8 border-white/30 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-8 border-white/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/50"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-auto relative z-10">
              <p className="text-white text-lg mb-4">
                Didn't know where to apply?
              </p>
              <button
                onClick={handleCallAI}
                className="bg-white text-[#0039c7] font-medium py-2 px-6 rounded-full hover:bg-gray-100 transition"
              >
                Call AI
              </button>
            </div>
          </div>

          {/* Map over fetched aid programs */}
          {aidPrograms.map((program) => (
            <div
              key={program.program_id}
              className="bg-white rounded-xl p-6 flex flex-col justify-between h-72 relative border border-[#d9d9d9]"
            >
              {/* Top section: Date, Flag, Save Icon */}
              <div className="flex justify-between mb-3">
                <div className="bg-[#f9f9f9] rounded-full px-3 py-1 text-xs">
                  {/* Format date nicely */}
                  {new Date(program.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex space-x-2 items-center">
                  {/* Placeholder for country flag - needs data from join or program table */}
                  {/* <Image src="/placeholder.svg?height=24&width=24" alt="Country Flag" width={24} height={24} className="rounded-full" /> */}
                  <button className="text-gray-500 hover:text-gray-800">
                    {/* Save Icon SVG */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 21L12 17L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Middle section: Provider, Title, Tags */}
              <div>
                {/* Placeholder for Provider Name - needs data from join */}
                <p className="text-sm text-gray-500 mb-1">
                  Provider Name Placeholder
                </p>
                <h3
                  className="text-xl font-bold mb-3 line-clamp-2"
                  title={program.name || "Unnamed Program"}
                >
                  {program.name || "Unnamed Program"}
                </h3>
                {/* Display first tag if available */}
                {program.required_tags && program.required_tags.length > 0 && (
                  <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
                    {program.required_tags[0]}
                  </div>
                )}
              </div>

              {/* Bottom section: Logo, Details, Apply */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center">
                  {/* Placeholder for Provider Logo - needs data from join */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-xs">Logo</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Link to program details page (needs routing) */}
                  <a
                    href={`/dashboard/aid/${program.program_id}`}
                    className="text-sm underline hover:text-blue-600"
                  >
                    Click here for details
                  </a>
                  {/* Apply button (could link or trigger action) */}
                  <button className="bg-[#383838] text-white rounded-full px-4 py-2 text-sm hover:bg-black transition">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
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
