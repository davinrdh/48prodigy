import FormHome from "@/components/Form/FormHome";
import CardProduct from "@/components/CardProduct";
import ReviewSwiper from "@/components/Swiper/ReviewSwiper";
import ArrowIcon from "@/icons/ArrowIcon";
import ChecklistIcon from "@/icons/ChecklistIcon";
import Image from "next/image";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductSmileCardEn, ProductSmileCardId } from "../productTranslate";

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("Home")
  const ProductCard = locale == 'en' ? ProductSmileCardEn : ProductSmileCardId
  const sliceProducts = ProductCard.slice(0, 3);

  const keys = ['listHero'] as const;


  // console.log(t("Index"))

  return (
    <div>
      <div className="px-5 backgorund md:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="pt-[3.5rem] pb-28">
            <div>
              <div className="mb-5">
                <p className="font-semibold text-2xl">indoexpatinsurance</p>
                <p>{t("insurance")}</p>
              </div>
              <h1 className="leading-[1.5] mb-5 font-semibold text-4xl xl:text-6xl xl:leading-[1.3]">
                {t("hero1")}
              </h1>
              {keys.map((key) => (
                <div key={key} className="flex items-center gap-3 mb-3">
                  <ChecklistIcon />
                  <p>{t(`${key}.desc1`)}</p>
                </div>
              ))}
              {keys.map((key) => (
                <div key={key} className="flex items-center gap-3 mb-3">
                  <ChecklistIcon />
                  <p>{t(`${key}.desc2`)}</p>
                </div>
              ))}
              {keys.map((key) => (
                <div key={key} className="flex items-center gap-3 mb-3">
                  <ChecklistIcon />
                  <p>{t(`${key}.desc3`)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-end justify-end">
            <Image
              src="/hero2.svg"
              alt=""
              width={530}
              height={0}
              // style={{ width: '100%' }}
              className=" -mt-28 md:mt-0"
            />
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="w-full px-5 md:px-20">
        <FormHome />
      </div>

      <div className="w-full mt-28 px-5 md:px-20 md:mt-10">
        {/* PRODUCT */}
        <div className="mb-24">
          <div className="mb-10">
            <h1 className="font-semibold text-3xl mb-3">
              {t("hero2")}
            </h1>
            <a href={`/${locale}/product`} className="font-semibold text-xl text-[var(--primary)] flex items-center gap-1">
              {t("btnMore")} <ArrowIcon />
            </a>
          </div>
          <div className="flex justify-center flex-wrap gap-7">
            {sliceProducts.map((item, i) => (
              <div key={i} className="max-w-sm" >
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

        {/* COMMENTS */}
        <h1 className="text-4xl px-6 text-center font-semibold mb-10 md:mb-20">
          {locale == 'en' ? 'What our customers say' : 'Apa kata mereka'}
        </h1>
        <div>
          <ReviewSwiper />
        </div>
      </div>
    </div>
  );
}
