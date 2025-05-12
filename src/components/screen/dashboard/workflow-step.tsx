import React from "react";
import { cn } from "@/lib/utils"; 

type WorkflowStepProps = {
  title: string;
  description: string;
  progress: number; 
  isComplete: boolean; 
  isCurrent: boolean
  isLast: boolean; 
};

export function WorkflowStep({
  title,
  description,
  progress,
  isComplete,
  isCurrent,
  isLast,
}: WorkflowStepProps) {
  const iconColor = isComplete ? "text-white" : "text-blue-200"; 
  const circleColor = isComplete
    ? "bg-green-500"
    : isCurrent
      ? "bg-blue-500"
      : "bg-blue-700"; 

  return (
    <div className="flex relative pb-8 last:pb-0">
      {!isLast && (
        <div
          className={cn(
            "absolute top-3 left-4 w-px bg-white h-full" 
          )}
        ></div>
      )}
      <div className="z-10 flex items-center">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border border-white",
            circleColor
          )}
        >
          <svg
            className={cn("w-5 h-5", iconColor)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>
      <div className="flex-grow ml-4">
        <h4
          className={cn(
            "font-semibold text-white text-sm",
            isComplete ? "text-white" : "text-blue-200" 
          )}
        >
          {title}
        </h4>
        <p className="text-blue-300 text-xs">{description}</p>
      </div>
      <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-white/50 text-white text-xs flex items-center justify-center ml-2">
        {progress}%
      </div>
    </div>
  );
}
