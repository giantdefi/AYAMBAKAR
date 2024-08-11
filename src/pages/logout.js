import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'


//---- REDUX STORE ---------------------
import { useDispatch, useSelector } from 'react-redux'
import { setModalMenuDrawer, setCloseModal, setModalLogin } from 'redux/reducers/ModalReducer'
import { setLoaderBalance } from 'redux/reducers/LoaderReducer'

import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
//import { resetAffiliate } from 'redux/reducers/AffiliateReducer'
//import { resetHistory } from 'redux/reducers/HistoryReducer'
//import { resetMtree } from 'redux/reducers/MtreeReducer'
//import { resetFinance } from 'redux/reducers/FinanceReducer'
import { resetUsers } from 'redux/reducers/UsersReducer'
import { setLogout, setToggleLogin } from 'redux/reducers/AuthReducer'
import { setRightSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {


    const { domain, title, desc } = useSelector((state) => state.GeneralReducer) 

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(setCloseModal(true))
       setTimeout(()=>{
 dispatch(setModalMenuDrawer(false))

       },1000)
      
        handleLogout()
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleLogout = () => {

      //  dispatch(resetAffiliate())
        dispatch(resetErrors())
       // dispatch(resetFinance())
        dispatch(resetForm())
    //    dispatch(resetHistory())
      // dispatch(resetMtree())
        dispatch(resetUsers()) 
        dispatch(setLogout()) // authReducer
      //  dispatch(setToggleLogin(true)) 
      //  dispatch(setModalLogin(true)) 
      dispatch(setRightSidebar(true))
       return router.push('/')
        //  window.location.reload()
    }


    return (
        <>

           

        </>
    )
}




