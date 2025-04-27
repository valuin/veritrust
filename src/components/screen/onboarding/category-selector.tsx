export function CategorySelector({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string[];
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          className={`px-3 py-1 rounded-full border text-sm ${
            selected.includes(cat)
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-600"
          }`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
      <button
        type="button"
        className="px-3 py-1 rounded-full border text-sm bg-white text-blue-600 border-blue-600"
      >
        More Category
      </button>
    </div>
  );
}
