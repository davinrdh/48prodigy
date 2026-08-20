/* eslint-disable react-hooks/rules-of-hooks */
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function page() {
  const t = useTranslations("AboutUs")
  const locale = useLocale()
  return (
    <div>
      <Image
        src="/building.jpeg"
        alt="building"
        width="3000"
        height="0"
        className="md:-mt-28 -mt-11"
      />
      <div className="md:mt-16 mt-10">
        <div className="md:mx-32 mx-5">
          <h1 className="text-[var(--primary)] font-semibold text-2xl xl:text-4xl xl:leading-[1.3] ">
            IndoExpats Insurance
          </h1>
          <p className="text-xs mb-5">
            by msiglifeindonesia
          </p>
          <h2 className="text-xl mb-3">{locale === 'en' ? 'Company profile' : 'Profil Perusahaan'}</h2>
          <p>
            {t("desc1")}
            <br />
            <br />
            {t("desc2")}
            <br />
            <br />
            {t("desc3")}
          </p>
          <br />
          <div>
            <h2 className="md:text-lg font-semibold">{locale == 'en' ? 'VISION' : 'VISI'}</h2>
            <p>
              {t('visi')}
            </p>
          </div>
          <br />
          <div>
            <h2 className="md:text-lg font-semibold">{locale == 'en' ? 'MISSION' : 'MISI'}</h2>
            <p>
              {t('misi')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
