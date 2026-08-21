/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { OrderEn, OrderId } from "@/app/productTranslate";
import { getLocale } from "next-intl/server";
import ArrowIcon from "@/icons/ArrowIcon";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const locale = await getLocale()

    const ProductCard = locale == 'en' ? OrderEn : OrderId

    const product = ProductCard.find((p) => p.id === id);

    if (!product) {
        return <p className="mt-20 font-bold text-center">Product not found</p>;
    }

    return (
        <div className="overflow-hidden">
            <Image
                src={product.detail_img}
                alt={product.title}
                width={10000}
                height={1000}
                className="md:-mt-28 text-center md:scale-[1] scale-[2]"
            />
            <div className="md:px-20 mt-10 px-5">
                <a href={`/${locale}/booking`} className="flex gap-1 items-center mb-5"><div style={{ rotate: "180deg" }}><ArrowIcon /></div> {locale == "en" ? "Back" : "Kembali"}</a>
                <h1 className="mb-5 text-5xl font-semibold">{product.title}</h1>
                <p className="mb-5">{product.desc}</p>

                <h1 className="text-2xl mb-3 font-semibold">{locale == "en" ? "Benefits" : "Manfaat"}</h1>
            </div>
        </div>
    );
}
