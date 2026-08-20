/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-[var(--primary)] flex justify-center py-10 mt-20">
      <Link href="/">
        <img src="/logo.svg" alt="" />
      </Link>
    </div>
  );
}
