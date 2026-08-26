"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const locale = useLocale();

  const navLinkEn = [
    { href: "/", label: "Home" },
    { href: "/booking", label: "Booking" },
    { href: "/pricelist", label: "Price List" },
    { href: "/tickets", label: "Ticket Info" },
    { href: "/testimoni", label: "Reviews" },
  ];

  const navLinkId = [
    { href: "/", label: "Beranda" },
    { href: "/booking", label: "Pesan" },
    { href: "/pricelist", label: "Daftar Harga" },
    { href: "/tickets", label: "Informasi Tiket" },
    { href: "/testimoni", label: "Ulasan" },
  ];

  const navLink = locale == "en" ? navLinkEn : navLinkId;

  const content = {
    id: {
      tagline: "Layanan joki tiket & sesi eksklusif JKT48 terpercaya sejak 2024.",
      quickLinks: "Tautan Cepat",
      contact: "Kontak Kami",
      followUs: "Ikuti Kami",
      copyright: "Seluruh hak cipta dilindungi.",
    },
    en: {
      tagline: "Trusted JKT48 ticket & exclusive session jockey service since 2024.",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      followUs: "Follow Us",
      copyright: "All rights reserved.",
    },
  };

  const t = locale === "en" ? content.en : content.id;

  const socialLinks = [
    { name: "X", href: "https://x.com/48Prodigy/"},
  ];

  return (
    <footer className="bg-[var(--primary)] mt-20">
      <div className="px-5 md:px-20 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand & Tagline */}
          <div className="md:col-span-2">
            <Link href={`/${locale}`} className="inline-block mb-4">
              <Image src="/hero.png" alt="48Prodigy" width={100} height={100} />
            </Link>
            <p className="text-sm text-white/60 max-w-sm leading-relaxed">
              {t.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50 mb-4">
              {t.quickLinks}
            </h3>
            <div className="flex flex-col gap-2.5">
              {navLink.map((link, index) => (
                <Link
                  href={`/${locale}${link.href}`}
                  locale={locale}
                  key={index}
                  className="text-sm text-white/80 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50 mb-4">
              {t.contact}
            </h3>
            <a
              href="mailto:hello@48prodigy.com"
              className="text-sm text-white/80 hover:text-white transition-colors block mb-1"
            >
              hello@48prodigy.com
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-white transition-colors block mb-5"
            >
              +62 812-3456-7890
            </a>

            <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50 mb-3">
              {t.followUs}
            </h3>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-9 h-9 flex items-center justify-center no-underline rounded-full bg-black/20 hover:bg-black/30 transition-colors text-sm"
                >
                  <Image src="/x-logo.png" alt="X Logo" width={40} height={40} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 px-5 md:px-20 py-5">
        <p className="text-xs text-white/40 text-center md:text-left">
          © {new Date().getFullYear()} 48Prodigy. {t.copyright}
        </p>
      </div>
    </footer>
  );
}