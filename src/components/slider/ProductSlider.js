import React, { useState } from "react";
//import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import SwiperCore, { Navigation, Pagination, Autoplay, Scrollbar, EffectFade, A11y } from 'swiper'
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

export default function Mainslider() {




    return (

        <>

<section className="py-8 bg-white px-2">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Produk spesial  Kami</h2>
            {/* <div className="mt-8 grid lg:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}

            <div className="w-full">

                    <Swiper
                        // effect="fade"
                        spaceBetween={10}
                        slidesPerView={2}
                        loop={true}
                        speed={1000}
                        autoplay={true}
                        delay={2}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        // navigation
                    //    pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    //   onSwiper={(swiper) => console.log(swiper)}
                    //   onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                    >

                        <SwiperSlide>
                        <div className="border-4 rounded-lg shadow-lg overflow-hidden text-gray-700">
                    <img src="/assets/img/products/p-1.webp" alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE AYAM</h3>
                        <p className="text-sm text-gray-700 mb-4">Tender chicken skewers marinated in rich spices.</p>
                        {/* <p className="text-lg font-bold text-red-700">$12.99</p> */}
                    </div>
                </div>

                        </SwiperSlide>
                        <SwiperSlide>
                        <div className="border-4 rounded-lg shadow-lg overflow-hidden text-gray-700">
                    <img src="/assets/img/products/p-2.webp" alt="Beef Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KAMBING</h3>
                        <p className="text-sm text-gray-700 mb-4">Sate kulit ayam yang lezat dan berporotein.</p>
                        {/* <p className="text-lg font-bold text-red-700">Rp. 15.000</p> */}
                    </div>
                </div>

                        </SwiperSlide>

                        <SwiperSlide>
                        <div className="border-4 rounded-lg shadow-lg overflow-hidden text-gray-700">
                <img src="/assets/img/products/p-1.webp" alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KULIT</h3>
                        <p className="text-sm text-gray-700 mb-4">Succulent lamb skewers marinated in a.</p>
                        {/* <p className="text-lg font-bold text-red-700">$16.99</p> */}
                    </div>
                </div>
                        </SwiperSlide>

                        <SwiperSlide>
                        <div className="border-4 rounded-lg shadow-lg overflow-hidden text-gray-700">
                <img src="/assets/img/products/p-2.webp" alt="Beef Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KAMBING</h3>
                        <p className="text-sm text-gray-700 mb-4">Grilled tofu skewers with a spicy peanut sauce.</p>
                        {/* <p className="text-lg font-bold text-red-700">$10.99</p> */}
                    </div>
                </div>

                        </SwiperSlide>

                    </Swiper>
                    </div>
               

              
              

              
              

               
                

               
                
            {/* </div> */}
        </div>
    </section>


          
        </>







    )
}
