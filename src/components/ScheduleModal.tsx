// components/ScheduleModal.tsx
"use client";

import Image from "next/image";

interface Props {
  onClose: () => void;
}

export default function ScheduleModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-[var(--primary)] rounded-3xl max-w-screen-md w-full max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 flex justify-between items-center px-4 pt-4 pb-3 border-b border-white/10">
          <h3 className="font-semibold text-lg">Jadwal</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 pt-4 pb-8 space-y-4">
          <Image src="/jadwal.jpg" alt="Jadwal" width={600} height={500} className="rounded-xl w-full h-auto" />
          <Image src="/jadwal2.jpg" alt="Jadwal" width={600} height={500} className="rounded-xl w-full h-auto" />
          <Image src="/jadwal3.jpg" alt="Jadwal" width={600} height={500} className="rounded-xl w-full h-auto" />
          <Image src="/jadwal4.jpg" alt="Jadwal" width={600} height={500} className="rounded-xl w-full h-auto" />
          <Image src="/jadwal.jpg" alt="Jadwal" width={600} height={500} className="rounded-xl w-full h-auto" />
        </div>
        <div className="shrink-0 flex justify-between items-center px-4 pt-4 pb-3 border-t border-white/10" />
      </div>
    </div>
  );
}