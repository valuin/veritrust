import { UploadCloud } from "lucide-react";

export function FileUpload({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px] w-full cursor-pointer hover:border-blue-400 transition">
      <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
      <span className="text-gray-500 text-sm">{label}</span>
    </div>
  );
}
