import React from "react";
import { UploadCloud } from "lucide-react";

// Define the expected props, including the onChange handler
interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void; // Function to call when file changes
  disabled?: boolean; // Optional disabled state
}

// Modify the component to accept and use the onChange prop
export function FileUpload({ label, onChange, disabled }: FileUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onChange(file); // Call the parent's onChange handler
  };

  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px] w-full cursor-pointer hover:border-blue-400 transition">
      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
      <span className="text-gray-500 text-sm">{label}</span>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={disabled} // Pass disabled state to the input
        className={`block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed`}
        // Add accept attribute if you want to restrict file types
        // accept=".pdf,image/*"
      />
    </div>
  );
}
