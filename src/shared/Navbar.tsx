"use client";
import React, { useEffect, useRef, useState } from "react";
import "../styles/navbar.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Hamburger from "@/icons/Hamburger";
import Sidebar from "./Sidebar";
import ButtonCall from "@/components/ButtonCall";
import ButtonTranslate from "@/components/ButtonTranslate";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const hasLogged = useRef(false);
  const currentLocale = pathname.split("/")[1];

  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true;
    }
  }, [currentLocale]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

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

  const navLink = currentLocale == "en" ? navLinkEn : navLinkId;

  // const navLink = [
  //   { href: "/", label: t("home") },
  //   { href: "/about", label: t("aboutUs") },
  //   { href: "/contact", label: t("contact") },
  //   { href: "/product", label: t("product") },
  // ];

  const handleLocaleChange = (locale: string) => {
    router.push(`/${locale}${pathname.replace(/^\/(en|id)/, "")}`);
  };

  return (
    <>
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLink={navLink}
        pathname={pathname}
        locale={currentLocale}
        currentLocale={currentLocale}
        handleLocaleChange={handleLocaleChange}
      />
      <div className="sticky top-0 z-10">
        <div className="navbar">
          <div className="flex justify-between w-full">
            <Link href="/" locale={currentLocale} className="brand">
                <Image
                  src="/logo-transparant2.png"
                  alt="48Prodigy"
                  width={85}
                  height={80}
                />
              </Link>
            <div className="flex gap-5">

               <div className="flex items-center">
                  <div>
                    {navLink.map((link, index) => (
                      <Link
                        href={`/${currentLocale}${link.href}`}
                        locale={currentLocale}
                        key={index}
                        className={
                          pathname ===
                            `/${currentLocale}${link.href.replace(
                              /\/$/,
                              "",
                            )}` ||
                          (pathname.startsWith(
                            `/${currentLocale}${link.href}`,
                          ) &&
                            link.href !== "/")
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        {link.label}
                      </Link>
                    ))}
                    {/* <button type="button" className="hidden md:inline-block " onClick={() => setModalForm(true)}>Register</button> */}
                  </div>
                </div>
            </div>
            {pathname !== `/${currentLocale}/landing` && (
              <div
                className={`flex items-center me-4 md:hidden`}
                onClick={() => setIsOpen(true)}
              >
                <Hamburger />
              </div>
            )}
            <div
              className={`md:block p-[1.49rem] ${
                pathname !== `/${currentLocale}/landing` && "hidden"
              }`}
            >
              <div className="flex items-center">
                {pathname !== `/${currentLocale}/landing` && (
                  <ButtonTranslate
                    currentLocale={currentLocale}
                    handleLocaleChange={handleLocaleChange}
                  />
                )}

                {/* <ButtonCall /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
