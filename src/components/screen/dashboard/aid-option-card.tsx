import React from "react";
import Image from "next/image"; 
import { Button } from "@/components/ui/button"; 
import { cn } from "@/lib/utils"; 

type AidOptionCardProps = {
  id: string; 
  logoSrc: string; 
  organization: string;
  recommendation?: string
  title: string;
  amount: number;
  amountUnit: string; 
  tags: string[]; 
  isSelected: boolean;
  onSelect: (id: string) => void; 
};

export function AidOptionCard({
  id,
  logoSrc,
  organization,
  recommendation,
  title,
  amount,
  amountUnit,
  tags,
  isSelected,
  onSelect,
}: AidOptionCardProps) {
  return (
    <div className="flex items-center p-4 border-b last:border-b-0">
      <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
        <Image
          src={logoSrc}
          alt={`${organization} Logo`}
          width={64}
          height={64}
          className="object-contain"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-gray-800 text-sm mr-2">
            {organization}
          </span>
          {recommendation && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {recommendation}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-600">
          <span className="text-blue-600 font-bold text-xl mr-1">
            ${amount}
          </span>
          <span className="mr-2">{amountUnit}</span>
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs border border-gray-400 rounded-full px-2 py-0.5 mr-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        className={cn(
          "ml-4 px-4 py-2 rounded-full border",
          isSelected
            ? "border-blue-600 text-blue-600"
            : "border-gray-300 text-gray-600 hover:border-gray-400"
        )}
        onClick={() => onSelect(id)}
      >
        {isSelected ? (
          <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 mr-1 stroke-current stroke-2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="8" fill="none" />
          </svg>
        )}
        Select
      </Button>
    </div>
  );
}
