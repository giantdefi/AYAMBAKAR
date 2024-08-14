import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import { FloatingWhatsApp } from 'react-floating-whatsapp'

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
  const { totalDistance, duration, showGooglePopup,  } = useSelector((state) => state.MapReducer) 
  const { cartArray  } = useSelector((state) => state.CartReducer) 



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

      <section className="relative min-h-screen pt-10 bg-gray-200 dark:bg-gray-700 animated fadeIn">

  
        <div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA  "
          // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
        >
       

       <section className="bg-cover bg-center text-white py-4 pt-[150px] bg-[url('/assets/img/bg/burner.webp')]" >
        <div className="container mx-auto text-center h-[400px]">
            <h1 className="text-2xl md:text-5xl font-bold font-rocksalt">SATE & AYAM BAKAR </h1>
            <h1 className="text-6xl md:text-7xl font-bold mt-4 font-DayOne">PATRIOT</h1>
            <h1 className="text-xl md:text-7xl font-bold mt-4 ">Stadion Patriot Bekasi Selatan</h1>
            <p className="mt-4 text-xl md:text-2xl ">Sate Ayam, Sate Kambing, Ayam Bakar, Ayam Goreng, pecel Lele.</p>
           <a href="#start" className="mt-8 inline-block bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold ">Start Join Now</a>
        </div>
    </section>

 

<ProductPricing/> 


{/* <div className="mt-10">
   <GeoMapMarkers/>  
</div> */}


  </div>

       

       
    

      </section>
      <FloatingWhatsApp phoneNumber={'+62 813-2666-7383'} />
    </div>

  </>
)
}



