import ReviewSwiper from "@/components/Swiper/ReviewSwiper";
import ChecklistIcon from "@/icons/ChecklistIcon";
import Image from "next/image";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { BookingEn, BookingId } from "../productTranslate";
import Link from "next/link";

const SPIN_DURATION = 2;
const GAP_BETWEEN_BOX = 1;

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("Home");
  const BookingCard = locale == "en" ? BookingEn : BookingId;

  const keys = ["listHero"] as const;

  // console.log(t("Index"))

  return (
    <div>
      <div className="px-5 backgorund md:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="pt-[2.75rem] pb-28">
            <div>
              <div className="mb-5"></div>
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
            <div className="mt-5">
              <Link href={`/${locale}/booking`}>
                <button
                  type="button"
                  className="bg-[var(--secondary)] p-5 rounded-2xl font-bold w-full md:w-fit"
                >
                  <div>{locale == "en" ? "BOOKING NOW" : "PESAN SEKARANG"}</div>
                </button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Image
              src="/hero.png"
              alt=""
              width={530}
              height={0}
              // style={{ width: '100%' }}
              className="-mt-24 md:mt-0 md:flex"
            />
          </div>
        </div>
      </div>

      {/* FORM */}
      {/* <div className="w-full px-5 md:px-20">
        <FormHome />
      </div> */}

      <div className="w-full mt-28 px-5 md:px-20 md:mt-10">
        {/* PRODUCT */}
        <div className="mb-24">
          <div className="mb-10">
            <h1 className="font-semibold text-3xl mb-3">{t("hero2")}</h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {BookingCard.map((item, i) => (
              <div key={i} className="max-w-sm flex">
                <div className="relative rounded-3xl p-[3px] overflow-hidden w-full flex flex-col">
                  <div
                    className="beam-border"
                    style={{
                      animationDuration: `${SPIN_DURATION}s`,
                      animationDelay: `${i * GAP_BETWEEN_BOX}s`,
                    }}
                  />
                  <div className="relative bg-[var(--primary)] rounded-[calc(1.5rem-1px)] shadow-sm overflow-hidden p-6 h-[285px] flex flex-col justify-between w-full">
                    <div className="h-1/2">
                      <h1 className="font-semibold text-2xl mb-3 leading-tight text-center">
                        {i + 1}
                      </h1>
                      <h3 className="font-semibold text-2xl mb-3 text-center">
                        {item.title}
                      </h3>
                    </div>
                    <div className="h-1/2">
                      <p className="font-normal text-justify text-gray-700 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMMENTS */}
        <h1 className="text-4xl px-6 text-center font-semibold mb-10 md:mb-20">
          {locale == "en" ? "What our customers say" : "Apa kata mereka"}
        </h1>
        <div>
          <ReviewSwiper />
        </div>
      </div>
    </div>
  );
}
