import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"


import Head from 'next/head'
import LEftSidebar from "layout/LEftSidebar"
import RightSidebar from "layout/RightSidebar"
import ProductPricing from "components/ProductPricing"

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
import { setSpinnerAtLogo } from 'redux/reducers/LoaderReducer'
import { setbackURLs } from 'redux/reducers/MainmenuReducer'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'
import { setBordingOnMainHeader, setShoWConnectWallet } from 'redux/reducers/SettingReducer'
import {setToggleLogin } from 'redux/reducers/AuthReducer' 
import {setShowGooglePopup } from 'redux/reducers/MapReducer' 
//--------------------------------------

export default function Home() {

 const dispatch = useDispatch()
  const router = useRouter()
  const [spinner, setSpinner] = useState(true)
  const [toggle, setToggle] = useState(false)
  const { domain, title, desc } = useSelector((state) => state.GeneralReducer)
  const { isLogin, phone, email, toggleLogin } = useSelector((state) => state.AuthReducer)
  const { rightSidebar } = useSelector((state) => state.MainmenuReducer) 
  const { totalDistance, duration, showGooglePopup } = useSelector((state) => state.MapReducer) 



  useEffect(() => {
   if(duration) {
    setSpinner(false)
   }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  const handleToggle = () => {
    dispatch(setToggleLogin(false))
}

const handleShowPopup = () => {
    dispatch(setShowGooglePopup(true))
}

return (
  <>

    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>

    <div>

      <section className="relative min-h-screen bg-gray-200 dark:bg-gray-700 animated fadeIn">

  
        <div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA  "
          // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
        >
       

       <section className="bg-cover bg-center text-white py-4 pt-[100px] bg-[url('/assets/img/bg/burner.webp')]" >
        <div className="container mx-auto text-center h-[400px]">
            <h1 className="text-2xl md:text-5xl font-bold font-rocksalt">SATE & AYAM BAKAR </h1>
            <h1 className="text-6xl md:text-7xl font-bold mt-4 font-DayOne">PATRIOT</h1>
            <h1 className="text-xl md:text-7xl font-bold mt-4 ">Stadion Patriot Bekasi Selatan</h1>
            <p className="mt-4 text-xl md:text-2xl ">Sate Ayam, Sate Kambing, Ayam Bakar, Ayam Goreng, pecel Lele.</p>
           {/*  <a href="#start" className="mt-8 inline-block bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold ">Start Join Now</a> */}
        </div>
    </section>




<div className="bg-white py-4 sm:py-12">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl sm:text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Menghitung Biaya Pengiriman</h2>

      
      <img src="/assets/img/delivery-order.webp" className="w-[200px] mx-auto" alt="delivery-order" />
      <p className="mt-6 text-lg leading-4 text-gray-600">Mohon izinkan aplikasi mengakses Lokasi anda.</p>
    
      <button onClick={handleShowPopup} className="w-full my-2 text-white bg-blue-700 hover:bg-blue-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  <i className="icofont-arrow-right animate-ping  mr-2"></i> Izinkan Lokasi Saya</button>

      <p className="mt-6 text-lg leading-4 text-gray-600">Jarak ke Lokasi anda : 
      {spinner ? 
      <svg style={{ maxWidth: 40 }} role="status" className="mx-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>:
        <>{' ' +totalDistance}  </>}
        Km
        </p>
        <p className="mt-6 text-lg leading-4 text-gray-600">Biaya Pengiriman ke Lokasi anda : Rp. 
      {spinner ? 
      <svg style={{ maxWidth: 40 }} role="status" className="mx-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>:
        <>  {5000 + (totalDistance * 2500)}  </>}
       
        </p>
        <p className="mt-6 text-lg leading-4 text-gray-600">Waktu pengiriman jika tanpa hambatan minimum :
      {spinner ? 
      <svg style={{ maxWidth: 40 }} role="status" className="mx-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
    </svg>:
        <>{' ' +duration} </>}
        Km
        </p>



     
  
    </div>

    {/* <RealestateSlider /> */}

    <ProductSlider/>

  

<ProductPricing/>

<GeoMapMarkers/> 
  </div>
</div>
       

       
        </div>







      </section>
    </div>

  </>
)
}



