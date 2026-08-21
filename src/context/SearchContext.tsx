// context/SearchContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type PriceCategory = "vc" | "twoShot" | "mng";
type TeamType = "LOVE" | "DREAM" | "PASSION" | "TRAINEE";

interface SearchContextType {
  query: string;
  setQuery: (value: string) => void;
  activeCategory: PriceCategory;
  setActiveCategory: (value: PriceCategory) => void;
  activeTeam: TeamType | "ALL";
  setActiveTeam: (value: TeamType | "ALL") => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PriceCategory>("vc");
  const [activeTeam, setActiveTeam] = useState<TeamType | "ALL">("ALL");

  return (
    <SearchContext.Provider
      value={{ query, setQuery, activeCategory, setActiveCategory, activeTeam, setActiveTeam }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch harus dipakai di dalam SearchProvider");
  return context;
}