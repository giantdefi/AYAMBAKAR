import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { resetForm } from 'redux/reducers/FormReducer'
import { resetErrors } from 'redux/reducers/ErrorReducer'
import { setRightSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//-------------------------------------------------------------------------

export default function Mainmenu() {


    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { rightSidebar } = useSelector((state) => state.MainmenuReducer)

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

<ul className="list-reset flex justify-between flex-1 md:flex-none items-center">

<li className="mr-3 uppercase font-semibold">
        <Link href="/"><a className="inline-block py-2 px-4 text-white no-underline"
         
        >Home</a></Link>
    </li>

    <li className="mr-3 uppercase font-semibold">
        <button onClick={()=>router.push('/delivery-order')}><p className="inline-block py-2 px-4 text-white no-underline"
            // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
        >DELIVERY ORDER</p></button>
    </li>

    <li className="mr-3 uppercase font-semibold">
        <button onClick={()=>router.push('/about-us')}><p className="inline-block py-2 px-4 text-white no-underline"
            // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
        >ABOUT</p></button>
    </li>

    <li className="mr-3 uppercase font-semibold">
        <button onClick={()=>router.push('/contact')}><p className="inline-block py-2 px-4 text-white no-underline"
            // style={{ color: mainMenuItem === 3 ? 'orange' : 'white' }}
        >CONTACT</p></button>
    </li>


    <li className="mr-3 flex centered hidden md:block">
     {!isLogin? 
        <button onClick={handleToggle}
            className="flex justify-center  text-sm text-white  rounded-full  bg-blue-700 
hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-400 text-xl px-4">
          {showLogin ? 'LOGIN' : 'REGISTER'}  
            </button>
           
            
        :
       <>
                                                       
        <button onClick={()=>router.push('/users')}
        className="flex justify-center  text-sm text-white hidden lg:block rounded-full  bg-blue-700 
        hover:bg-blue-500 transition ease-in-out duration-300 py-1 border-4 border-gray-200 text-xl px-4">
                        DASHBOARD</button>
       </>
      
        
        }

    </li>
</ul>



        </>
    )
}



