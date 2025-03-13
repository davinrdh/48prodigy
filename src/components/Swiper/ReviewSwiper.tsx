'use client'

import StarIcon from '@/icons/StarIcon';
import React, { useEffect, useState } from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { commentEn, commentId } from './comment';
import { useLocale } from 'next-intl';

export default function ReviewSwiper() {
    const [slides, setSlides] = useState(3);
    const locale = useLocale()
    const comment = locale == 'en' ? commentEn : commentId

    useEffect(() => {
        const handleResize = () => {
            setSlides(window.innerWidth < 640 ? 1 : 3);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div>
            <Swiper
                effect={'creative'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={slides}
                creativeEffect={{
                    prev: {
                        translate: [-400, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, -400],
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
                {comment.map((item, index) => (
                    <SwiperSlide key={index} className='mb-20'>
                        <div className="rounded-3xl bg-[#F5FFFD] shadow-2xl">
                            <div className="px-6 py-9 flex justify-center items-center flex-col gap-7 h-72">
                                <div className='flex gap-3'>
                                    {Array(5).fill(0).map((_, iStar) => (
                                        <div key={iStar}>
                                            <StarIcon />
                                        </div>
                                    ))}
                                    <p>{item?.star}</p>
                                </div>
                                <q className='text-[#1C6758] text-center'>{item?.desc}
                                </q>
                                <p className='font-semibold text-xl'>{item?.user}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}