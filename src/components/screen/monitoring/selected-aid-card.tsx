import React from "react";
import Image from "next/image";
import { AidDetails } from "@/lib/type";

type SelectedAidCardProps = {
  aid: AidDetails;
};

export function SelectedAidCard({ aid }: SelectedAidCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col relative">
      <div className="bg-blue-100 p-6 rounded-xl shadow-md flex flex-col relative">
        {aid.approvalRate !== undefined && (
          <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {aid.approvalRate}% Approval Rate
          </span>
        )}

        {aid.flagSrc && (
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
            <Image
              src={aid.flagSrc}
              alt="Flag"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        )}

        <div
          className={`mt-10 ${aid.approvalRate === undefined ? "mt-4" : ""}`}
        >
          <div className="flex items-center mb-2">
            <span className="font-bold text-gray-800 text-sm mr-2">
              {aid.organization}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl text-gray-900 mb-2">{aid.title}</h3>
            {aid.logoSrc && (
              <div className="rounded-full w-12 h-12">
                <Image
                  src={aid.logoSrc}
                  alt={`${aid.organization} Logo`}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            )}
          </div>
          {aid.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-gray-400 rounded-full px-3 py-1 mr-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
