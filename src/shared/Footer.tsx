/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-[var(--primary)] flex justify-center py-10 mt-20">
      <Link href="/">
        <Image
          src="/logo-transparant2.png"
          alt="48Prodigy"
          width={85}
          height={80}
        />
      </Link>
    </div>
  );
}
