"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useSearch } from "@/context/SearchContext";

interface JKT48Member {
  type: string;
  code: string;
  name: string;
  nickname: string;
  photo: string;
  jkt48_member_id: number;
}

interface MemberPrice {
  vc: number;
  twoShot: number;
  mng: number;
}

interface MemberGridProps {
  members: JKT48Member[];
  prices: Record<string, MemberPrice>;
  defaultPrice: MemberPrice;
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

// const categoryLabels: Record<string, string> = {
//   vc: "VC",
//   twoShot: "Two Shot",
//   mng: "MNG",
// };

export default function MemberGrid({
  members,
  prices,
  defaultPrice,
}: MemberGridProps) {
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

    // Filter team — cuma jalan kalau bukan "ALL"
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6 mt-5">
      {filteredMembers.map((item) => {
        const price = prices[item.code] ?? defaultPrice;
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
              <p
                className={`${item?.name.length > 14 ? "truncate" : ""} w-full max-w-[200px] md:text-md font-semibold text-center leading-tight`}
              >
                {item?.name}
              </p>
              <p className="text-center text-[12px] md:text-md">
                {item?.nickname}
              </p>

              <div className="w-full mt-2">
                <div className=" bg-[--background] rounded-lg px-3 py-2 text-center">
                  {/* <span className="font-medium text-xs md:text-sm">
                    {categoryLabels[activeCategory]}
                  </span> */}
                  <p className="font-semibold text-red-400">
                    Rp {activePrice.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
