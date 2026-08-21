// components/MemberPicker.tsx
"use client";

import { JKT48Member } from "@/types/booking";
import Image from "next/image";
import { useState, useMemo } from "react";

interface MemberPickerProps {
  members: JKT48Member[];
  selectedCode: string | null;
  onSelect: (member: JKT48Member) => void;
}

export default function MemberPicker({ members, selectedCode, onSelect }: MemberPickerProps) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedMember = members.find((m) => m.code === selectedCode);

  const filtered = useMemo(() => {
    if (!search.trim()) return members;
    const q = search.toLowerCase();
    return members.filter(
      (m) => m.name.toLowerCase().includes(q) || m.nickname.toLowerCase().includes(q)
    );
  }, [members, search]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-white/80 mb-1.5">Pilih Member</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 bg-black/30 rounded-xl px-3 py-2.5 text-left"
      >
        {selectedMember ? (
          <>
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image
                src={`/api/image-proxy?url=${encodeURIComponent(selectedMember.photo)}`}
                alt={selectedMember.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium text-sm">{selectedMember.name}</p>
              <p className="text-xs text-white/60">{selectedMember.nickname}</p>
            </div>
          </>
        ) : (
          <span className="text-white/50 text-sm">-- Pilih member --</span>
        )}
        <span className="ml-auto text-white/50">▾</span>
      </button>

      {isOpen && (
        <div className="absolute z-40 mt-2 w-full bg-[var(--primary)] border border-white/10 rounded-xl shadow-2xl overflow-hidden">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari member..."
            className="w-full bg-black/30 px-3 py-2 text-sm outline-none border-b border-white/10"
            autoFocus
          />
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-center text-sm text-white/50 py-4">Member tidak ditemukan</p>
            )}
            {filtered.map((member) => (
              <button
                key={member.jkt48_member_id}
                type="button"
                onClick={() => {
                  onSelect(member);
                  setIsOpen(false);
                  setSearch("");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-black/20 text-left"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={`/api/image-proxy?url=${encodeURIComponent(member.photo)}`}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{member.name}</p>
                  <p className="text-xs text-white/60">{member.nickname}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}