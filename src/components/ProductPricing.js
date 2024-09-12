import React, { useEffect, useState } from "react"
import Head from 'next/head'

import { useRouter } from 'next/router';
import ProductJSON from "components/json/Products" 
import SliderProducts from "components/json/SliderProducts" 
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { addToCart, setSelectedItem } from 'redux/reducers/CartReducer'
import { setModalCartButton } from 'redux/reducers/ModalReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function HeaderBoard() {

    const { asPath, pathname } = useRouter()
    const router = useRouter()
    const dispatch = useDispatch()
    const path = pathname.substring(1, 18) // any number except 5
    const { shoppingCart  } = useSelector((state) => state.CartReducer) 
    const [quantity, setQuantity] = useState(2)

 
    const handleToCart = (data) => { 
        console.log(data)
        dispatch(addToCart(data))
        dispatch(setSelectedItem(data))
      //  dispatch(setCartSidebar(true))
        dispatch(setModalCartButton(false))  
        setTimeout(()=>{
            dispatch(setModalCartButton(true))  
        },500)    
    }

 
    console.log(shoppingCart)

    return (
        <>
<section className="py-2 bg-white px-2">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-700 font-DayOne uppercase">Mulai Belanja </h2>
            <h4 className="text-1xl font-bold text-center text-red-700 font-DayOne uppercase">Pilih Produk </h4>
            <div className="mt-8 grid lg:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-6 lg:gap-12">

              {ProductJSON.map((item, index) => {
                return (
                    <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700 p-1 relative pb-12" key={index}>
                    <img src={item.img} alt="produk" className="w-full h-48 object-cover rounded-lg"/>
                    <div className="p-4">
                        <h3 className="text-[15px] bold leading-4 mb-2">{item.title}</h3>
                        {/* <p className="hidden md:block text-sm text-gray-700 ">{item.desc}</p> */}
                        <p className="text-lg font-bold text-sky-300 "><span className="line-through">
                            Rp. {(item.price1).toLocaleString('id-ID')+',-'}</span> <span className="text-gray-700 font-semibold text-sm">di goofood</span></p>
                        <p className="text-lg font-bold text-red-700">Rp. {(item.price2).toLocaleString('id-ID')+',-'}</p>
                    </div>
                    <button onClick={()=>handleToCart(ProductJSON[index])} className="w-full lg:w-2/3 absolute bottom-2 lg:left-10  text-gray-800 border bg-sky-300  hover:bg-sky-600 hover:text-white 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><i className="icofont-cart-alt text-2xl"></i>Masuk Keranjang</button>
                </div>
                  )
                })}
                

               
                
            </div>
        </div>
    </section>


            
        </>
    )
}



