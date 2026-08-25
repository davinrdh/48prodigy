"use client";

interface Props {
  status: "success" | "error";
  message?: string;
  onClose: () => void;
}

export default function SubmitStatusModal({ status, message, onClose }: Props) {
  const isSuccess = status === "success";

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 flex items-center justify-center p-5" onClick={onClose}>
      <div
        className="bg-[var(--primary)] rounded-3xl max-w-sm w-full p-6 md:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-3xl mb-4 ${
            isSuccess ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </div>

        <h3 className="text-lg font-bold mb-2">
          {isSuccess ? "Pesanan Berhasil Dikirim" : "Gagal Mengirim Pesanan"}
        </h3>

        <p className="text-sm text-white/70 mb-6">
          {isSuccess
            ? "Tim kami akan segera menghubungi kamu untuk proses selanjutnya."
            : message || "Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi."}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={`w-full font-semibold py-3 rounded-xl transition-colors ${
            isSuccess
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {isSuccess ? "Selesai" : "Coba Lagi"}
        </button>
      </div>
    </div>
  );
}