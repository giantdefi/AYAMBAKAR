import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import Head from 'next/head'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalToast } from 'redux/reducers/ModalReducer';
//--------------------------------------

export default function Users() {

    const { domain, title, desc, masterUser } = useSelector((state) => state.GeneralReducer)

    const router = useRouter()
    const dispatch = useDispatch()
 
    const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)

    const { isLogin } = useSelector((state) => state.AuthReducer)


    return (
        <>

            <Head>
                <title>{title}</title>
                <meta name="description" content={desc} />
            </Head>

            <div className="md:pt-12  min-h-screen">

            <div className=" transition-all  duration-300 flex flex-col pt-6 text-white ">
            <div className="transition-all duration-300 flex flex-col w-full   mx-auto text-white ">
            <div className=" w-full mx-auto md:w-10/12 lg:w-10/12 lg:mt-6">

                <section className="w-full mx-auto text-white animated fadeIn">


                    <div className="text-center py-2 px-4 mb-2">
                    <p className="uppercase bold mb-2 text-xl text-gray-800 dark:text-white">* USERS DASHBOARD *</p>              

                    </div>


                </section>
            </div>
            </div>
            </div>
            </div>
        </>
    )
}



