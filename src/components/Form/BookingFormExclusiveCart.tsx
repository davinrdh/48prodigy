"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AddMemberModal from "./AddMemberModal";
import ScheduleModal from "../ScheduleModal";
import type { JKT48Member, ExclusiveType, CartItem } from "@/types/booking";
import { maxSameMemberByType } from "@/types/booking";
import { getExclusivePrice } from "@/data/exclusivePrices";
import SubmitStatusModal from "../SubmitStatusModal";
import { formatTanggalDenganHari } from "@/lib/formatTanggal";

interface Props {
  type: ExclusiveType;
  members: JKT48Member[];
  locale: string;
}

const typeLabels: Record<ExclusiveType, string> = {
  vc: "Video Call",
  twoShot: "2 Shot",
  mng: "Meet & Greet",
};

function formatRupiah(n: number) {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function BookingFormExclusiveCart({
  type,
  members,
  locale,
}: Props) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [noWa, setNoWa] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const maxSameMember = maxSameMemberByType[type];
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [submitErrorMessage, setSubmitErrorMessage] = useState("");

  const anyModalOpen =
    showAddModal || showScheduleModal || submitStatus !== null;

  const GOOGLE_APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyb8jE_TXO5e-FiggpG0_XJYzsiBgK6b5zRpNdy-CY-FB5McRjLJfMl_8HxWKVmxKQ-/exec";

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [anyModalOpen]);

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
    return sum + price[type];
  }, 0);

  function formatWaLink(noWa: string) {
    let normalized = noWa.trim().replace(/[\s-]/g, "");

    if (normalized.startsWith("+62")) {
      normalized = normalized.slice(1);
    } else if (normalized.startsWith("62")) {
      // sudah benar, tidak perlu diubah
    } else if (normalized.startsWith("0")) {
      normalized = "62" + normalized.slice(1);
    }

    return `https://wa.me/${normalized}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (cart.length === 0) {
      setSubmitErrorMessage("Tambahkan minimal 1 member dulu ya");
      setSubmitStatus("error");
      return;
    }

    setSubmitting(true);
    try {
      const memberSummary = cart
        .map((item) => {
          const tanggalFormatted = formatTanggalDenganHari(item.tanggal);
          const label = item.isCadangan ? " [CADANGAN]" : "";
          return `${item.member.name}${label} | ${item.sesi} | ${tanggalFormatted} | ${item.jumlahTiket} tiket`;
        })
        .join("\n");

      const payload = {
        type,
        memberSummary,
        email,
        password,
        waLink: formatWaLink(noWa),
        totalHarga,
      };

      const res = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitStatus("success");
        setCart([]);
        setEmail("");
        setPassword("");
        setNoWa("");
      } else {
        setSubmitErrorMessage(
          result.message || "Terjadi kesalahan dari server.",
        );
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Gagal submit ke Google Apps Script:", error);
      setSubmitErrorMessage(
        "Gagal terhubung ke server. Periksa koneksi internet kamu dan coba lagi.",
      );
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-3 items-start">
        <div className="rounded-3xl bg-[var(--primary)] shadow-2xl w-full lg:w-1/2 lg:h-[750px] lg:max-h-[750px] overflow-hidden flex flex-col">
          <div className="shrink-0 flex justify-between items-start px-6 md:px-8 pt-6 md:pt-8 pb-5 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold">
                {locale === "en" ? "Booking" : "Pesan"} {typeLabels[type]}
              </h2>
              <p className="text-sm text-white/60 mt-1">
                {locale === "en"
                  ? "Add the members you want to book"
                  : "Tambahkan member yang ingin dipesan"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowScheduleModal(true)}
              className="shrink-0 bg-black/30 hover:bg-black/40 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              📅 Time Table
            </button>
          </div>

          <div className="max-h-[230px] md:max-h-none md:flex-1 md:min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-3">
            {cart.length === 0 && (
              <div className="text-center py-10 text-white/40 text-sm">
                {locale === "en"
                  ? "No members have been added yet"
                  : "Belum ada member yang ditambahkan"}
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
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm truncate">
                        {item.member.name}
                      </p>
                      {item.isCadangan && (
                        <span className="shrink-0 bg-yellow-500/20 text-yellow-400 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Cadangan
                        </span>
                      )}
                    </div>
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

          <div className="shrink-0 border-t border-white/10 p-6 lg:p-8">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              disabled={availableMembers.length === 0}
              className="w-full border-2 border-dashed border-white/20 hover:border-white/40 disabled:opacity-40 disabled:cursor-not-allowed text-white/70 hover:text-white rounded-xl py-2.5 text-sm font-medium transition-colors"
            >
              {locale === "en" ? "+ Add Member" : "+ Tambah Member"}
            </button>
          </div>
        </div>

        <form
          id="booking-form-cart"
          onSubmit={handleSubmit}
          className="rounded-3xl bg-[var(--primary)] shadow-2xl w-full lg:w-1/2 lg:h-[750px] lg:max-h-[750px] overflow-hidden flex flex-col"
        >
          <div className="shrink-0 px-6 lg:px-8 pt-6 lg:pt-8 pb-5 border-b border-white/10">
            <h2 className="text-xl font-bold">
              {locale === "en" ? "Order Details" : "Data Pemesanan"}
            </h2>
            <p className="text-sm text-white/60 mt-1">
              {locale === "en"
                ? "Complete the account data for the war process"
                : "Lengkapi data akun untuk proses war"}
            </p>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                {locale === "en" ? "JKT48 Account Email" : "Email Akun JKT48"}
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
                {locale === "en"
                  ? "JKT48 Account Password"
                  : "Password Akun JKT48"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 rounded-xl px-3 py-2.5 pr-12 text-sm outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-xs font-medium"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M38.8 5.1C28.4-3.5 13.3-1.2 5.1 9.2s-3.3 24.3 7.1 32.5l452 352c10.4 8.1 25.5 5.9 33.7-4.5s5.9-25.5-4.5-33.7L38.8 5.1zM439.3 352.2L358.5 288.5C368.5 272.2 374 252.8 374 232c0-61.9-50.1-112-112-112-20.8 0-40.2 5.5-56.5 15.5L125.7 67.8C161.4 46.1 204.4 32 250 32c141.4 0 262.4 81.7 322.9 200-24.9 49.3-59.5 91.2-101.6 122.2zM157.3 226.7l-71.1-55.4C44 201 17.1 240.5 0 288c60.5 118.3 181.5 200 322.9 200c40.3 0 78.4-7.9 113.1-22l-64.8-50.5c-23.7 13.2-51.1 20.5-80.2 20.5-91.9 0-166-74.1-166-166c0-17.6 2.7-34.6 7.6-50.7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 576 512"
                    >
                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.5 92.9-131.3c3.3-7.9 3.3-16.7 0-24.6C558.5 204 527.2 152 480.4 108.6C433.5 64.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.1-13.7 6.6s1.1 11.9 6.6 13.7c9.5 3.1 19.8 4.8 30.4 4.8c44.2 0 80-35.8 80-80c0-10.6-1.7-20.9-4.8-30.4c-1.8-5.5-8.2-8.4-13.7-6.6s-8.4 8.2-6.6 13.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-white/40 mt-1">
                {locale === "en"
                  ? "Your data is secure and used solely for the ticket purchasing process."
                  : "Data kamu aman & hanya dipakai untuk proses war tiket."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">
                {locale === "en"
                  ? "Active WhatsApp Number"
                  : "Nomor WhatsApp Aktif"}
              </label>
              <input
                type="numeric"
                required
                value={noWa}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setNoWa(onlyDigits);
                }}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="border-t border-white/10 pt-5">
              <p className="text-sm font-medium text-white/80 mb-3">
                {locale === "en" ? "Order Summary" : "Ringkasan Pesanan"}
              </p>
              <div className="bg-black/20 rounded-xl p-4 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Total Member</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Total Tiket</span>
                  <span className="font-semibold">{totalTiket}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-white/10">
                  <span className="text-white/80 font-medium">
                    {locale === "en" ? "Total Payment" : "Total Bayar"}
                  </span>
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
                ? locale === "en"
                  ? "Sending..."
                  : "Mengirim..."
                : locale === "en"
                  ? `Order Now (${formatRupiah(totalHarga)})`
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
          locale={locale}
        />
      )}

      {showScheduleModal && (
        <ScheduleModal onClose={() => setShowScheduleModal(false)} />
      )}

      {submitStatus && (
        <SubmitStatusModal
          status={submitStatus}
          message={submitErrorMessage}
          onClose={() => setSubmitStatus(null)}
          locale={locale}
        />
      )}
    </>
  );
}
