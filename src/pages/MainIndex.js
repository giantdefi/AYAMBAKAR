import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"


import Head from 'next/head'

import ProductPricing from "components/ProductPricing"
import dynamic from 'next/dynamic'
const ProductSlider = dynamic(() => import("components/slider/ProductSlider"), {
  ssr: false,
})

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'

import {setToggleLogin } from 'redux/reducers/AuthReducer'
//--------------------------------------

export default function Home() {

 const dispatch = useDispatch()
  const router = useRouter()
  const { title, desc } = useSelector((state) => state.GeneralReducer)


  useEffect(() => {
  
    dispatch(setMainMenuItem(1))
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleToggle = () => {
    dispatch(setToggleLogin(false))
}

return (
  <>

    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>

    <div>

      <section className="relative min-h-screen bg-gray-200 dark:bg-gray-700 animated fadeIn pt-40 md:pt-10">

  
        <div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA  "
          // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
        >
       

       <section className="bg-cover bg-center text-white py-4 pt-[100px] bg-[url('/assets/img/bg/burner.webp')]" >
        <div className="container mx-auto text-center h-[400px]">
            <h1 className="text-2xl md:text-5xl font-bold font-rocksalt">SATE & AYAM BAKAR </h1>
            <h1 className="text-[200px] md:text-[100px] p-4 font-bold mt-6 font-DayOne">PATRIOT</h1>
            <h1 className="text-xl md:text-7xl font-bold mt-4 ">Stadion Patriot Bekasi Selatan</h1>
            <p className="mt-4 text-xl md:text-2xl ">Sate Ayam, Sate Kambing, Ayam Bakar, Ayam Goreng, pecel Lele.</p>
           {/*  <a href="#start" className="mt-8 inline-block bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold ">Start Join Now</a> */}
        </div>
    </section>

{/* <div className="border-4 flex centered" >
<img src="/assets/img/kedai.jpg" alt="kedai" className="bg-white"/>
</div> */}




<div className="bg-white py-4 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Harga Pas, Rasa Jozz</h2>
      <p className="mt-6 text-lg leading-8 text-gray-600 bold">Ayam Bakar Patriot Jl. Cendrawasih Raya no 416C Perumnas 1 Bekasi Selatan</p>
    </div>

  
    <p className="text-gray-800 bold mt-10 text-center uppercase">Tersedia di :</p>
  
    <div className="bg-white flex flex-row w-full border pb-6 bg-gray-200 p-10">
    <div className="mx-auto w-1/2">
    <img src="/assets/img/gofood.png" alt="Beef Satay" className="bg-white"/>
   
    <div className="flex centered w-1/2  mx-auto">
    <a href="https://gofood.co.id/jakarta/restaurant/ayam-bakar-patriot-perumnas-1-kec-bekasi-selatan-bekasi-67f72bb5-6c34-4428-b748-4f34f9c769b4" target="_blank" rel={"noreferrer"}  className="w-10/12 mx-auto ml-4 my-6 text-white bg-red-700 hover:bg-red-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " >  LIHAT DI GOFOOD</a>
    </div>
 </div>

    </div>
    <div className="bg-sky-800  flex flex-row w-full lg:w-1/2 lg:p-10 mt-10 mx-auto">
    <h2 className="text-3xl font-bold text-center text-white mb-4">
      Dapatkan potongan harga hingga 50% dari harga di gofood jika makan ditempat atau belanja melalui aplikasi ini.</h2>
    </div>
   




    <ProductSlider/>

    <section className="py-2 bg-white px-2">
        <div className="container mx-auto">
           
          <ProductPricing/>     
                
          
        </div>
    </section>
{/* <ProductPricing/> */}

{/* <GeoMapMarkers/>  */}
  </div>
</div>
       

       
        </div>







      </section>
    </div>

  </>
)
}



