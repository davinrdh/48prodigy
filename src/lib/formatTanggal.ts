

const namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const namaBulan = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export function formatTanggalDenganHari(tanggal: string): string {
  if (!tanggal) return "";

  const [year, month, day] = tanggal.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const hari = namaHari[date.getDay()];
  const bulan = namaBulan[date.getMonth()];

  return `${hari}, ${date.getDate()} ${bulan} ${date.getFullYear()}`;
}