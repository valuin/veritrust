import { Button } from "@/components/ui/button"; 
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"; 
import { useState } from "react";
import { AidOptionCard } from "./aid-option-card";

type AidOption = {
  id: string; 
  logoSrc: string; 
  organization: string; 
  recommendation?: string; 
  title: string; 
  amount: number;  
  amountUnit: string; 
  tags: string[]; 
};

type AidSelectionModalContentProps = {
  aidOptions: AidOption[];
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onApplyAll: (allAidIds: string[]) => void;
  onApplySelected: (selectedAidIds: string[]) => void;
};

export function AidSelectionModalContent({
  aidOptions,
  isLoading,
  error,
  onClose,
  onApplyAll,
  onApplySelected,
}: AidSelectionModalContentProps) {
  const [selectedAidIds, setSelectedAidIds] = useState<string[]>([]);

  const handleSelectAid = (id: string) => {
    setSelectedAidIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((aidId) => aidId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const handleApply = () => {
    onApplySelected(selectedAidIds);
    onClose(); 
  };

  const handleApplyAll = () => {
    const allIds = aidOptions.map((option) => option.id);
    onApplyAll(allIds);
    onClose(); 
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold text-gray-900">
          Do you want our AI to submit the application form as well?
        </DialogTitle>
        <DialogDescription className="text-gray-600 text-sm">
          Select aid that you want to apply and let AI do the rest.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4 max-h-[400px] overflow-y-auto">
       
        {isLoading && (
          <p className="text-center text-gray-500">Loading aid options...</p>
        )}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {!isLoading && !error && aidOptions.length === 0 && (
          <p className="text-center text-gray-500">No aid options available.</p>
        )}
        {!isLoading &&
          !error &&
          aidOptions.map((option) => (
            <AidOptionCard
              key={option.id}
              {...option} 
              isSelected={selectedAidIds.includes(option.id)}
              onSelect={handleSelectAid}
            />
          ))}
      </div>

      <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full sm:w-auto border-gray-300 text-gray-800 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        
          <Button
            variant="ghost" 
            onClick={handleApplyAll}
            className="w-full sm:w-auto text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            Apply All
          </Button>
          <Button
            onClick={handleApply}
            className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
            disabled={selectedAidIds.length === 0} 
          >
            Apply
          </Button>
        </div>
      </DialogFooter>
    </>
  );
}
