"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "@/data/testimonials";
import TweetEmbed from "@/components/TweetEmbed";

const MAX_SWIPER_ITEMS = 6; // batasi jumlah yang ditampilkan di swiper, supaya tidak berat

export default function ReviewSwiper() {
  const [slides, setSlides] = useState(3);

  // Terbaru (ditambahkan paling akhir di data) tampil duluan
  const displayedTestimonials = [...testimonials]
    .reverse()
    .slice(0, MAX_SWIPER_ITEMS);

  useEffect(() => {
    const handleResize = () => {
      setSlides(window.innerWidth < 640 ? 1 : 3);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // ← ini jalan SETELAH render pertama
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Swiper
        effect={"creative"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slides}
        creativeEffect={{
          prev: {
            translate: [-400, 0, -400],
          },
          next: {
            translate: ["100%", 0, -400],
          },
        }}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[EffectCreative, Pagination, Autoplay]}
        className="mySwiper"
      >
        {displayedTestimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="mb-20">
            <TweetEmbed
              key={`${testimonial.id}-${slides}`}
              tweetUrl={testimonial.tweetUrl}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
