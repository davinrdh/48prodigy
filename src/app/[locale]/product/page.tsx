"use client";
// import Link from 'next/link'
import React from "react";
import CardProduct from "@/components/CardProduct";
// import { ProductSmile } from "../../product";
import { ProductSmileCardEn, ProductSmileCardId } from "@/app/productTranslate";
import { useLocale } from "next-intl";

export default function Product() {
  const locale = useLocale()
  const ProductCard = locale == 'en' ? ProductSmileCardEn : ProductSmileCardId

  return (
    <div>
      <div className="text-center py-[5rem] backgorund2">
        <div className="mt-16 md:mt-36">
          <h1 className="text-5xl md:text-7xl font-semibold mb-7">{locale == 'en' ? "Products" : "Produk"}</h1>
          {/* <p className="px-5 md:px-[15rem]">
            Kami siap membantu Anda! Jika Anda memiliki pertanyaan mengenai
            produk asuransi kami, ingin berkonsultasi mengenai perlindungan yang
            sesuai, atau membutuhkan informasi lebih lanjut, jangan ragu untuk
            menghubungi kami.
          </p> */}
        </div>
      </div>
      <div className="px-5 md:px-20 mt-20">
        <div className="flex justify-center flex-wrap gap-7">
          {ProductCard.map((item, i) => (
            <div key={i} className="max-w-sm">
              <CardProduct
                descProduct={item.desc}
                img={item.img}
                linkProduct={item.id}
                nameProduct={item.title}
              />
            </div>
          ))}
        </div>
      </div>

      <ul>
        {/* {ProductSmile.map((item) => (
                    <li key={item.id}>
                        <Link href={`/product/${item?.id}`}>{item?.title}</Link>
                    </li>
                ))} */}
      </ul>
    </div>
  );
}
