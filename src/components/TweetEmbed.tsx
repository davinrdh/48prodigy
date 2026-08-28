// components/TweetEmbed.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  tweetUrl: string;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => Promise<unknown>;
      };
    };
  }
}

export default function TweetEmbed({ tweetUrl }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    function renderTweet() {
      if (!window.twttr || !containerRef.current) return;

      // widgets.load() mengembalikan Promise — resolve HANYA setelah widget benar-benar selesai di-render jadi iframe
      window.twttr.widgets.load(containerRef.current).then(() => {
        if (isMounted) setLoaded(true);
      });
    }

    if (window.twttr) {
      renderTweet();
    } else {
      const existingScript = document.getElementById("twitter-wjs");
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "twitter-wjs";
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = renderTweet;
        document.body.appendChild(script);
      } else {
        existingScript.addEventListener("load", renderTweet);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden mb-3 ">
      {/* Widget SELALU dirender ke DOM (supaya twttr bisa proses), tapi disembunyikan visual sampai benar-benar loaded */}
      <div className={loaded ? "flex flex-col" : "hidden"}>
        <div className="relative h-[380px] md:w-[] overflow-hidden">
          <div
            ref={containerRef}
            className="h-full flex items-start justify-center"
          >
            <blockquote
              className="twitter-tweet"
              data-theme="dark"
              data-conversation="none"
            >
              <a href={tweetUrl}></a>
            </blockquote>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>

        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 left-3 right-3 lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:w-auto bg-[var(--secondary)] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-black/80 transition-colors text-center"
        >
          Baca selengkapnya di X
        </a>
      </div>

      {!loaded && (
        <div className="absolute inset-0 h-[380px] bg-[var(--primary)] flex flex-col items-center justify-center gap-2 rounded-2xl">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <p className="text-sm text-white/70">Memuat tweet...</p>
        </div>
      )}
    </div>
  );
}
