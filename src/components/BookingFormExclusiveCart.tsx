// components/BookingFormExclusiveCart.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddMemberModal from "./AddMemberModal";
import ScheduleModal from "./ScheduleModal";
import type { JKT48Member, ExclusiveType, CartItem } from "@/types/booking";
import { maxSameMemberByType } from "@/types/booking";
import { getExclusivePrice } from "@/data/exclusivePrices";

interface Props {
  type: ExclusiveType;
  members: JKT48Member[];
}

const typeLabels: Record<ExclusiveType, string> = {
  vc: "Video Call",
  twoShot: "2 Shot",
  mng: "Meet & Greet",
};

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function BookingFormExclusiveCart({ type, members }: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noWa, setNoWa] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const anyModalOpen = showAddModal || showScheduleModal;
  const maxSameMember = maxSameMemberByType[type];

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [anyModalOpen]);

  // Member yang masih boleh ditambahkan — dibatasi jumlah maksimal kemunculan yang sama
  const availableMembers = members.filter((m) => {
    const countInCart = cart.filter(
      (item) => item.member.code === m.code,
    ).length;
    return countInCart < maxSameMember;
  });

  function handleAddToCart(item: CartItem) {
    setCart((prev) => [...prev, item]);
  }

  function handleRemoveFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  const totalTiket = cart.reduce((sum, item) => sum + item.jumlahTiket, 0);

  const totalHarga = cart.reduce((sum, item) => {
    const price = getExclusivePrice(item.member.code);
    return sum + price[type]; // tidak dikali jumlahTiket lagi
  }, 0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Tambahkan minimal 1 member dulu ya");
      return;
    }

    setSubmitting(true);
    try {
      const payload = { type, cart, email, password, noWa, totalHarga };
      // TODO: ganti dengan endpoint API kamu
      console.log("Submit:", payload);
      alert("Pesanan berhasil dikirim! Tim kami akan segera menghubungi kamu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 items-start">
        {/* CARD KIRI — Keranjang Member */}
        <div className="rounded-3xl bg-[var(--primary)] shadow-2xl w-full md:w-1/2 md:h-[750px] md:max-h-[750px] overflow-hidden flex flex-col">
          <div className="shrink-0 flex justify-between items-start px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold">Pesan {typeLabels[type]}</h2>
              <p className="text-sm text-white/60 mt-1">
                Tambahkan member yang ingin dipesan
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowScheduleModal(true)}
              className="shrink-0 bg-black/30 hover:bg-black/40 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              📅 Jadwal
            </button>
          </div>

          {/* Area scroll — mobile dibatasi ~2 item, desktop mengisi sisa tinggi 750px */}
          <div className="max-h-[230px] md:max-h-none md:flex-1 md:min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-3">
            {cart.length === 0 && (
              <div className="text-center py-10 text-white/40 text-sm">
                Belum ada member yang ditambahkan
              </div>
            )}

            {cart.map((item) => {
              const price = getExclusivePrice(item.member.code);
              const subtotal = price[type];

              return (
                <div
                  key={item.id}
                  className="bg-black/20 rounded-2xl p-4 flex gap-3 items-start"
                >
                  <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={`/api/image-proxy?url=${encodeURIComponent(item.member.photo)}`}
                      alt={item.member.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {item.member.name}
                    </p>
                    <p className="text-xs text-white/60">
                      {item.member.nickname}
                    </p>
                    <div className="mt-1.5 space-y-0.5 text-xs text-white/70">
                      <p>📅 {item.tanggal}</p>
                      <p>🕐 {item.sesi}</p>
                      <p>
                        🎫 {item.jumlahTiket} tiket · {formatRupiah(subtotal)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="shrink-0 text-red-400 hover:text-red-300 text-xs font-medium"
                  >
                    Hapus
                  </button>
                </div>
              );
            })}
          </div>

          <div className="shrink-0 border-t border-white/10 p-6 md:p-8">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              disabled={availableMembers.length === 0}
              className="w-full border-2 border-dashed border-white/20 hover:border-white/40 disabled:opacity-40 disabled:cursor-not-allowed text-white/70 hover:text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
            >
              + Tambah Member
            </button>
          </div>
        </div>

        {/* CARD KANAN — Data Akun & Submit */}
        <form
          id="booking-form-cart"
          onSubmit={handleSubmit}
          className="rounded-3xl bg-[var(--primary)] shadow-2xl w-full md:w-1/2 md:h-[750px] md:max-h-[750px] overflow-hidden flex flex-col"
        >
          <div className="shrink-0 px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-white/10">
            <h2 className="text-xl font-bold">Data Pemesanan</h2>
            <p className="text-sm text-white/60 mt-1">
              Lengkapi data akun untuk proses war
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-5">
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
                type="input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
              <p className="text-xs text-white/40 mt-1">
                Data kamu aman & hanya dipakai untuk proses war tiket.
              </p>
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

            <div className="border-t border-white/10 pt-5">
              <p className="text-sm font-medium text-white/80 mb-3">
                Ringkasan Pesanan
              </p>
              <div className="bg-black/20 rounded-xl p-4 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Jumlah Member</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total Tiket</span>
                  <span className="font-semibold">{totalTiket}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-white/10">
                  <span className="text-white/80 font-medium">Total Bayar</span>
                  <span className="font-bold text-red-400">
                    {formatRupiah(totalHarga)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-white/10 p-6 md:p-8">
            <button
              type="submit"
              disabled={submitting || cart.length === 0}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {submitting
                ? "Mengirim..."
                : `Pesan Sekarang (${formatRupiah(totalHarga)})`}
            </button>
          </div>
        </form>
      </div>

      {showAddModal && (
        <AddMemberModal
          type={type}
          members={availableMembers}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddToCart}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal onClose={() => setShowScheduleModal(false)} />
      )}
    </>
  );
}
