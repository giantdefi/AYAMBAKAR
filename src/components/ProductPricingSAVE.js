import React, { useEffect, useState } from "react"
import Head from 'next/head'

import { useRouter } from 'next/router';
import ProductJSON from "components/json/Products"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setPlaySound } from 'redux/reducers/SoundReducer'
import { setCartArray } from 'redux/reducers/CartReducer'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function HeaderBoard() {

    const { asPath, pathname } = useRouter()
    const router = useRouter()
    const dispatch = useDispatch()
    const path = pathname.substring(1, 18) // any number except 5
    const { cartArray  } = useSelector((state) => state.CartReducer) 
    const [quantity, setQuantity] = useState(2)

    let Arrays = []

    let terus = true


   console.log(Arrays)

    const handleToCart = (data) => { 
       
        console.log(data)

        for (let i = 0; i < cartArray.length; i++) {
            console.log("-------------------------------------")
          console.log(cartArray[i][0].pid)
          console.log(data.pid)
          
            if(cartArray[i][0].pid === data.pid){
            console.log('DATA IS THE SAME PID')
            cartArray[0].filter((pid) => cartArray[i][0].pid === data.pid)
            terus = false
            setQuantity(quantity+1)
           }else{
           terus = true
           }
            
         } 

         if(!terus){

         const Newdata = {
            pid : data.pid,
            title : data.title,
            price : data.price,
            img : data.img,
            quantity : quantity
         }

        Arrays.push(Newdata)
        console.log(Arrays)
        dispatch(setCartArray([...cartArray,Arrays]))
        dispatch(setCartSidebar(true))


         }else{
            Arrays.push(data)
            console.log(Arrays)
            dispatch(setCartArray([...cartArray,Arrays]))
            dispatch(setCartSidebar(true))
         }
        
     }
       
     
      console.log(quantity) 


    // const handleToCart = (data) => { 
       
    //     console.log(data)
     
    //     Arrays.push(data)
    //     console.log(Arrays)

    //     dispatch(setCartArray([...cartArray,Arrays]))

    //     dispatch(setCartSidebar(true))
     
       
    // }

    console.log(Arrays)

    return (
        <>
<section className="py-20 bg-white px-2">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-red-700">Belanja Sekarang</h2>
            <div className="mt-8 grid lg:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">

              {ProductJSON.map((item, index) => {
                return (
                    <div className="border rounded-lg shadow-lg overflow-hidden text-gray-700 p-1">
                    <img src={item.img} alt="Chicken Satay" className="w-full h-48 object-cover"/>
                    <div className="p-4">
                        <h3 className="text-[15px] bold leading-4 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-700 ">Tender chicken skewers marinated in rich spices.</p>
                        <p className="text-lg font-bold text-red-700">Rp. {(item.price).toLocaleString('id-ID')+',-'}</p>
                    </div>
                    <button onClick={()=>handleToCart(ProductJSON[index])} className="w-full  text-white bg-blue-700 hover:bg-blue-800 
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



