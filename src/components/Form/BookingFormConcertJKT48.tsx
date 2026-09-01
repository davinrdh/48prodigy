"use client";

import { useState } from "react";
import type { JKT48ConcertForm } from "@/types/booking";

const kategoriOptions = ["Festival", "Tribun Reguler", "Tribun VIP", "VVIP"];

export default function BookingFormConcert() {
  const [form, setForm] = useState<JKT48ConcertForm>({
    kategoriKursi: "",
    jumlahTiket: 1,
    namaLengkap: "",
    email: "",
    noHp: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange<K extends keyof JKT48ConcertForm>(key: K, value: JKT48ConcertForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      console.log("Submit concert:", form);
      alert("Pesanan berhasil dikirim! Tim kami akan segera menghubungi kamu.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-[var(--primary)] shadow-2xl p-6 md:p-8 space-y-5 max-w-lg mx-auto"
    >
      <div>
        <h2 className="text-xl font-bold">Pesan Concert JKT48</h2>
        <p className="text-sm text-white/60 mt-1">Dapatkan kategori kursi impianmu</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Kategori Kursi</label>
        <select
          required
          value={form.kategoriKursi}
          onChange={(e) => handleChange("kategoriKursi", e.target.value)}
          className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">-- Pilih kategori --</option>
          {kategoriOptions.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1.5">Jumlah Tiket</label>
        <input
          type="number"
          min={1}
          required
          value={form.jumlahTiket}
          onChange={(e) => handleChange("jumlahTiket", Number(e.target.value))}
          className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="border-t border-white/10 pt-5 space-y-5">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Nama Lengkap</label>
          <input
            type="text"
            required
            value={form.namaLengkap}
            onChange={(e) => handleChange("namaLengkap", e.target.value)}
            className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Nomor HP</label>
          <input
            type="tel"
            required
            value={form.noHp}
            onChange={(e) => handleChange("noHp", e.target.value)}
            placeholder="08xxxxxxxxxx"
            className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {submitting ? "Mengirim..." : "Pesan Sekarang"}
      </button>
    </form>
  );
}