import React, { useEffect, useState } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'

import dynamic from 'next/dynamic'

// const MainIndex = dynamic(() => import("./MainIndex"), {
//     ssr: false,
// })
// const UserIndex = dynamic(() => import("./Userindex"), {
//   ssr: false,
// })


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
// import { setPlaySound } from 'redux/reducers/SoundReducer'

//--------------------------------------

export default function Wallet() {

   const { wallet } = useSelector((state) => state.AuthReducer)
   const { currency } = useSelector((state) => state.GeneralReducer)
   
    return (
        <>

        <div className="flex justify-end mr-5 mt-2"> 
 
   <div className="flex centered"> <img src="/assets/img/dollar.webp" width="20" alt="logo" /> <span className="text-sm text-gray-800 ml-1">{currency} : {wallet}</span></div>              
        </div>

        </>
    )
}



