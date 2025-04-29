"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AidProgramDetailDialogProps {
  program: {
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
  };
}

export default function AidProgramDetailDialog({ program }: AidProgramDetailDialogProps) {
  return (
    <DialogContent className="w-[110vh] max-h-[90vh] overflow-y-auto p-0">
      <Image
        src="/dialog-banner.png"
        alt="Dialog Banner"
        width={500} // Adjust width as needed
        height={200} // Adjust height as needed
        className="w-full object-cover rounded-t-lg"
      />
      <div className="p-6 space-y-4">
        <DialogHeader>
          <DialogTitle>{program.name}</DialogTitle>
        </DialogHeader>
        <div>
          <div className="text-xs text-gray-500 mb-1">
            Created: {new Date(program.created_at).toLocaleDateString()}
          </div>
          <div className="text-base font-semibold">{program.description}</div>
          {program.nominal !== null && (
            <div className="text-primary font-bold mt-2">
              Amount: ${program.nominal.toLocaleString()}
            </div>
          )}
          {program.required_tags && program.required_tags.length > 0 && (
            <div className="inline-block border border-[#383838] rounded-full px-4 py-1 text-sm mt-2">
              {program.required_tags[0]}
            </div>
          )}
        </div>
        {program.about && (
          <section>
            <h3 className="font-semibold mb-1">About Program</h3>
            <p className="text-sm">{program.about}</p>
          </section>
        )}
        {program.details && (
          <section>
            <h3 className="font-semibold mb-1">Program Details</h3>
            <p className="text-sm">{program.details}</p>
          </section>
        )}
        {program.eligibility && (
          <section>
            <h3 className="font-semibold mb-1">Eligibility Criteria</h3>
            <p className="text-sm">{program.eligibility}</p>
          </section>
        )}
        {program.how_to_apply && (
          <section>
            <h3 className="font-semibold mb-1">How to Apply</h3>
            <p className="text-sm">{program.how_to_apply}</p>
          </section>
        )}
        <Button className="w-full mt-4">Apply</Button>
      </div>
    </DialogContent>
  );
}