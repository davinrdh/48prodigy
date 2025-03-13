import React from "react";
import ChecklistIcon from "@/icons/ChecklistIcon";
import ArrowIcon from "@/icons/ArrowIcon";
import Image from "next/image";
import PlayIcon from "@/icons/PlayIcon";
import FormLanding from "@/components/Form/FormLanding";
import ReviewSwiper from "@/components/Swiper/ReviewSwiper";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const t = useTranslations("Landing");
  const keys = ["listHero"] as const;

  return (
    <div>
      {/* HERO */}
      <div className="px-5 backgorund md:px-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="pt-20 pb-8">
            <div>
              <p>{t("hero1")}</p>
              <h1 className="leading-[1.5] mb-5 font-semibold text-4xl xl:text-6xl xl:leading-[1.3]">
                {t("hero2")}
              </h1>
              <div className="mb-10">
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
              <Link href="/">
                <button className="btn-primary">
                  Get In Touch <ArrowIcon />
                </button>
              </Link>
            </div>
          </div>
          <div className="flex items-end">
            <Image
              src="/heroLanding.svg"
              alt=""
              width={0}
              height={0}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>

      {/* HERO 2 */}
      <div className="p-7 md:p-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <div>
              {/* Unlock */}
              <div className="mb-20">
                <h1 className="txt-hero-md mb-5">
                  Unlock Special Deals for <br />{" "}
                  <span className="text-[var(--primary)]">Global Living</span>
                </h1>
                <ul className="gap-3 flex flex-col">
                  <li>• &nbsp; Can be customised to your needs and budget</li>
                  <li>• &nbsp; Indonesia, Asia and Worldwide</li>
                  <li>
                    • &nbsp; An Indonesia-based customer service team to assist
                    you
                  </li>
                  <li>
                    • &nbsp; Option to choose different plans for all family
                    members
                  </li>
                </ul>
              </div>

              {/* Recovery */}
              <div>
                <h1 className="txt-hero-md mb-5">
                  A <span className="text-[var(--primary)]">Recovery</span>{" "}
                  Space That Prioritizes <br />
                  Privacy and Comfort
                </h1>

                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-5">
                    <PlayIcon />
                    <p className="p-0 font-semibold text-lg">Private Room</p>
                  </div>
                  <Image src="/privateRoom.svg" alt="" width={520} height={0} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <PlayIcon />
                    <p className="p-0 font-semibold text-lg">Shared Room</p>
                  </div>
                  <Image src="/sharedRoom.svg" alt="" width={520} height={0} />
                </div>
              </div>
            </div>
          </div>
          {/* FORM */}
          <div className="overflow rounded-3xl xl:">
            <div className="max-w overflow-hidden shadow-2xl rounded-3xl">
              <div className="p-10">
                <div className="font-bold text-3xl mb-7">
                  I would like more information about Indoexpat Insurance
                </div>
                <FormLanding />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Swiper */}
      <div className="w-full px-0 md:px-20">
        <h1 className="text-4xl px-6 text-center font-semibold mb-10 md:mb-20">
          What our customers say
        </h1>
        <div>
          <ReviewSwiper />
        </div>
      </div>
    </div>
  );
}
