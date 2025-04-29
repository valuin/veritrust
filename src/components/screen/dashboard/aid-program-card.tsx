"use client";
import React from "react";
import { ArrowUpRight } from "lucide-react";
import { BookmarkOutline, Bookmark } from "@/components/icons/bookmark";
import { cn } from "@/lib/utils";
import { useSavedAidsStore } from "@/store/savedAids";


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

const AidProgramCard: React.FC<AidProgramCardProps> = ({ program }) => {
  const isSaved = useSavedAidsStore((s) => s.isSaved(program.program_id));
  const add = useSavedAidsStore((s) => s.add);
  const remove = useSavedAidsStore((s) => s.remove);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      remove(program.program_id);
    } else {
      add(program.program_id);
    }
  };

  return (
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
            <button
              className={cn("text-gray-500 cursor-pointer hover:text-primary group")}
              onClick={handleBookmark}
              aria-label={isSaved ? "Remove Bookmark" : "Add Bookmark"}
            >
              {isSaved ? (
                <Bookmark className="w-5 h-5" />
              ) : (
                <BookmarkOutline className="w-5 h-5" />
              )}
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
          <h1 className="text-black">Details</h1>
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
};

export default AidProgramCard;
