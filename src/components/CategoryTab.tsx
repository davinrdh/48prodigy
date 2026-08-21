// CategoryTabs.tsx
"use client";

import { useSearch } from "@/context/SearchContext";

const categories = [
  { key: "vc", label: "VC" },
  { key: "mng", label: "MNG" },
  { key: "twoShot", label: "2S" },
] as const;

export default function CategoryTabs() {
  const { activeCategory, setActiveCategory } = useSearch();

  return (
    <div className="flex gap-1 bg-black/20 rounded-xl p-1 w-full md:w-fit">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => setActiveCategory(cat.key)}
          className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
            activeCategory === cat.key
              ? "bg-red-600 text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}