import React, { useState } from "react";
//import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cube';

import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade, EffectCube, A11y } from 'swiper'
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade, EffectCube]);

export default function HappyMoneySlider() {




    return (

        <>


            <div className="w-full overflow-hidden">

                <Swiper

                    effect="fade"
                    // spaceBetween={1}
                    slidesPerView={1}
                    loop={true}
                    speed={500}
                    autoplay={true}
                    delay={2}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    // navigation
                    // pagination={{ clickable: true }}
                    scrollbar={{ draggable: false }}

                //   onSwiper={(swiper) => console.log(swiper)}
                //   onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                >

                    <SwiperSlide>
                        <img src="/assets/img/header/happy-money.webp" className="mx-auto " alt="banner" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/img/header/happy-money-1.webp" className="mx-auto " alt="banner" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/img/header/happy-money-2.webp" className="mx-auto " alt="banner" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="/assets/img/header/happy-money-3.webp" className="mx-auto " alt="banner" />
                    </SwiperSlide>

                </Swiper>
            </div>

        </>







    )
}
