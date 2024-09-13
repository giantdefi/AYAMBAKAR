import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'
import ProductPricing from "components/ProductPricing"
import dynamic from 'next/dynamic'
const RealestateSlider = dynamic(() => import("components/slider/RealestateSlider"), {
  ssr: false,
})
const ProductSlider = dynamic(() => import("components/slider/ProductSlider"), {
  ssr: false,
})
// const GeoMapMarkers = dynamic(() => import("components/map/GeoMapMarkers"), {
//   ssr: false,
// })
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
    <section className="min-h-screen pb-5 dark:text-white animated fadeIn mt-[90px]">
 
      <div className="w-full  mx-auto text-white">

 <section className="bg-cover bg-center text-white py-4  bg-[url('/assets/img/bg/burner.webp')]" >
        <div className="container mx-auto text-center h-[300px]">
            <h1 className="text-2xl md:text-5xl font-bold font-rocksalt mt-4">SATE & AYAM BAKAR </h1>
            <h1 className="text-6xl md:text-7xl font-bold mt-4 font-DayOne">PATRIOT</h1>
            <h1 className="text-2xl md:text-7xl font-bold mt-4 ">Stadion Patriot Bekasi Selatan</h1>
            <p className="mt-4 text-xl md:text-2xl bold ">Sate Ayam, Sate Kambing, Ayam Bakar, Ayam Goreng, pecel Lele.</p>
           
          
        </div>
    </section>

    {/* <section className="bg-cover bg-center text-white py-4  bg-[url('/assets/img/bg/burner.webp')]" >
            <img src="/assets/img/kedai.jpg" alt="kedai" className="bg-white"/>
    </section> */}

    <p className="text-gray-800 bold mt-10 ml-20">Tersedia di :</p>
  
    <div className="bg-white flex flex-row w-full">
    <div className="w-1/2">
    <img src="/assets/img/gofood.png" alt="Beef Satay" className="bg-white"/>
    </div>
    <div className="flex centered w-1/2">
    <a href="https://gofood.co.id/jakarta/restaurant/ayam-bakar-patriot-perumnas-1-kec-bekasi-selatan-bekasi-67f72bb5-6c34-4428-b748-4f34f9c769b4" target="_blank" rel={"noreferrer"}  className="w-10/12 mx-auto ml-4 my-6 text-white bg-red-700 hover:bg-red-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >  LIHAT DI GOFOOD</a>
    </div>
    </div>
    <div className="bg-sky-800  flex flex-row w-full mt-6">
    <h2 className="text-3xl font-bold text-center text-white mb-4 p-10">
      Dapatkan potongan harga hingga 50% dari harga di GoFood jika makan ditempat atau belanja melalui aplikasi ini.</h2>
    </div>
   
    <ProductSlider/>

    <section className="py-2 bg-white px-2">
        <div className="container mx-auto">
           
          <ProductPricing/>     
                
          
        </div>
    </section>


      </div>



    </section>

  </>
)
}



