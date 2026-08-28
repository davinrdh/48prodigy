import { useLocale } from "next-intl";

export default function Page() {
  const locale = useLocale();
  return (
    <div>
      <div className="p-10 text-center h-screen flex flex-col justify-center items-center">
        <p className="text-2xl font-bold mb-2">
          🚧 {locale === "en" ? "Under Maintenance" : "Dalam Perbaikan"}
        </p>
        <p className="text-white/60 text-sm">
          {locale === "en"
            ? "This page is still under maintenance. Please check back later."
            : "Laman ini masih dalam perbaikan. Silakan kembali lagi nanti."}
        </p>
      </div>
    </div>
    // <SearchProvider>
    //   <div className="mx-5 md:mx-0 md:px-20 md:pt-10 space-y-4">
    //     <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    //       <h1 className="text-center md:text-start mt-5 md:mt-0 text-xl md:text-3xl font-semibold">
    //         DAFTAR HARGA
    //       </h1>
    //       <div className="w-full md:w-80">
    //         <SearchBar />
    //       </div>
    //     </div>
    //     <div>
    //       <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-3">
    //         <TeamFilter />
    //         <CategoryTabs />
    //       </div>
    //     </div>
    //   </div>
    //   <div className="mx-5 mt-8 md:px-20">
    //     <CardMember />
    //   </div>
    // </SearchProvider>
  );
}
