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

export default function Mainslider() {




  return (

    <>


      <div className="w-full animated zoomIn overflow-hidden">

        <Swiper
          effect="cube"
          // spaceBetween={1}
          slidesPerView={1}
          loop={true}
          speed={5000}
          autoplay={true}
          // delay={2}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // navigation
          // pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        //   onSwiper={(swiper) => console.log(swiper)}
        //   onSlideChange={(swiper) => console.log(swiper.activeIndex)}
        >

          <SwiperSlide>
            <img src="/assets/img/slider/mainslider-1.webp" alt="banner" className=' mx-auto' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/img/slider/mainslider-2.webp" alt="banner" className=' mx-auto' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/img/slider/mainslider-3.webp" alt="banner" className=' mx-auto' />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/assets/img/slider/mainslider-4.webp" alt="banner" className=' mx-auto' />
          </SwiperSlide>

        </Swiper>
      </div>

    </>







  )
}
