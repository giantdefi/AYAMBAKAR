import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
const moment = require('moment')
import TopMenu from "layout/TopMenu"
import FloatingCart from "layout/FloatingCart"
import dynamic from 'next/dynamic'
import LEftSidebar from "layout/LEftSidebar"
import RightSidebar from "layout/RightSidebar"
//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'

import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function TopNavigation() {


    const router = useRouter()
    const dispatch = useDispatch()

    const { isLogin, userID, token, username, fullname, toggleLogin } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { spinnerAtVisitor } = useSelector((state) => state.LoaderReducer)
    const { cofetty } = useSelector((state) => state.ModalReducer)
    const { modalMenuDrawer } = useSelector((state) => state.ModalReducer)
    const { rightSidebar, leftSidebar, CartSidebar } = useSelector((state) => state.MainmenuReducer)
    const { shoppingCart  } = useSelector((state) => state.CartReducer) 
    const handleUserClick = () => {

        if (router.pathname !== '/users') {
          
        }
        setTimeout(() => {
         
            router.push('/users')
        }, 1000)
    }

    const handleOpenDrawer = () =>{  
      
        if(leftSidebar){
            dispatch(setLeftSidebar(false))
           
        }else{
            dispatch(setLeftSidebar(true))
            dispatch(setRightSidebar(false))
        }
      
      
    }

 
    
    const handleToggle = () => {
        dispatch(resetForm())
        dispatch(resetErrors())
      
        if(rightSidebar){
            dispatch(setRightSidebar(false))
           
        }else{
            dispatch(setRightSidebar(true))
            dispatch(setLeftSidebar(false))
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

<LEftSidebar/>
<RightSidebar/>

<div className="bg-[#663399] w-full  fixed top-0  z-10">
<div className="bg-[#800080] dark:bg-slate-900  rounded-br-[10%] rounded-bl-[10%] h-[100px] h-[90px] shadow-sm shadow-gray-200 w-full ">

<nav className="rounded-bl-[40%] px-3 pt-2 flex flex-grow relative justify-between z-10  mx-auto ">

   <a  className="flex-initial  w-[62px] h-[62px] p-2  cursor-pointer ">
 
   {/* <button onClick={handleOpenDrawer} className={` outline-none hover:outline-hidden transition duration-150 mt-2 animated backInLeft`}>

       
        {modalMenuDrawer ?
       
         <i class="icofont-arrow-left text-[40px] text-white animated fadeIn"></i>:
       
<svg width="30px" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512 " className={leftSidebar ?"transition duration-150 -rotate-90": "transition duration-150"}>
            <path fill="white" d="M12 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 12 12 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 12 12 12z" />
          </svg>

               }
          </button> */}
          <div className="border-4 rounded-full h-14 w-14  border-gray-500 _gradient_slate">
             <img src="/assets/img/flame.webp" className="h-12" alt="logo" /> 
          </div>
           
    
    </a>

    <a onClick={()=>router.push('/')} className="cursor-pointer ml-4 flex centered  w-[250px] mt-2  mr-6">
    <img src="/assets/ayambakarpatriot.png" className=" animated fadeInDown w-3/2" alt="logo" /> 
    </a>

    <div className="rounded-full w-[60px] h-[60px]  flex flex-col centered items-center ">
    <button onClick={handlemodalCart}><p className="inline-block py-2 px-4 text-white no-underline"
            // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
        > 


        <div class="relative border-4 rounded-full text-green-200 border-gray-500 _gradient_slate p-2">
        
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
</div>
    
    
</nav>

</div>
</div>

{/* <FloatingCart/> */}
        </>
    )
}
