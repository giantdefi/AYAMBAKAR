import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
//import jwt_decode from "jwt-decode"

import { jwtDecode } from 'jwt-decode';
import dynamic from 'next/dynamic'
const GeoMapMarkersCheckOut = dynamic(() => import("components/map/GeoMapMarkersCheckOut"), {
  ssr: false,
})

import BTNCalculateDeliveryCost from "redux/actions/BTNCalculateDeliveryCost"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'

import { setToggleLogin } from 'redux/reducers/AuthReducer'
import { setModalLogin, setModalRegister, setModalMapPicker } from 'redux/reducers/ModalReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
import { setTotlaPrice, resetCart, removeCartItem, decreaseQuantity, increaseQuantity} from 'redux/reducers/CartReducer'
import { resetMap, setShowMap,setUserCoords, setTotalDistance, setDuration, setShowGooglePopup } from 'redux/reducers/MapReducer'
//import { setModalMapPicker } from 'redux/reducers/ModalReducer'
import { setIsLogin, setName, setEmail, setAuthToken } from 'redux/reducers/AuthReducer'
//--------------------------------------

export default function MainHeader() {

    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, name, email } = useSelector((state) => state.AuthReducer)
    const { mainMenuItem } = useSelector((state) => state.MainmenuReducer)

    const { shoppingCart, totlaPrice  } = useSelector((state) => state.CartReducer) 
    const { rightSidebar, CartSidebar } = useSelector((state) => state.MainmenuReducer)
    const { totalDistance, duration, showGooglePopup, deliveryCost, userLocation } = useSelector((state) => state.MapReducer) 


    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
      })
    

      useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client'
    
        loadScript(src)
          .then(() => {
            console.log(google)
            google.accounts.id.initialize({
              client_id: "242591925397-dltgmj8iiuo14i2l5aofbhme2o11d6a8.apps.googleusercontent.com",
              callback: handleCredentialResponse,
            })
            google.accounts.id.renderButton(
            //  googleButton.current, //this is a ref hook to the div in the official example
             
            document.getElementById("signInDiv"),
            { theme: 'outline', size: 'large' } // customization attributes
            )
          })
          .catch(console.error)
    
        return () => {
          const scriptTag = document.querySelector(`script[src="${src}"]`)
         // if (scriptTag) document.body.removeChild(scriptTag)
        }
      }, [])

      
    
      //This is my main and only objective, to get the token...
      function handleCredentialResponse(response) {
        console.log('Encoded JWT ID token: ' + response.credential)
        const userObject = jwtDecode(response.credential)
        dispatch(setAuthToken(response.credential))
        console.log(userObject.name)
        dispatch(setName(userObject.name))

        console.log(userObject.email)
        dispatch(setEmail(userObject.email))
        dispatch(setIsLogin(true))
      }
    
const handleResetLocation = () => { 
  dispatch(setShowMap(false)) 
  dispatch(setShowMap(false)) 
//dispatch(resetMap())
  //dispatch(setShowGooglePopup(true))
  dispatch(setModalMapPicker(true))
}

      return (
        <>

<div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      
<div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
        <p>Login ke Aplikasi</p>
        {!isLogin && <div id="signInDiv" className="text-gray-900" ></div> }
        {isLogin && <>
        <div className="border px-4">
        <div className="justify-between flex">
           <p className="text-[12px]">Anda login sebagai </p> <p className="text-[12px]">{name}</p>
           </div>
           <div className="justify-between flex">
           <p className="text-[12px]">Email anda  </p> <p className="text-[12px]">{email}</p>
           </div>
       
        </div>
       
        </>}
        <BTNCalculateDeliveryCost/>
        </div>
      
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total Belanja</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. {totlaPrice?(totlaPrice).toLocaleString('id-ID')+',-': '0,-'}</dd>
              </dl>

             
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">PPN 0%</dt>
                <dd className="text-base font-medium text-gray-900 dark:text-white">Rp. 0 ,-</dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <div className="text-base flex centered font-normal text-gray-500 dark:text-gray-400">
              
                <img src="/assets/img/delivery-order.webp" className="w-[15px] mr-2" alt="delivery-order" /> 
                    <p>Ongkir</p>
                    
                    </div>
                <dd className="text-base font-medium text-gray-900 dark:text-white">
              
               {!deliveryCost?
 
                <svg style={{ maxWidth: 40 }} role="status" className="mx-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>:
                 <>Rp.   {totlaPrice?((deliveryCost)).toLocaleString("id-ID")+',-':'0,-'}  </>}
               
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
             {totlaPrice?( totlaPrice + deliveryCost).toLocaleString('id-ID')+',-': "0,-"}
              
            </>  }
                </p>
            
           
            </dl>

            
            <button  className="w-full my-6 text-white bg-blue-700 hover:bg-blue-800 border-4
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  LANJUT KE PEMBAYARAN</button>
          </div>

          <button onClick={handleResetLocation} className="w-full my-6 text-white bg-red-700 hover:bg-red-800 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">  LOKASI TIDAK AKURAT? PERBAHARUI</button>

          <GeoMapMarkersCheckOut/>  
       
          {totalDistance && <>
          <p className="text-sm bold ">Perkiraan Lokasi anda : </p>
          <p className="text-[14px]">{userLocation}</p>
            <p className="mt-6 text-sm  text-gray-600 bold">Jarak ke Lokasi anda :  {' ' + (totalDistance).toLocaleString("id-ID")} KM</p>
          <img src="/assets/img/delivery-order.webp" className="w-[100px] mx-auto mt-4" alt="delivery-order" /> 
          <p className="mt-2 text-sm  text-gray-600 bold">Waktu perjalanan ditempuh jika tanpa hambatan paling cepat : {' ' +duration}  </p>

        
      
      
          </>
         
      }
          
        </div>

      
      </div>

        </>
    )
    

    
  
}



