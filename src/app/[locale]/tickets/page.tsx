import SearchBar from "@/components/SearchBar";
import CardMember from "./CardMember";
import { SearchProvider } from "@/context/SearchContext";
import TeamFilter from "@/components/TeamFilter";
import CategoryTabs from "@/components/CategoryTab";

export default function Page() {
  return (
    <SearchProvider>
      <div className="mx-5 md:mx-0 md:px-20 md:pt-10 space-y-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 className="text-center md:text-start mt-5 md:mt-0 text-xl md:text-3xl font-semibold">
            DAFTAR HARGA
          </h1>
          <div className="w-full md:w-80">
            <SearchBar />
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-3">
            <TeamFilter />
            <CategoryTabs />
          </div>
        </div>
      </div>
      <div className="mx-5 mt-8 md:px-20">
        <CardMember />
      </div>
    </SearchProvider>
  );
}
