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

 <li className="mr-3 uppercase font-semibold">
    <button onClick={handlemodalCart}><p className="inline-block py-2 px-4 text-white no-underline"
        // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
    > 


    <div class="relative border-4 rounded-lg text-green-200 border-gray-500 _gradient_slate p-2">
    
    {shoppingCart && shoppingCart.length > 0 && 
        <div class="absolute top-[-5px] right-[-10px]">
        <span class="relative flex h-4 w-4">
        <span class="animate-ping absolute  h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span class=" inline-flex rounded-full h-6 w-6s bg-red-500"></span>
        </span>
        </div>}
<i className="icofont-cart text-3xl"></i>
        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white  border-2 
border-red-700 rounded-full -top-2 -end-2 dark:border-gray-900">{shoppingCart.length}</div>
        
    </div>
            
 
    </p></button>
</li>

                          
           

        </>
    )
}



