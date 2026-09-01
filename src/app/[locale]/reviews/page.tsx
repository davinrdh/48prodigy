// app/[locale]/testimoni/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TweetEmbed from "@/components/TweetEmbed";
import { testimonials } from "@/data/testimonials";
import { useLocale } from "next-intl";

export default function TestimoniPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const [perPage, setPerPage] = useState(10);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    function updatePerPage() {
      const width = window.innerWidth;
      const newPerPage = width < 768 ? 10 : width < 1024 ? 20 : 21;
      setPerPage((prev) => (prev !== newPerPage ? newPerPage : prev));
    }

    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const reversedTestimonials = useMemo(() => [...testimonials].reverse(), []);

  const totalPages = Math.ceil(reversedTestimonials.length / perPage);

  const displayedTestimonials = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return reversedTestimonials.slice(start, start + perPage);
  }, [reversedTestimonials, currentPage, perPage]);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
    router.refresh(); // paksa Next.js re-fetch/re-render segment ini
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getPageNumbers(): (number | "...")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [1];

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  }

  if (!isMounted) {
    return null;
  }

  return (
    <div className="px-5 md:px-20 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-3">
          {locale === "en" ? "What They Say" : "Apa Kata Mereka"}
        </h1>
        <p className="text-white/60 max-w-lg mx-auto">
          {locale === "en"
            ? "Real reviews from our customers on X/Twitter"
            : "Ulasan asli dari pelanggan kami di X/Twitter"}
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto">
        {displayedTestimonials.map((testimonial) => (
          <TweetEmbed key={`${testimonial.id}-${currentPage}`} tweetUrl={testimonial.tweetUrl} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          <button
            type="button"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-black/20 hover:bg-black/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ‹
          </button>

          {getPageNumbers().map((page, index) =>
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-2 text-white/40 text-sm">
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-red-600 text-white"
                    : "bg-black/20 hover:bg-black/30 text-white/80"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-black/20 hover:bg-black/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}