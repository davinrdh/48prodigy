import CardProduct from "@/components/CardProduct";
import { OrderEn, OrderId } from "@/app/productTranslate";
import { getLocale } from "next-intl/server";
import { getBookingStatus } from "@/lib/getBookingStatus";

export default async function Product() {
  const locale = await getLocale();
  const ProductCard = locale === "en" ? OrderEn : OrderId;

  const productsWithStatus = await Promise.all(
    ProductCard.map(async (item) => ({
      ...item,
      isOpen: await getBookingStatus(item.id),
    })),
  );

  return (
    <div>
      <div className="text-center">
        <div className="mt-14">
          <h1 className="text-3xl md:text-5xl font-semibold mb-5">
            {locale === "en" ? "CHOOSE A SERVICE" : "PILIH LAYANAN JOKI"}
          </h1>
        </div>
      </div>
      <div className="px-5 md:px-20 mt-20">
        <div className="flex justify-center items-center flex-wrap gap-7 w-full max-w-7xl mx-auto px-4">
          {productsWithStatus.map((item, i) => (
            <div
              key={i}
              className="w-full md:w-[calc(50%-14px)] lg:w-[calc(33.333%-18.6px)] max-w-sm flex justify-center"
            >
              <CardProduct
                descProduct={item.desc}
                img={item.img}
                linkProduct={item.id}
                nameProduct={item.title}
                isOpen={item.isOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
