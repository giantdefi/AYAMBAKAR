import React, { useEffect, useState, useRef } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"
import JoinButton from "components/firebase/JoinButton"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { resetForm } from 'redux/reducers/FormReducer'
import { resetErrors } from 'redux/reducers/ErrorReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
import { setModalCart } from 'redux/reducers/ModalReducer'
//-------------------------------------------------------------------------

export default function Mainmenu() {


    const router = useRouter()
    const dispatch = useDispatch()
    const [itemLink, setItemLink] = useState()
    const { isLogin, username } = useSelector((state) => state.AuthReducer)
    const { showLogin } = useSelector((state) => state.SidebarReducer)
    const { rightSidebar, CartSidebar } = useSelector((state) => state.MainmenuReducer)
    const { shoppingCart  } = useSelector((state) => state.CartReducer) 
    
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

<ul className="list-reset flex w-full justify-between flex-1 md:flex-none items-center _gradient_slate fixed top-[70px] z-10">

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
</ul>



        </>
    )
}



