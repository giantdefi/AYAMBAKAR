import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
//import SummarySidebarMap from "components/SummarySideBarMap"

import dynamic from 'next/dynamic'
const GeoMapMarkers = dynamic(() => import("components/map/GeoMapMarkersCheckOut"), {
  ssr: false,
})

const SummarySidebarMap = dynamic(() => import("components/SummarySideBarMap"), {
  ssr: false,
})

import { setPlaySound } from 'redux/reducers/SoundReducer'
import BTNCalculateDeliveryCost from "redux/actions/BTNCalculateDeliveryCost"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'

import { setToggleLogin } from 'redux/reducers/AuthReducer'
import { setModalLogin, setModalRegister } from 'redux/reducers/ModalReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
import { setTotlaPrice, resetCart, removeCartItem, decreaseQuantity, increaseQuantity} from 'redux/reducers/CartReducer'
import {setShowGooglePopup } from 'redux/reducers/MapReducer' 
//--------------------------------------

export default function MainHeader() {

    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { mainMenuItem } = useSelector((state) => state.MainmenuReducer)
    const { toggleLogin } = useSelector((state) => state.AuthReducer)
    const { shoppingCart, totlaPrice  } = useSelector((state) => state.CartReducer) 
    const { rightSidebar, CartSidebar } = useSelector((state) => state.MainmenuReducer)
    const { totalDistance, duration, showGooglePopup, deliveryCost, userLocation } = useSelector((state) => state.MapReducer) 

   

    const handleShowPopup = () => {
        dispatch(setShowGooglePopup(true))
    }

    const handleToggle = () => {
        if(toggleLogin){
            dispatch(setModalLogin(true))
            dispatch(setToggleLogin(false))
        }else{
            dispatch(setModalRegister(true))
            dispatch(setToggleLogin(true))
        }
        
    }

    
    const handlemodalCart = () => {
        if(CartSidebar){
            dispatch(setCartSidebar(false))
        }else{
            dispatch(setCartSidebar(true))
        }
      
    }

    const handleRemoveItem = (item) =>{
        dispatch(removeCartItem(item))
      
      }


      const handleDecreaseQty = (item) => {
        dispatch(decreaseQuantity(item))
      } 

      const handleIncreaseQty = (item) => {
        dispatch(increaseQuantity(item))
      } 

     

    return (
        <>

<section className="relative min-h-screen bg-gray-200 dark:bg-gray-700 animated fadeIn">

  
<div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA   pt-[100px]"
  // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
>


{/* <section className="bg-cover bg-center text-white py-4 pt-[100px] bg-[url('/assets/img/bg/burner.webp')]" >
<div className="container mx-auto text-center h-[400px]">
    <h1 className="text-2xl md:text-5xl font-bold font-rocksalt">SATE & AYAM BAKAR </h1>
    <h1 className="text-6xl md:text-7xl font-bold mt-4 font-DayOne">PATRIOT</h1>
    <h1 className="text-xl md:text-7xl font-bold mt-4 ">Stadion Patriot Bekasi Selatan</h1>
    <p className="mt-4 text-xl md:text-2xl ">Sate Ayam, Sate Kambing, Ayam Bakar, Ayam Goreng, pecel Lele.</p>
 
</div>
</section> */}




<div className="bg-white py-4 sm:py-12 ">
<div className="mx-auto max-w-7xl px-6 lg:px-8">
<div className="mx-auto max-w-2xl sm:text-center">
<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
<p className="mt-6 text-lg leading-8 text-gray-600">Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in. Explicabo id ut laborum.</p>
</div>
<section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
  <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
      
      
        <div className="space-y-6">
       
       
        {shoppingCart && shoppingCart.map((item, index) => {
                return (
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6" key={index}>
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <a href="#" className="shrink-0 md:order-1">
                <img className="h-20 w-20 dark:hidden" src={item.img} alt="imac image" />
                <img className="hidden h-20 w-20 dark:block" src={item.img} alt="imac image" />
              </a>

              <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button onClick={()=>handleDecreaseQty(item)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                    </svg>
                  </button>
                  <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" 
                  placeholder="" value={item.quantity} required />
                  <button onClick={()=>handleIncreaseQty(item)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700">
                    <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-base font-bold text-gray-900 dark:text-white">Rp. {item.quantity*item.price}</p>
                </div>
              </div>

              <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                <a href="#" className="text-base font-medium text-gray-900 hover:underline dark:text-white">{item.title}</a>
                <p>Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi</p>
                <div className="flex items-center gap-4">
                 

                  <button onClick={()=>handleRemoveItem(item)} type="button" className="inline-flex items-center text-sm font-medium text-yellow-600 hover:underline dark:text-red-500">
                    <i className="icofont-trash mr-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
            )
        })} 
        
        </div>
       
      </div>

    <SummarySidebarMap/>
    </div>
  </div>
</section>

</div>
</div>



</div>







</section>  

        </>
    )
}



