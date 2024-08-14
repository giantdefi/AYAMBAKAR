import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import axios from 'axios'

import JoinButton from "components/firebase/JoinButton"
// import LoadUserData from "./LoadUserData"
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

                            <li className="mr-3 flex centered hidden md:block">
    
    <JoinButton/>

</li>
<li className="mr-3 uppercase font-semibold">
    <button onClick={handlemodalCart}><p className="inline-block py-2 px-4 text-white no-underline"
        // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
    > 


    <div class="relative border-4 rounded-lg text-green-200 border-gray-500 _gradient_slate p-2">
    
    {shoppingCart && shoppingCart.length > 0 && 
        <div class="absolute top-[-5px] right-[-10px]">
        <span class="relative flex h-4 w-4">
        <span class="animate-ping absolute  h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class=" inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        </div>}


        <i className="icofont-cart text-3xl"></i>
    </div>
            
 
    </p></button>
</li>

                          
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



