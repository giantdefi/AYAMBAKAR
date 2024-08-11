import React, { useEffect } from "react"
import Router, { useRouter } from "next/router"


import Head from 'next/head'
  import MainIndex from "./MainIndex"
  import MobileIndex from "./MobileIndex"


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setMainMenuItem } from 'redux/reducers/MainmenuReducer'

import dynamic from 'next/dynamic'

const Tradingview = dynamic(
  () => import('widgets/TradingView'),
  { ssr: false }
)

//import Tradingview from "widgets/TradingView"
//--------------------------------------

export default function Home() {

  const { domain, title, desc } = useSelector((state) => state.GeneralReducer)

  const router = useRouter()
  const { ref } = router.query
  const dispatch = useDispatch();

  const { width } = useSelector((state) => state.GeneralReducer)

  useEffect(() => { // referal sponsor from URL if any
    setTimeout(() => {
      //  setdelayLoad(true)
    }, 500)
    dispatch(setMainMenuItem(1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>

      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
      </Head>

      <section className="relative min-h-screen bg-gray-200 dark:bg-gray-700 animated fadeIn">

  
<div className="_gradient_purple/90 w-full h-[600px] bg-cover bg-fixedAA pt-[50px] "
  // style={{ backgroundImage: 'url(/assets/img/mainbg.webp)' }}
>
<div className="flex w-full centered md:mt-20">
        <p className="mx-auto dark:text-white text-xl md:text-2xl">GOLD Real-Time Chart</p>
</div> 
    <Tradingview/>
</div>
</section>
    </>
  )
}



