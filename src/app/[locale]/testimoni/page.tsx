/* eslint-disable react-hooks/rules-of-hooks */
import { useTranslations } from 'next-intl'
import React from 'react'
import AgentContact from './AgentContact'

export default function page() {
  const t = useTranslations("Contact")
  return (
    <div>
      <div className='text-center'>
        <div className='mt-14'>
          <h1 className='text-3xl md:text-5xl font-semibold mb-5'>{t("hero1")}</h1>
        </div>
      </div>

      <div className='mx-5 mt-20 md:px-20'>
        <div>
          <h3 className='mb-3 uppercase'>{t("hero1")}</h3>
          <h1 className='text-5xl font-semibold mb-7'>{t("hero2")}</h1>
          <p>{t("heroDesc2")}</p>
        </div>
        <div>
          <AgentContact />
        </div>
      </div>
    </div>
  )
}