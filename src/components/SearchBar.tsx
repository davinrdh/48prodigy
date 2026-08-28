// SearchBar.tsx
"use client";

import { useSearch } from "@/context/SearchContext";

interface Props {
  locale: string;
}
export default function SearchBar({ locale }: Props) {
  const { query, setQuery } = useSearch();

  return (
    <div className="relative w-full md:w-80">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          locale === "en"
            ? "Search member or nickname..."
            : "Cari member atau nickname..."
        }
        className="w-full bg-black/30 text-white placeholder-white/50 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-red-500 transition-all"
      />
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
        >
          ✕
        </button>
      )}
    </div>
  );
}
