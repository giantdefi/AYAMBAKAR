import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
import LEftSidebar from "layout/LEftSidebar"
import RightSidebar from "layout/RightSidebar"
import dynamic from 'next/dynamic'
const RealestateSlider = dynamic(() => import("components/slider/RealestateSlider"), {
  ssr: false,
})
const ProductSlider = dynamic(() => import("components/slider/ProductSlider"), {
  ssr: false,
})
const GeoMapMarkers = dynamic(() => import("components/map/GeoMapMarkers"), {
  ssr: false,
})
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'
import {setToggleLogin } from 'redux/reducers/AuthReducer'
import { setRightSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------


export default function Home() {

  const { domain, title, desc, crypto } = useSelector((state) => state.GeneralReducer)
  const { isLogin, phone, email, toggleLogin, wallet } = useSelector((state) => state.AuthReducer)
  const router = useRouter()
  const dispatch = useDispatch()


//   useEffect(() => {
  
//     dispatch(setMainMenuItem(1))
 
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const handleToggle = () => {
//     dispatch(setToggleLogin(false))
// }

const handleToggle = () => {
  // if(toggleLogin){
  //     dispatch(setModalLogin(true))
  //     dispatch(setToggleLogin(false))
  // }else{
  //     dispatch(setModalRegister(true))
  //     dispatch(setToggleLogin(true))
  // }

  if(rightSidebar){
      dispatch(setRightSidebar(false))
  }else{
      dispatch(setRightSidebar(true))
  }
 
  
}

return (
  <>



    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>

    
{/* bg-[#ffd4d5] */}
    <section className="min-h-screen pb-5 dark:text-white animated fadeIn mt-[0px]">
 
      <div className="w-full  mx-auto text-white">

 <section className="bg-cover bg-center text-white py-4  bg-[url('/assets/img/bg/burner.webp')]" >
        <div className="container mx-auto text-center h-[300px]">
            <h1 className="text-2xl md:text-5xl font-bold font-rocksalt">SATE & AYAM BAKAR </h1>
            <h1 className="text-6xl md:text-7xl font-bold mt-4 font-DayOne">PATRIOT</h1>
            <h1 className="text-2xl md:text-7xl font-bold mt-4 ">Stadion Patriot Bekasi Selatan</h1>
            <p className="mt-4 text-xl md:text-2xl ">Join thousands of satisfied investors who trust us for safe, transparent, and profitable gold trading.</p>
           {/*  <a href="#start" className="mt-8 inline-block bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold ">Start Join Now</a> */}
        </div>
    </section>

    <ProductSlider/>

    <section className="py-20 bg-white px-2">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-700">Our Satay Products</h2>
            <div className="mt-8 grid lg:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                    <img src="/assets/img/products/p-1.webp" alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE AYAM</h3>
                        <p className="text-sm text-gray-700 mb-4">Tender chicken skewers marinated in rich spices.</p>
                        <p className="text-lg font-bold text-red-700">$12.99</p>
                    </div>
                </div>

              
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                    <img src="/assets/img/products/p-2.webp" alt="Beef Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KULIT</h3>
                        <p className="text-sm text-gray-700 mb-4">Sate kulit ayam yang lezat, bergizi dan berprotein tinggi.</p>
                        <p className="text-lg font-bold text-red-700">Rp. 15.000</p>
                    </div>
                </div>

              
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                <img src="/assets/img/products/p-1.webp" alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">SATE KAMBING</h3>
                        <p className="text-sm text-gray-700 mb-4">Succulent lamb skewers marinated in aromatic spices.</p>
                        <p className="text-lg font-bold text-red-700">$16.99</p>
                    </div>
                </div>

               
                <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700">
                <img src="/assets/img/products/p-2.webp" alt="Beef Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2">Tofu Satay</h3>
                        <p className="text-sm text-gray-700 mb-4">Grilled tofu skewers with a spicy peanut sauce.</p>
                        <p className="text-lg font-bold text-red-700">$10.99</p>
                    </div>
                </div>

               
                
            </div>
        </div>
    </section>


      </div>

   <GeoMapMarkers/> 

    </section>

  </>
)
}



