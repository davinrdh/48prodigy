/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface btnIntl{
    currentLocale : any,
    handleLocaleChange : any
}

export default function ButtonTranslate({currentLocale, handleLocaleChange} : btnIntl) {
    return (
        <div>
            <div className="flex gap-2 text-sm text-center text-white">
                <button
                    className={`cursor-pointer font-light ${currentLocale === "en" ? "text-[var(--secondary)] font-medium" : "text-slate-300"
                        }`}
                    onClick={() => handleLocaleChange("en")}
                >
                    [EN]
                </button>
                |
                <button
                    className={`cursor-pointer font-light ${currentLocale === "id" ? "text-[var(--secondary)] font-medium" : "text-slate-300"
                        }`}
                    onClick={() => handleLocaleChange("id")}
                >
                    [ID]
                </button>
            </div>
        </div>
    )
}
