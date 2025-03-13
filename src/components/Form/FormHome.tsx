/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "../Loading";

const typeOfCover = [
  "Health insurance",
  "Life Insurance",
  "Retirement plan",
  "Kids education",
];

const healthInsurance: { [key: string]: string[] } = {
  "Health insurance": ["Smile Medica Ultimax"],
  "Retirement plan": ["Smile Optima Flexilink", "Smile Pro Infinite"],
  "Kids education": ["Smile Kid Insurance"]
};

const lifeInsurance = [
  "Smile Ultima Term Life",
];

export default function FormHome() {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCover, setSelectedCover] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  // Fungsi untuk mengubah nama produk menjadi URL slug
  const generateSlug = (name: any) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);
    if (selectedProduct) {
      const productSlug = generateSlug(selectedProduct);
      router.push(`/${locale}/product/${productSlug}`);
    }
  };

  return (
    <div className="relative z-0 md:-mt-[6rem] mt-10">
      <p className="text-xl mb-5 font-semibold md:text-white">
        {locale === "en"
          ? "Find the right insurance for you:"
          : "Temukan asuransi yang tepat untuk anda"}
      </p>
      <div className="max-w overflow-hidden shadow-2xl rounded-3xl bg-white">
        <div className="rounded-3xl shadow-2xl">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row justify-between items-center px-10 py-5 gap-5">
                
              {/* TYPE OF COVER */}
              <div className="w-full">
                <select
                  className="mt-1 p-3 w-full border rounded-xl cursor-pointer"
                  defaultValue=""
                  name="TypeofCover"
                  required
                  onChange={(e) => {
                    setSelectedCover(e.target.value);
                    setSelectedProduct(""); // Reset pilihan produk saat type berubah
                  }}
                >
                  <option value="" className="text-gray-600" disabled>
                    Type of cover
                  </option>
                  {typeOfCover.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* HEALTH INSURANCE */}
              <div className="w-full">
                <select
                  className={`mt-1 p-3 w-full border rounded-xl ${
                    selectedCover !== "Life Insurance" && selectedCover !== "" && "cursor-pointer"
                  }`}
                  defaultValue=""
                  value={selectedProduct}
                  name="HealthInsurance"
                  required
                  disabled={selectedCover === "Life Insurance" || selectedCover === ""}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="" className="text-gray-600" disabled>
                    Health Insurance
                  </option>
                  {healthInsurance[selectedCover]?.map((item: any, index:number) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* LIFE INSURANCE */}
              <div className="w-full">
                <select
                  className={`mt-1 p-3 w-full border rounded-xl ${
                    selectedCover === "Life Insurance" && "cursor-pointer"
                  }`}
                  defaultValue=""
                  name="LifeInsurance"
                  required
                  disabled={selectedCover !== "Life Insurance"}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="" className="text-gray-600" disabled>
                    Life Insurance
                  </option>
                  {lifeInsurance.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className={`btn-primary text-white w-full flex justify-center font-semibold h-fit ${
                  selectedProduct === "" && "background-muted"
                }`}
                disabled={!selectedProduct}
              >
                {isLoading === true ? (
                  <div className="my-2">
                    <Loading />
                  </div>
                ) : (
                  `${locale === "en" ? "Find a plan" : "Telusuri"}`
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
