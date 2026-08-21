// "use client";
// import Link from 'next/link'
import React from "react";
import CardProduct from "@/components/CardProduct";
// import { ProductSmile } from "../../product";
import { OrderEn, OrderId } from "@/app/productTranslate";
import { useLocale } from "next-intl";

export default function Product() {
  const locale = useLocale()
  const ProductCard = locale == 'en' ? OrderEn : OrderId

  return (
    <div>
      <div className="text-center">
        <div className="mt-14">
          <h1 className="text-3xl md:text-5xl font-semibold mb-5">{locale == 'en' ? "CHOOSE A SERVICE" : "PILIH LAYANAN JOKI"}</h1>
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
