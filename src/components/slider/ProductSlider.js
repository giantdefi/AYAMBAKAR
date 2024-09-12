import React, { useState } from "react";
//import Link from 'next/link'
import SliderProducts from 'components/json/SliderProducts'
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
            {/* <h2 className="text-3xl font-bold text-center text-red-700 mb-4">Produk spesial  Kami</h2> */}
           

            <div className="w-full">

                    <Swiper
                        // effect="fade"
                        spaceBetween={10}
                        slidesPerView={2}
                        loop={true}
                        speed={1000}
                        autoplay={true}
                        centeredSlides={true}
                        delay={2}
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        // navigation
                    //    pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                    //   onSwiper={(swiper) => console.log(swiper)}
                    //   onSlideChange={(swiper) => console.log(swiper.activeIndex)}
                    >

                        {SliderProducts && SliderProducts.map((item,index)=>{
                          return (<SwiperSlide key={index}>
                        
                                <div className="border-2  rounded-lg shadow-lg overflow-hidden text-gray-700" >
                                <img src={item.img} alt="produk" className="w-full h-32 lg:h-[400px] object-cover"/>
                                <div className="p-4 absolute top-0 left-0 w-full h-32 lg:h-[400px] bg-gray-900/20">
                                    <h3 className="text-xl bold mb-2 text-white">{item.title}</h3>
                                    <p className="text-lg bold  text-yellow-200 font-Poppins line-through"><small>Rp.</small> {item.price1}</p>
                                    <p className="text-lg bold  text-white font-Poppins"><small>Rp.</small>{item.price2}</p>
                                </div>
                                </div>
                                </SwiperSlide> )
                           
                        })}


                    </Swiper>

                   
                    </div>
               

              
              

              
              

               
                

               
                
            {/* </div> */}
        </div>
    </section>


          
        </>







    )
}
