import React, { useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import axios from 'axios'
import TopMenu from "layout/TopMenu"
import RightSidebar from "layout/RightSidebar"
import ReferralLink from "components/reflink/ReferralLink"
//import BtnDemoUser from "redux/actions/BtnDemoUser"
//import BtnActivateUser from "redux/actions/BtnActivateUser"
import { setPlaySound } from 'redux/reducers/SoundReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setRightSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function MainHeader() {

    const router = useRouter()
    const dispatch = useDispatch();
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { toggleLogin } = useSelector((state) => state.AuthReducer)
    const { rightSidebar } = useSelector((state) => state.MainmenuReducer)

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
        dispatch(resetForm())
        dispatch(resetErrors())
      
        if(rightSidebar){
            dispatch(setRightSidebar(false))
        }else{
            dispatch(setRightSidebar(true))
            dispatch(setLeftSidebar(false))
        }
       
        
    }

    return (
        <>

          <ReferralLink/>
          <RightSidebar/>

          {/* {isLogin && <LoadUserData/> } */}

            <nav className="bg-yellow-600 dark:bg-yellow-900 p-2 mt-0 fixed w-full z-10   ">
                <div className=" mx-auto flex flex-row justify-between">

                <div className="flex h-14 centered sm:justify-center md:justify-start  mx-auto sm:mx-0
                  w-full md:w-80 ">

                     
                        <a onClick={() => onMenuClick('/')} className="flex cursor-pointer w-full">
                       
                            <img src="/assets/img/logo.webp" className="ml-4 h-10 mt-2 animated fadeInDown" alt="logo" />
                        
                        </a>

                        <div onClick={() => onMenuClick('/users')} className="md:hidden rounded-full w-[65px] h-[65px] mt-4">
                            <button className="rounded-full cursor-pointer border-2 border-gray-400">
                                <img src="/assets/img/banner-1.webp" className="rounded-full animated fadeIn" alt="VISITOR" />
                            </button>
                        </div>

                    </div>

                    <div className="flex w-full pt-2 content-center justify-between lg:w-1/2 md:justify-end">
                      <TopMenu/>
                    </div>


                </div>
            </nav>

        </>
    )
}



