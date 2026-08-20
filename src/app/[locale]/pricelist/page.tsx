import CardMember from "./CardMember";
import SearchBar from "./SearchBar";
import { SearchProvider } from "@/context/SearchContext";

export default function Page() {
  return (
    <SearchProvider>
      <div className="flex flex-col text-center p-5 gap-5 md:flex-row md:justify-between md:items-center md:px-20 md:pt-10">
        <h1 className="text-3xl md:text-3xl font-semibold">Daftar Harga</h1>
        <div className="w-full md:w-80">
          <SearchBar />
        </div>
      </div>

      <div className="mx-5 md:mt-8 md:px-20">
        <CardMember />
      </div>
    </SearchProvider>
  );
}