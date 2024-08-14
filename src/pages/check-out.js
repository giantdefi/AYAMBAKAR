import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"


import dynamic from 'next/dynamic'
const GeoMapMarkers = dynamic(() => import("components/map/GeoMapMarkersCheckOut"), {
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

      <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {(totlaPrice).toLocaleString('id-ID')+',-'}</dd>
              </dl>

             
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. 0 ,-</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <div className="text-base flex centered font-normal text-gray-500 dark:text-gray-400">
              
                <img src="/assets/img/delivery-order.webp" className="w-[15px] mr-2" alt="delivery-order" /> 
                    <p>Delivery Cost</p>
                    
                    </div>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
              
               {!deliveryCost?
 
                <svg style={{ maxWidth: 40 }} role="status" className="mx-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>:
                 <>  {((deliveryCost)).toLocaleString("id-ID")+',-'}  </>}
               
                    </dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
              <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
              <p className="text-base font-bold text-gray-900 dark:text-white">Rp. 
              {!totalDistance? 
              <svg style={{ maxWidth: 40 }} role="status" className="mx-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>: <>
             {( totlaPrice + deliveryCost).toLocaleString('id-ID')+',-'}
              
            </>  }
                </p>
            
           
            </dl>
          </div>

          <GeoMapMarkers/>  
          {totalDistance && <>
          <p className="text-sm bold ">Perkiraan Lokasi anda : </p>
          <p className="text-[14px]">{userLocation}</p>
            <p className="mt-6 text-sm  text-gray-600 bold">Jarak ke Lokasi anda :  {' ' + (totalDistance).toLocaleString("id-ID")} KM</p>
          <img src="/assets/img/delivery-order.webp" className="w-[100px] mx-auto mt-4" alt="delivery-order" /> 
          <p className="mt-2 text-sm  text-gray-600 bold">Waktu perjalanan jika tanpa hambatan paling cepat : {' ' +duration}  </p>

          <a href="#" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</a>
      
          </>
         
      }
           {!totalDistance && <>   <p className="text-sm">
            <img src="/assets/img/map-marker.jpg" width="80" alt="logo" />
            Izinkan aplikasi mengakses lokasi anda</p>
       <BTNCalculateDeliveryCost/>
           </>
           }
        </div>

        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <htmlForm className="space-y-4">
            <div>
              <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Do you have a voucher or gift card? </label>
              <input type="text" id="voucher" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="" required />
            </div>
            <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Apply Code</button>
          </htmlForm>
        </div>
      </div>
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



