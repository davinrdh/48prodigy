"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface ICardProduct {
  img: any;
  nameProduct: any;
  descProduct: any;
  linkProduct: any;
  isOpen: boolean;
}

export default function CardProduct({
  img,
  nameProduct,
  descProduct,
  linkProduct,
  isOpen,
}: ICardProduct) {
  const params = useParams();
  const locale = params?.locale;
  return (
    <div>
      <div className="bg-[var(--primary)] rounded-3xl shadow-sm overflow-hidden">
        <div
          className="overflow-hidden"
          style={{ borderBottomRightRadius: "7.5rem" }}
        >
          <Link href={`/${locale}/product/${linkProduct}`}>
            <Image
              src={img}
              className="rounded-t-lg hover:scale-[1.05] transition-all ease-in-out"
              width={500}
              height={0}
              alt=""
              style={{ borderBottomRightRadius: "7.5rem" }}
            />
          </Link>
        </div>
        <div className="p-5">
          <a href="#">
            <h1 className="font-semibold text-2xl mb-3">{nameProduct}</h1>
          </a>
          <p
            className="mb-10 font-normal text-gray-700 dark:text-gray-400"
            style={{ height: "7rem" }}
          >
            {descProduct.length > 155
              ? descProduct.substring(0, 155) + "..."
              : descProduct}
          </p>

          {isOpen ? (
            <Link
              href={`/${locale}/booking/${linkProduct}`}
              className="btn-primary"
            >
              {locale == "en" ? "Booking Now" : "Pesan Sekarang"}
            </Link>
          ) : (
            <button disabled className="btn-muted">
              {locale == "en" ? "Cooming Soon" : "Segera hadir"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
