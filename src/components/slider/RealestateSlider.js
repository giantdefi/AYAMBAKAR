import React, { useState } from "react";
//import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "swiper/css/effect-flip";

import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade, EffectFlip, A11y } from 'swiper'
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade, EffectFlip]);

export default function RealestateSlider() {




    return (

        <>

            <section className="bg-gray-100 mb-4" >
                <div className="container mx-auto">

                    <div className="w-full">

                        <Swiper
                            //  effect="fade"
                            // spaceBetween={1}
                            slidesPerView={1}
                            loop={true}
                            speed={1000}
                            autoplay={true}
                            delay={2}
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            // navigation
                            pagination={{ clickable: true }}
                            scrollbar={{ draggable: true }}
                        //   onSwiper={(swiper) => console.log(swiper)}
                        //   onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                        >

                            <SwiperSlide>
                                <img src="/assets/img/slider/estate-1.webp" alt="banner" className=' mx-auto' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/assets/img/slider/otomotive-1.webp" alt="banner" className=' mx-auto' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/assets/img/slider/otomotive-2.webp" alt="banner" className=' mx-auto' />
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
            </section>
        </>







    )
}
