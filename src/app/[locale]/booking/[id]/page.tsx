import React from "react";
import Image from "next/image";
import { OrderEn, OrderId } from "@/app/productTranslate";
import { getLocale } from "next-intl/server";
import ArrowIcon from "@/icons/ArrowIcon";
import membersData from "@/data/members-cache.json";
import BookingFormExclusive from "@/components/BookingFornExclusive";
import BookingFormJokiKonser from "@/components/BookingFormConcert";
import BookingFormConcert from "@/components/BookingFormConcertJKT48";
import BookingFormExclusiveCart from "@/components/BookingFormExclusiveCart";

// Mapping id produk (sesuai productTranslate.ts) ke jenis form yang ditampilkan
const exclusiveIds: Record<string, "vc" | "twoShot" | "mng"> = {
  "video-call": "vc",
  "2-shot": "twoShot",
  "meet-and-greet": "mng",
};

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const locale = await getLocale();

  const ProductCard = locale == "en" ? OrderEn : OrderId;
  const product = ProductCard.find((p) => p.id === id);

  if (!product) {
    return <p className="mt-20 font-bold text-center">Product not found</p>;
  }

  const exclusiveType = exclusiveIds[id];
  const isConcert = id === "concert-jkt48";
  const isJokiKonser = id === "general-concert";

  return (
    <div className="overflow-hidden">
      <div className="md:px-20 mt-5 px-5">
        <a href={`/${locale}/booking`} className="flex gap-1 items-center mb-5">
          <div style={{ rotate: "180deg" }}>
            <ArrowIcon />
          </div>{" "}
          {locale == "en" ? "Back" : "Kembali"}
        </a>
        <h1 className="mb-5 text-5xl font-semibold">{product.title}</h1>
        <p className="mb-5">{product.desc}</p>

        <div className="">
          {/* {exclusiveType && (
            <BookingFormExclusive type={exclusiveType} members={membersData.data ?? []} />
          )} */}
          {exclusiveType && (
            <BookingFormExclusiveCart
              type={exclusiveType}
              members={membersData.data ?? []}
            />
          )}
          {isConcert && <BookingFormConcert />}
          {isJokiKonser && <BookingFormJokiKonser />}
        </div>
      </div>
    </div>
  );
}
