"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id, enUS } from "date-fns/locale";

interface Props {
  value: string; // format "YYYY-MM-DD"
  onChange: (value: string) => void;
  locale?: string;
}

function toDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CustomDateInput({ value, onChange, locale }: Props) {
  return (
    <DatePicker
      selected={toDate(value)}
      onChange={(date: Date | null) => {
        if (date) onChange(toDateString(date));
      }}
      dateFormat="dd MMMM yyyy"
      locale={locale === "en" ? enUS : id}
      placeholderText={locale === "en" ? "Select date" : "Pilih tanggal"}
      minDate={new Date()} // opsional: cegah pilih tanggal yang sudah lewat
      className="w-full bg-black/30 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500"
      calendarClassName="custom-datepicker"
      wrapperClassName="w-full"
    />
  );
}