/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonTranslate from "@/components/ButtonTranslate";
import CloseIcon from "@/icons/CloseIcon";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface ISidebar {
  isOpen: any;
  setIsOpen: any;
  navLink: any;
  pathname: any;
  locale: string;
  currentLocale: any;
  handleLocaleChange: any;
  setModalForm?: any;
}
export default function Sidebar({
  isOpen,
  setIsOpen,
  navLink,
  pathname,
  locale,
  currentLocale,
  handleLocaleChange,
}: ISidebar) {
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current) {
      hasLogged.current = true;
    }
  }, [locale]);

  return (
    <>
      <div
        className={`sidebar overflow-hidden fixed w-80 h-full right-0 z-50 top-0 bg-[var(--primary)] backdrop-sepia-50 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between p-3 border-b border-[var(--background)]">
          <button
            className="p-4 text-right text-white"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
          </button>
          <div className="flex">
            {/* <Link href="" className="brand-sidebar" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo-transparant2.png"
                alt="48Prodigy"
                width={50}
                height={50}
              />
            </Link> */}
            <Link
              href="/"
              className="flex items-center ms-2 text-brand md:hidden"
              onClick={() => setIsOpen(false)}
            >
              <div>
                <h3 className="m-0 font-semibold text-2xl ms-3">48Prodigy</h3>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center p-5">
          <p className="text-xl text-gray-400">Menu</p>
          <ButtonTranslate
            currentLocale={currentLocale}
            handleLocaleChange={handleLocaleChange}
          />
        </div>
        <div>
          {navLink.map((link: any, index: number) => (
            <div
              key={index}
              className={`p-4 m-3 text-xl ${
                pathname === `/${locale}${link.href.replace(/\/$/, "")}` ||
                (pathname.startsWith(`/${locale}${link.href}`) &&
                  link.href !== "/")
                  ? "active"
                  : ""
              }`}
            >
              <Link
                href={`/${locale}${link.href}`}
                onClick={() => setIsOpen(false)}
                className="nav-link"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
