import React, { useEffect, useState } from "react"
import Head from 'next/head'

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic'
const CircularProgress1 = dynamic(() => import("components/CircularProgress1"), {
    ssr: false,
})
const CircularProgress2 = dynamic(() => import("components/CircularProgress2"), {
    ssr: false,
})
const CircularProgress3 = dynamic(() => import("components/CircularProgress3"), {
    ssr: false,
})


//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'


//--------------------------------------

export default function HeaderBoard() {

    const { asPath, pathname } = useRouter()
    const router = useRouter()
    const dispatch = useDispatch()
    const path = pathname.substring(1, 18) // any number except 5
    // const path = pathname.substring(1, 5)

    const { domain, title, desc } = useSelector((state) => state.GeneralReducer)
    const { headerBoardNo } = useSelector((state) => state.MainmenuReducer)
    const { level, isActive } = useSelector((state) => state.AuthReducer)
   
    const [menuSpinner, setMenuSpinner] = useState(false)



    const onMenuClick = (no, text) => {

        if (no == 'x') {
            dispatch(setPlaySound('click'))
            return router.push('/users/price-chart') // followed by setCurrentBoardLevel = false
        }
        if (no == 'xx') {
            dispatch(setPlaySound('click'))
            return router.push('/users/latest-transactions') // followed by setCurrentBoardLevel = false
        }
        //  if (no < 3) {
        dispatch(setPlaySound('click'))
        //  }
        setTimeout(() => {
            dispatch(setCurrentBoardLevel(no)) // check again
            dispatch(setCurrentBoardTitle(text))
            router.push('/users/cluster-level-' + no)
        })

    }

    // console.log(path)

    return (
        <>



            {/* <div className="lg:flex lg:justify-between lg:px-4 text-center mt-2 py-2 "> */}
            <div className="text-center mt-2 py-2 animated fadeIn bg-cover flex w-full justify-center"
             style={{ backgroundImage: 'url(/assets/img/bg/bg-2.webp)' }}
            >


                <button 
                    className=" w-1/3 md:w-[150px] cursor:none">
                    <div className={isActive && level == 1?
                        "_gradient_orange m-1 text-white h-22  py-1 rounded-lg border-2 border-gray-500" :
                        "_gradient_slate m-1 text-white h-22  py-1 rounded-lg border-2 border-gray-500"}>
                        <div className="flex flex-col centered">
                            <p className="mb-2">Level - 1</p>
                        <CircularProgress1/>
                        </div>
                    </div>
                </button>
                <button 
                    className=" w-1/3 md:w-[150px] cursor:none">
                    <div className={isActive && level == 2?
                        "_gradient_orange m-1 text-white h-22  py-1 rounded-lg border-2 border-gray-500" :
                        "_gradient_slate m-1 text-white h-22  py-1 rounded-lg border-2 border-gray-500"}>
                        <div className="flex flex-col centered">
                        <p className="mb-2">Level - 2</p>
                        <CircularProgress2/>
                        </div>
                    </div>
                </button>
                <button 
                    className=" w-1/3 md:w-[150px] cursor:none">
                    <div className={isActive && level == 3?
                        "_gradient_orange m-1 text-white h-22  py-1 rounded-lg border-2 border-gray-500" :
                        "_gradient_slate m-1 text-white h-22  py-1 rounded-lg border-2 border-gray-500"}>
                        <div className="flex flex-col centered">
                        <p className="mb-2">Level - 3</p>
                        <CircularProgress3/>
                        </div>
                    </div>
                </button>

           

            
               

               
          
           



            </div>
            
        </>
    )
}



