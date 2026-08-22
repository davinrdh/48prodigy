"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearch } from "@/context/SearchContext";
import { getExclusivePrice } from "@/data/exclusivePrices";

interface JKT48Member {
  type: string;
  code: string;
  name: string;
  nickname: string;
  photo: string;
  jkt48_member_id: number;
}

interface MemberGridProps {
  members: JKT48Member[];
}

const typeOrder: Record<string, number> = {
  LOVE: 1,
  DREAM: 2,
  PASSION: 3,
  TRAINEE: 4,
};

function getTypeOrder(type: string): number {
  return typeOrder[type] ?? 99;
}

export default function MemberGrid({ members }: MemberGridProps) {
  const { query, activeCategory, activeTeam } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 1500);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredMembers = useMemo(() => {
    let result = members;

    if (debouncedQuery.trim()) {
      const lowerQuery = debouncedQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.nickname.toLowerCase().includes(lowerQuery),
      );
    }

    if (activeTeam !== "ALL") {
      result = result.filter((item) => item.type === activeTeam);
    }

    return [...result].sort(
      (a, b) => getTypeOrder(a.type) - getTypeOrder(b.type),
    );
  }, [members, debouncedQuery, activeTeam]);

  if (filteredMembers.length === 0) {
    return (
      <div className="text-center py-16 text-white/50">
        <p className="text-lg">Member tidak ditemukan</p>
        <p className="text-sm mt-1">Coba kata kunci atau filter lain</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-5">
      {filteredMembers.map((item) => {
        // Panggil di sini — 1 baris, langsung dapat objek { vc, twoShot, mng }
        const price = getExclusivePrice(item.code);
        const activePrice = price[activeCategory];

        return (
          <div
            className="rounded-3xl bg-[var(--primary)] shadow-2xl hover:scale-[1.04] transition-all ease-in-out overflow-hidden"
            key={item.jkt48_member_id}
          >
            <div className="group relative w-full aspect-[251/308] overflow-hidden rounded-t-xl cursor-pointer">
              <Image
                src={`/api/image-proxy?url=${encodeURIComponent(item?.photo)}`}
                alt={item?.name}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3 md:p-5 flex justify-center items-center flex-col">
              <p className="text-sm md:text-md font-semibold text-center leading-tight">
                {item?.name}
              </p>
              <p className="text-center text-[12px] md:text-md">
                {item?.nickname}
              </p>

              <div className="w-full mt-2">
                <div className="text-center bg-black/20 rounded-lg px-3 py-2">
                  {/* <span className="font-medium text-xs md:text-sm">
                    {categoryLabels[activeCategory]}
                  </span> */}
                  <span className="font-semibold text-red-400">
                    Rp {activePrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
