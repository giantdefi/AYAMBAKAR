import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import axios from 'axios'

import JoinButton from "components/firebase/JoinButton"

 import CartBucket from "./CartBucket"
// import ReferralLink from "components/reflink/ReferralLink"
//import BtnDemoUser from "redux/actions/BtnDemoUser"
//import BtnActivateUser from "redux/actions/BtnActivateUser"
import { setPlaySound } from 'redux/reducers/SoundReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setInvestmentPackage } from 'redux/reducers/PersistReducer'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setPackageRasio } from 'redux/reducers/SettingReducer'
import { setToggleLogin } from 'redux/reducers/AuthReducer'
import { setModalLogin, setModalRegister } from 'redux/reducers/ModalReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function MainHeader() {

    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { mainMenuItem } = useSelector((state) => state.MainmenuReducer)
    const { investmentPackage } = useSelector((state) => state.PersistReducer)
    const { toggleLogin } = useSelector((state) => state.AuthReducer)
    const { shoppingCart  } = useSelector((state) => state.CartReducer) 
    const { rightSidebar, CartSidebar } = useSelector((state) => state.MainmenuReducer)

    const onMenuClick = (link) => {
        dispatch(setPlaySound('click'))
      //  setItemLink(link)

      //  setMenuSpinner(true)
        setTimeout(() => {
            router.push(link)
        }, 100)
    }

//     const handleToggle = () => {
//         if(toggleLogin){
// dispatch(setToggleLogin(false))
//         }else{
//             dispatch(setToggleLogin(true))
//         }
        
//     }

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

    return (
        <>

         

          {/* {isLogin && <LoadUserData/> } */}

            <nav className="_gradient_mtree p-2 mt-0 fixed w-full z-10   ">
                <div className=" mx-auto flex flex-row justify-between">

                <div className="flex h-14 centered sm:justify-center md:justify-start  mx-auto sm:mx-0
                  w-full md:w-80 ">

                     
                        <a onClick={() => onMenuClick('/')} className="flex cursor-pointer w-full">
                       
                            <img src="/assets/img/logo.webp" className="ml-4 h-8 mt-2 animated fadeInDown" alt="logo" />
                        
                        </a>

                        <div onClick={() => onMenuClick('/users')} className="md:hidden rounded-full w-[65px] h-[65px] mt-4">
                            <button className="rounded-full cursor-pointer border-2 border-gray-400">
                                <img src="/assets/img/banner-1.webp" className="rounded-full animated fadeIn" alt="VISITOR" />
                            </button>
                        </div>

                    </div>

                    <div className="flex w-full pt-2 content-center justify-between lg:w-1/2 md:justify-end">
                        <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
                        <li className=" uppercase font-semibold">
                                <Link href="/"><a className="inline-block py-2 px-4 text-white no-underline"
                                
                                >Home</a></Link>
                            </li>

                            <li className="mr-3 uppercase font-semibold">
                                <button onClick={()=>router.push('/shopping')}><p className="inline-block py-2 px-4 text-white no-underline"
                                    // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
                                >BELANJA</p></button>
                            </li>

                            <li className="mr-3 uppercase font-semibold">
                                <button onClick={()=>router.push('/about-us')}><p className="inline-block py-2 px-4 text-white no-underline"
                                    // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
                                >TENTANG</p></button>
                            </li>
                            <li className="mr-3 uppercase font-semibold">
                                <button onClick={()=>router.push('/about-us')}><p className="inline-block py-2 px-4 text-white no-underline"
                                    // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
                                >KONTAK</p></button>
                            </li>
                            {/* <li className="mr-3 flex centered hidden md:block">

<button type="button" class="relative inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
<svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
</svg>
<span class="sr-only">Notifications</span>
Messages
<div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 
border-white rounded-full -top-2 -end-2 dark:border-gray-900">8</div>
</button>

</li> */}


                            <li className="mr-3 flex centered hidden md:block">
    
    <JoinButton/>

</li>


<CartBucket />

                          
                            {/* <li className="mr-3 flex centered">
                             {!isLogin? toggleLogin ?
                                <button onClick={handleToggle}
                                    className="flex justify-center  text-sm text-white  rounded-full holo  
                  hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-4">
                                    LOGIN</button>
                                    :
                                    <button onClick={handleToggle}
                                    className="flex justify-center  text-sm text-white  rounded-full holo  
                  hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-4">
                                    REGISTER</button>
                                    
                                :
                               <>
                                                                               
                                <button onClick={()=>router.push('/users')}
                                className="flex justify-center  text-sm text-white  rounded-full   
                                hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-4">
                                                DASHBOARD</button>
                               </>
                              
                                
                                }

                            </li> */}
                        </ul>
                    </div>


                </div>
            </nav>

        </>
    )
}



