/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { ProductSmileCardEn, ProductSmileCardId } from "@/app/productTranslate";
import { getLocale } from "next-intl/server";
import ArrowIcon from "@/icons/ArrowIcon";
import BrosurProduct from "../BrosurProduct";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const locale = await getLocale()

    const ProductCard = locale == 'en' ? ProductSmileCardEn : ProductSmileCardId

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
                <a href={`/${locale}/product`} className="flex gap-1 items-center mb-5"><div style={{ rotate: "180deg" }}><ArrowIcon /></div> {locale == "en" ? "back" : "kembali"}</a>
                <h1 className="mb-5 text-5xl font-semibold">{product.title}</h1>
                <p className="mb-5">{product.desc}</p>
                <p className="mb-5">{product.desc2}</p>

                <h1 className="text-2xl mb-3 font-semibold">{locale == "en" ? "Benefits" : "Manfaat"}</h1>

                <div>
                    {product.benefits.map((benefit: any, index: number) => (
                        <div key={index}>
                            <h3 className="font-semibold">
                                {product.benefits.length > 1 ? `${index + 1}. ` : ""}{benefit.title}
                            </h3>
                            <ul className="mb-5">
                                {benefit.details.map((detail: any, i: number) => (
                                    <li key={i} className="flex gap-4">
                                        <div>
                                            {benefit.details.length > 1 ? <> &#x2022; </> : null}
                                        </div>
                                        <div>{(detail)}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div>
                    {product?.brosur == null ? '' : <h2 className="text-2xl font-semibold mb-4">Brosur</h2>}
                    <div className="flex flex-col md:flex-row gap-4">
                        {product?.brosur?.map((item: any, index: number) => (
                            <div key={index}>
                                <BrosurProduct
                                    title={item?.title}
                                    linkSee={item?.link}
                                    linkDownload={item?.linkDownload}
                                />
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
