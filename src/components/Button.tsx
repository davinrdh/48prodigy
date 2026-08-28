"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function Button() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true;
    }
  }, [currentLocale]);

  return (
    <Link href={`/${currentLocale}/booking`}>
      <button
        type="button"
        className="bg-[var(--secondary)] p-5 rounded-2xl font-bold w-full md:w-fit"
      >
        <div>PESAN SEKARANG</div>
      </button>
    </Link>
  );
}
