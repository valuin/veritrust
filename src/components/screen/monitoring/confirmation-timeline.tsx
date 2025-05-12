"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, User, Box } from "lucide-react";
import { TimelineEntry } from "@/lib/type";
import { TimelineItem } from "./timeline-item";

type ConfirmationTimelineProps = {
  timelineEntries: TimelineEntry[];
  numberOfSteps?: number;
  onConfirm?: (report: string) => void;
};

export function ConfirmationTimeline({
  timelineEntries,
  numberOfSteps = 5,
  onConfirm,
}: ConfirmationTimelineProps) {
  const [reportText, setReportText] = useState("");

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(reportText);
    }
  };

  const stepIndices = Array.from({ length: numberOfSteps }, (_, i) => i);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirmation</h2>
      <div className="flex items-center justify-between mb-8 px-4 relative">
        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-300 -translate-y-1/2"></div>
        {stepIndices.map((index) => {
          let IconComponent;
          if (index === 0) {
            IconComponent = FileText;
          } else if (index === numberOfSteps - 1) {
            IconComponent = User;
          } else {
            IconComponent = Box;
          }

          return (
            <div
              key={index}
              className="z-10 bg-white p-2 rounded-full border-2 border-gray-300 flex items-center justify-center"
            >
              <IconComponent className="w-5 h-5 text-gray-500" />
            </div>
          );
        })}
      </div>
      <div className="flex-grow overflow-y-auto pr-4 custom-scrollbar">
        {timelineEntries.map((entry, index) => (
          <TimelineItem
            key={entry.id}
            entry={entry}
            isFirst={index === 0}
            isLast={index === timelineEntries.length - 1}
          />
        ))}
      </div>
      <div className="mt-6 relative">
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          rows={3}
          placeholder="Type the specific report here..."
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
        ></textarea>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-500 rounded-full pointer-events-none"></div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleConfirm}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
