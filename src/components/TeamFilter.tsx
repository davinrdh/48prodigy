// TeamFilter.tsx
"use client";

import { useSearch } from "@/context/SearchContext";

const teams = ["ALL", "LOVE", "DREAM", "PASSION", "TRAINEE"] as const;

const teamColors: Record<string, string> = {
  ALL: "bg-white/20",
  LOVE: "bg-pink-500",
  DREAM: "bg-purple-500",
  PASSION: "bg-red-500",
  TRAINEE: "bg-gray-500",
};

export default function TeamFilter() {
  const { activeTeam, setActiveTeam } = useSearch();

  return (
    <div className="flex gap-1 pb-1 md:pb-0 md:flex-wrap scrollbar-hide md:mx-0 md:px-0">
      {teams.map((team) => {
        const isActive = activeTeam === team;
        return (
          <button
            key={team}
            onClick={() => setActiveTeam(team)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
              isActive
                ? `${teamColors[team]} text-white border-transparent`
                : "border-white/20 text-white/60 hover:border-white/40"
            }`}
          >
            {team === "ALL" ? "Semua" : team}
          </button>
        );
      })}
    </div>
  );
}