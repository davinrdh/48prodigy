"use client";

import { useState } from "react";
import MemberPicker from "./MemberPicker";
import type { JKT48Member, CartItem, ExclusiveType } from "@/types/booking";
import { maxTiketByType } from "@/types/booking";
import CustomDateInput from "./CustomDateInput";

interface Props {
  type: ExclusiveType;
  members: JKT48Member[];
  onClose: () => void;
  onAdd: (item: CartItem) => void;
  locale: string;
}

export default function AddMemberModal({
  type,
  members,
  onClose,
  onAdd,
  locale,
}: Props) {
  const [selectedMember, setSelectedMember] = useState<JKT48Member | null>(
    null,
  );
  const [tanggal, setTanggal] = useState("");
  const [sesi, setSesi] = useState("");
  const [jumlahTiket, setJumlahTiket] = useState(1);

  const maxTiket = maxTiketByType[type];
  const isValid = selectedMember && tanggal && sesi;

  function handleAdd() {
    if (!selectedMember || !tanggal || !sesi) return;

    onAdd({
      id: `${selectedMember.code}-${Date.now()}`,
      member: selectedMember,
      tanggal,
      sesi,
      jumlahTiket: Math.min(jumlahTiket, maxTiket),
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-[var(--primary)] rounded-3xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex justify-between items-center px-5 pt-5 pb-3 border-b border-white/10">
          <h3 className="font-semibold text-lg">
            {locale === "en" ? "Add Member" : "Tambah Member"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-5 pt-4 pb-2 space-y-4">
          {members.length === 0 ? (
            <p className="text-center text-sm text-white/50 py-6">
              {locale === "en"
                ? "The maximum limit of members for this service has been reached"
                : "Batas maksimal member untuk layanan ini sudah tercapai"}
            </p>
          ) : (
            <MemberPicker
              members={members}
              selectedCode={selectedMember?.code ?? null}
              onSelect={setSelectedMember}
              locale={locale}
            />
          )}

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              {locale === "en" ? "Date" : "Tanggal"}
            </label>
            <div>
              <CustomDateInput value={tanggal} onChange={setTanggal} locale={locale} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              Sesi
            </label>
            <input
              type="text"
              value={sesi}
              onChange={(e) => setSesi(e.target.value)}
              placeholder={
                locale === "en"
                  ? "Example: Sesi 1, 14:00 WIB"
                  : "Contoh: Sesi 1, 14:00 WIB"
              }
              className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1.5">
              {locale === "en" ? "Number of Tickets" : "Jumlah Tiket"}{" "}
              {maxTiket > 1 && (
                <span className="text-white/40">(max {maxTiket})</span>
              )}
            </label>
            <input
              type="number"
              min={1}
              max={maxTiket}
              value={jumlahTiket}
              disabled={maxTiket === 1}
              onChange={(e) =>
                setJumlahTiket(Math.min(Number(e.target.value), maxTiket))
              }
              className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10 p-5">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!isValid}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {locale === "en" ? "Add" : "Tambahkan"}
          </button>
        </div>
      </div>
    </div>
  );
}
