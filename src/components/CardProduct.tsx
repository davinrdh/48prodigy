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
}

export default function CardProduct({
  img,
  nameProduct,
  descProduct,
  linkProduct,
}: ICardProduct) {
  const params = useParams();
  const locale = params?.locale;
  return (
    <div>
      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
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

          <Link
            href={`/${locale}/product/${linkProduct}`}
            className="block px-5 py-3 w-full text-sm font-medium text-center text-white bg-[var(--primary)] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-current"
          >
            {locale == "en" ? "Read More" : "Baca Lebih Lanjut"}
          </Link>
        </div>
      </div>
    </div>
  );
}
