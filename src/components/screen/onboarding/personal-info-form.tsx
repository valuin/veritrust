import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "./file-upload";
import { CategorySelector } from "./category-selector";
import { Plus, Info } from "lucide-react";

export default function PersonalInfoFormContainer({
  onSave,
  onNext,
}: {
  onSave: () => void;
  onNext: () => void;
}) {
  const [backgroundEditable, setBackgroundEditable] = useState(false);
  const [additionalDocs, setAdditionalDocs] = useState([1, 2, 3]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    "Orphan",
    "Single Mom",
    "Disability",
    "Elderly",
    "Refugees",
    "Jobless",
    "Veteran",
    "Health Crisis",
  ];

  const handleAddDoc = () => {
    setAdditionalDocs((prev) => [...prev, prev.length + 1]);
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto px-4 py-8 gap-8 overflow-y-auto">
      {/* Header */}
      <div>
        <h1 className="font-bold text-2xl md:text-3xl mb-1">
          Make sure your data are valid!
        </h1>
        <p className="text-gray-600 mb-4">
          The more complete your data, the greater your chances of getting
          social assistance
        </p>
        <hr className="mb-4" />
      </div>

      {/* Profile Header Bar */}
      <div className="flex items-center justify-between bg-blue-50 rounded-lg px-4 py-2 mb-2">
        <span className="font-bold text-blue-700">YOUR PROFILE</span>
        <a
          href="#"
          className="text-blue-600 underline flex items-center gap-1 text-sm"
        >
          <Info className="w-4 h-4" />
          Click here for submission guidance
        </a>
      </div>

      {/* General Information */}
      <section>
        <h2 className="font-semibold text-lg mb-2">General Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Name" />
          <Input placeholder="Jobs" />
          <Input placeholder="Email" type="email" />
          <Input placeholder="Phone" type="tel" />
          <Input placeholder="Password" type="password" />
          <div className="flex flex-col gap-1">
            <Input placeholder="Family" />
            <div className="border-2 border-dashed border-gray-300 rounded px-2 py-1 text-xs text-gray-500 mt-1">
              Upload proof of family member
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Country" />
          <Input placeholder="Regional" />
          <Input placeholder="Village" />
          <Input placeholder="Address" />
        </div>
      </section>

      {/* Background Story */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Background Story</h2>
        <div className="flex items-start gap-2">
          <Textarea
            placeholder="Tell us your story..."
            className="flex-1 min-h-[100px]"
            disabled={!backgroundEditable}
          />
          <Button
            type="button"
            variant="outline"
            className="h-10"
            onClick={() => setBackgroundEditable((v) => !v)}
          >
            {backgroundEditable ? "Lock" : "Edit"}
          </Button>
        </div>
      </section>

      {/* Prove of Identity */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Prove of Identity</h2>
        <p className="text-gray-500 text-sm mb-2">
          (add your ID card and Family Member Proof)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FileUpload label="Input ID Card" />
          <FileUpload label="Input Family Member Proof" />
        </div>
      </section>

      {/* Prove of Income */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Prove of Income</h2>
        <p className="text-gray-500 text-sm mb-2">
          (add your pay slip document)
        </p>
        <FileUpload label="Input pay slip" />
      </section>

      {/* Additional Document */}
      <section>
        <h2 className="font-semibold text-lg mb-2">Additional Document</h2>
        <p className="text-gray-500 text-sm mb-2">
          (add document to support your profile)
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {additionalDocs.map((_, idx) => (
            <FileUpload key={idx} label="Input PDF/IMG" />
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-2 flex items-center gap-2"
          onClick={handleAddDoc}
        >
          <Plus className="w-4 h-4" />
          Add more document
        </Button>
      </section>

      {/* Category Selection */}
      <section>
        <h2 className="font-semibold text-lg mb-2">
          Are you one of these category?
        </h2>
        <CategorySelector
          categories={categories}
          selected={selectedCategories}
          onSelect={handleCategorySelect}
        />
      </section>

      {/* Pagination and Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
        <div className="flex gap-2">
          <Button variant="outline" onClick={onSave}>
            Save
          </Button>
          <Button className="bg-blue-600 text-white" onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
