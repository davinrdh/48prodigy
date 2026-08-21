// components/BookingFormExclusive.tsx
"use client";

import { useEffect, useState } from "react";
import MemberPicker from "./MemberPicker";
import type {
  JKT48Member,
  ExclusiveType,
  MemberOrderItem,
} from "@/types/booking";
import Image from "next/image";

interface Props {
  type: ExclusiveType;
  members: JKT48Member[];
}

const typeLabels: Record<ExclusiveType, string> = {
  vc: "Video Call",
  twoShot: "2 Shot",
  mng: "Meet & Greet",
};

function createEmptyItem(): MemberOrderItem {
  return { memberCode: "", sesi: "", jumlahTiket: 1 };
}

export default function BookingFormExclusive({ type, members }: Props) {
  const [items, setItems] = useState<MemberOrderItem[]>([createEmptyItem()]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noWa, setNoWa] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  useEffect(() => {
    if (showScheduleModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showScheduleModal]);

  function updateItem(index: number, patch: Partial<MemberOrderItem>) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  }

  function addItem() {
    setItems((prev) => [...prev, createEmptyItem()]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function getAvailableMembers(currentIndex: number) {
    const chosenElsewhere = items
      .filter((_, i) => i !== currentIndex)
      .map((item) => item.memberCode);
    return members.filter((m) => !chosenElsewhere.includes(m.code));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const hasEmptyMember = items.some((item) => !item.memberCode || !item.sesi);
    if (hasEmptyMember) {
      alert("Pastikan semua member dan sesi sudah dipilih");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { type, items, email, password, noWa };
      console.log("Submit:", payload);
      alert("Pesanan berhasil dikirim! Tim kami akan segera menghubungi kamu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 items-start">
        <div className="rounded-3xl bg-[var(--primary)] shadow-2xl w-full md:w-1/2 h-[970px] max-h-[970px] overflow-hidden flex flex-col">
          <div className="shrink-0 border-b border-white/10 p-6 md:px-8 md:pt-8 md:pb-5 pt-4">
            <h2 className="text-xl font-bold">Pesan {typeLabels[type]}</h2>
            <p className="text-sm text-white/60 mt-1">
              Bisa pesan untuk beberapa member sekaligus dalam 1 akun
            </p>
          </div>
          <form
            id="booking-form"
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto custom-scrollbar p-6 md:px-8 md:pb-5 md:pt-3 space-y-6"
          >
            <button
              type="button"
              onClick={() => setShowScheduleModal(true)}
              className="md:hidden w-full flex items-center justify-center gap-2 bg-black/30 hover:bg-black/40 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
            >
              📅 Lihat Jadwal
            </button>

            <div className="space-y-4">
              {items.map((item, index) => {
                const selectedMember =
                  members.find((m) => m.code === item.memberCode) ?? null;
                const availableMembers = getAvailableMembers(index);

                return (
                  <div
                    key={index}
                    className="bg-black/20 rounded-2xl p-4 space-y-4 relative"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-white/70">
                        Member #{index + 1}
                      </p>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Hapus
                        </button>
                      )}
                    </div>

                    <MemberPicker
                      members={availableMembers}
                      selectedCode={selectedMember?.code ?? null}
                      onSelect={(m) =>
                        updateItem(index, { memberCode: m.code })
                      }
                    />

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1.5">
                        Sesi
                      </label>
                      <input
                        type="text"
                        required
                        value={item.sesi}
                        onChange={(e) =>
                          updateItem(index, { sesi: e.target.value })
                        }
                        placeholder="Contoh: Sesi 1, 14:00 WIB"
                        className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-1.5">
                        Jumlah Tiket
                      </label>
                      <input
                        type="number"
                        min={1}
                        required
                        value={item.jumlahTiket}
                        onChange={(e) =>
                          updateItem(index, {
                            jumlahTiket: Number(e.target.value),
                          })
                        }
                        className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {items.length < members.length && (
              <button
                type="button"
                onClick={addItem}
                className="w-full border-2 border-dashed border-white/20 hover:border-white/40 text-white/70 hover:text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
              >
                + Tambah Member Lain
              </button>
            )}

            <div className="border-t border-white/10 pt-5 space-y-5">
              <p className="text-sm font-medium text-white/80">
                Akun JKT48 (untuk proses war)
              </p>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Email Akun JKT48
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">
                  Password Akun JKT48
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs text-white/40 mt-1">
                  Data kamu aman & hanya dipakai untuk proses war tiket.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                Nomor WhatsApp Aktif
              </label>
              <input
                type="tel"
                required
                value={noWa}
                onChange={(e) => setNoWa(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </form>

          {/* Footer tombol — SELALU di bawah, tidak ikut scroll */}
          <div className="shrink-0 border-t border-white/10 p-6 md:px-8 md:pt-5 md:pb-8 pt-4">
            <button
              type="submit"
              form="booking-form"
              disabled={submitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {submitting
                ? "Mengirim..."
                : `Pesan Sekarang (${items.length} Member)`}
            </button>
          </div>
        </div>

        <div className="hidden md:flex  rounded-3xl bg-[var(--primary)] shadow-2xl w-1/2 h-[970px] max-h-[970px] overflow-hidden flex-col">
          <div className="shrink-0 border-b border-white/10 p-6 md:px-8 md:pt-8 md:pb-5 pt-4">
            <h2 className="text-xl font-bold">Time Table {typeLabels[type]}</h2>
            <p className="text-sm text-white/60 mt-1">
              Jadwal lengkap sesi yang tersedia
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-6">
            <Image
              src="/jadwal.jpg"
              alt="Jadwal"
              width={600}
              height={500}
              className="rounded-xl w-full h-auto"
            />
            <Image
              src="/jadwal2.jpg"
              alt="Jadwal"
              width={600}
              height={500}
              className="rounded-xl w-full h-auto"
            />
            <Image
              src="/jadwal3.jpg"
              alt="Jadwal"
              width={600}
              height={500}
              className="rounded-xl w-full h-auto"
            />
            <Image
              src="/jadwal4.jpg"
              alt="Jadwal"
              width={600}
              height={500}
              className="rounded-xl w-full h-auto"
            />
            <Image
              src="/jadwal.jpg"
              alt="Jadwal"
              width={600}
              height={500}
              className="rounded-xl w-full h-auto"
            />
          </div>

          <div className="shrink-0 border-t border-white/10 p-6 md:px-8 md:pt-5 md:pb-8 pt-4 h-[100px] w-full" />
        </div>

        {showScheduleModal && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5"
            onClick={() => setShowScheduleModal(false)}
          >
            <div
              className="bg-[var(--primary)] rounded-3xl max-w-md w-full max-h-[85vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="shrink-0 flex justify-between items-center px-4 pt-4 pb-3 border-b border-white/10">
                <h2 className="text-xl font-bold">
                  Time Table {typeLabels[type]}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="text-white/60 hover:text-white text-xl leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 pb-4 pt-4 space-y-4">
                <Image
                  src="/jadwal.jpg"
                  alt="Jadwal"
                  width={600}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <Image
                  src="/jadwal2.jpg"
                  alt="Jadwal"
                  width={600}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <Image
                  src="/jadwal3.jpg"
                  alt="Jadwal"
                  width={600}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <Image
                  src="/jadwal4.jpg"
                  alt="Jadwal"
                  width={600}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
                <Image
                  src="/jadwal.jpg"
                  alt="Jadwal"
                  width={600}
                  height={500}
                  className="rounded-xl w-full h-auto"
                />
              </div>
              <div className="shrink-0 border-t border-white/10 h-6 w-full" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
