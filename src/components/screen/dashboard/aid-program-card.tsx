"use client";
import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BookmarkOutline, Bookmark } from "@/components/icons/bookmark";
import { cn } from "@/lib/utils";
import { useSavedAidsStore } from "@/store/savedAids";
import AidProgramDetailDialog from "./aid-program-detail-dialog";
import { AnalyzingModalContent } from "./analyzing-modal-content";
import { type SelectedAidForDisplay } from "./analyzing-modal-content";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useUserStore } from "@/store/useUser";

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
  onTriggerAnalyze?: () => void;
}

const AidProgramCard: React.FC<AidProgramCardProps> = ({
  program,
  onTriggerAnalyze,
}) => {
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

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Apply clicked, triggering analyze modal...");
    onTriggerAnalyze?.();
  };

  return (
    <div className="bg-white rounded-2xl p-3 flex flex-col justify-between h-80 relative border border-primary">
      <div className="bg-blue-100 rounded-xl p-6 justify-between space-y-12">
        <div className="flex justify-between mb-8">
          <div className="bg-[#f9f9f9] rounded-full px-3 py-1 text-xs">
            {new Date(program.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="flex space-x-2 items-center">
            <button
              className={cn(
                "text-gray-500 cursor-pointer hover:text-primary group"
              )}
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

      <div className="flex justify-between items-center p-2 mt-4">
        <div className="flex items-center">
          <h1 className="text-black">Details</h1>
          <ArrowUpRight className="w-5 h-5 ml-2" />
        </div>
        <div>
          {program.nominal !== null && (
            <span className="font-semibold text-[#0039c7] text-lg mr-4">
              ${program.nominal.toLocaleString()}
            </span>
          )}
          <button
            className="bg-[#0039c7] text-white px-4 py-2 rounded-lg hover:bg-[#002080] transition"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

const CardWithDialog: React.FC<AidProgramCardProps> = (props) => {
  const [isAnalyzingModalOpen, setIsAnalyzingModalOpen] = useState(false);
  const { user, isLoading: isUserLoading, error: userError } = useUserStore();
  console.log("user data", user);
  const userId = user?.id;

  const handleOpenAnalyzeModal = () => {
    if (isUserLoading) {
      console.log("User data is loading. Please wait...");
      return;
    }
    if (!userId) {
      console.error(
        "User ID not available. Cannot open analysis modal. Please log in."
      );
      return;
    }
    setIsAnalyzingModalOpen(true);
  };

  const handleCloseAnalyzeModal = () => {
    setIsAnalyzingModalOpen(false);
  };

  const selectedAidForDisplay: SelectedAidForDisplay = {
    logoSrc: "/",
    organization: props.program.description || "Aid Provider",
    title: props.program.name || "Unnamed Program",
    amount: props.program.nominal || 0,
    amountUnit: "USD",
    tags: props.program.required_tags || [],
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div
            tabIndex={0}
            className="outline-none focus:ring-2 focus:ring-primary rounded-2xl"
            style={{ cursor: "pointer" }}
          >
            <AidProgramCard
              {...props}
              onTriggerAnalyze={handleOpenAnalyzeModal}
            />
          </div>
        </DialogTrigger>
        <AidProgramDetailDialog program={props.program} />
      </Dialog>

      <Dialog
        open={isAnalyzingModalOpen}
        onOpenChange={setIsAnalyzingModalOpen}
      >
        <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden rounded-xl bg-white">
          {isUserLoading ? (
            <div className="p-6 text-center">Loading user data...</div>
          ) : userError ? (
            <div className="p-6 text-center text-red-500">
              Error loading user: {userError}
            </div>
          ) : userId ? (
            <AnalyzingModalContent
              selectedAid={selectedAidForDisplay}
              programId={props.program.program_id}
              onClose={handleCloseAnalyzeModal}
              startAnalysisOnMount={true}
            />
          ) : (
            <div className="p-6 text-center text-red-500">
              User information is missing. Cannot proceed. Please log in.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardWithDialog;
