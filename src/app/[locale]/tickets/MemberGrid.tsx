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

export default function MemberGrid({
  members,
  prices,
  defaultPrice,
}: MemberGridProps) {
  const { query } = useSearch();
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredMembers = useMemo(() => {
    if (!debouncedQuery.trim()) return members;
    const lowerQuery = debouncedQuery.toLowerCase().trim();
    return members.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerQuery) ||
        item.nickname.toLowerCase().includes(lowerQuery),
    );
  }, [members, debouncedQuery]);

  if (filteredMembers.length === 0) {
    return (
      <div className="text-center py-16 text-white/50">
        <p className="text-lg">Member tidak ditemukan</p>
        <p className="text-sm mt-1">Coba kata kunci lain</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-5">
      {filteredMembers.map((item) => {
        const price = prices[item.code] ?? defaultPrice;
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
                className={`text-sm md:text-md font-semibold text-center leading-tight`}
              >
                {item?.name}
              </p>
              <p className="text-center text-[12px] md:text-md">{item?.nickname}</p>

              <div className="w-full space-y-2 text-sm mt-2">
                <div className="flex flex-col md:flex-row md:justify-between items-center bg-black/20 rounded-lg px-3 py-2">
                  <span className="font-medium">VC</span>
                  <span className="font-semibold">
                    Rp {price.vc.toLocaleString("id-ID")}
                  </span>
                </div>
                {/* <div className="flex flex-col md:flex-row md:justify-between items-center bg-black/20 rounded-lg px-3 py-2">
                  <span className="font-medium">Two Shot</span>
                  <span className="font-semibold">
                    Rp {price.twoShot.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between items-center bg-black/20 rounded-lg px-3 py-2">
                  <span className="font-medium">MNG</span>
                  <span className="font-semibold">
                    Rp {price.mng.toLocaleString("id-ID")}
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
