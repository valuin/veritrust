import React from "react";
import { ArrowUpRight } from "lucide-react";

interface AidProgram {
  program_id: string;
  name: string;
  description: string;
  created_at: string;
  required_tags: string[] | null;
  nominal: number | null;
}

interface AidProgramCardProps {
  program: AidProgram;
}

const AidProgramCard: React.FC<AidProgramCardProps> = ({ program }) => (
  <div className="bg-whiterounded-xl rounded-2xl p-3 flex flex-col justify-between h-80 relative border border-primary">
    <div className="bg-blue-100 rounded-xl p-6 justify-between space-y-12">
      {/* Top section: Date, Flag, Save Icon */}
      <div className="flex justify-between mb-8">
        <div className="bg-[#f9f9f9] rounded-full px-3 py-1 text-xs">
          {new Date(program.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="flex space-x-2 items-center">
          {/* Placeholder for country flag */}
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
      <div className="">
        <p className="text-sm text-gray-500 mb-1">{program.description}</p>
        <h3
          className="text-xl text-black font-bold mb-3 line-clamp-2"
          title={program.name || "Unnamed Program"}
        >
          {program.name || "Unnamed Program"}
        </h3>
        {program.required_tags && program.required_tags.length > 0 && (
          <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm">
            {program.required_tags[0]}
          </div>
        )}
      </div>
    </div>

    {/* Bottom section: Logo, Details, Apply */}
    <div className="flex justify-between items-center p-2 mt-4">
      <div className="flex items-center">
        <h1 className="text-black">
            Details
        </h1>
        <ArrowUpRight className="w-5 h-5 ml-2" />
      </div>
      <div>
        {/* Nominal value */}
        {program.nominal !== null && (
          <span className="font-semibold text-[#0039c7] text-lg mr-4">
            ${program.nominal.toLocaleString()}
          </span>
        )}
        <button className="bg-[#0039c7] text-white px-4 py-2 rounded-lg hover:bg-[#002080] transition">
          Apply
        </button>
      </div>
    </div>
  </div>
);

export default AidProgramCard;
