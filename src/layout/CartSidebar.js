import React, {useRef, useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"


import { setTotlaPrice, resetCart, removeCartItem} from 'redux/reducers/CartReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setRightSidebar, setLeftSidebar, setCartSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {

  
 const dispatch = useDispatch()
  const router = useRouter()
  const { CartSidebar } = useSelector((state) => state.MainmenuReducer)
  const { showLogin } = useSelector((state) => state.SidebarReducer)
  const { shoppingCart, totlaPrice, } = useSelector((state) => state.CartReducer) 
  const {  deliveryCost} = useSelector((state) => state.MapReducer) 

  useEffect(() => {
    if(shoppingCart){
    
      let total = 0
      for (let i = 0; i < shoppingCart.length; i++) {
         total = total + (shoppingCart[i].price * shoppingCart[i].quantity)
         
      } 
      console.log(total)
      dispatch(setTotlaPrice(total))
    }
   

       // eslint-disable-next-line react-hooks/exhaustive-deps
}, [shoppingCart])


useEffect(() => {

  if(CartSidebar){
   //  document.body.classList.add('overflow-hidden')
  }else{
   // document.body.classList.remove('overflow-hidden')
  }
 

     // eslint-disable-next-line react-hooks/exhaustive-deps
}, [CartSidebar])


const handleClose = () => { 
 // document.body.classList.remove('overflow-hidden')
    dispatch(setCartSidebar(false))
}

const handleContunueShopping = ()=> {
  handleClose()
  //router.push('/shopping')
}

const handleClearCart = ()=> {
  dispatch(resetCart())
}
const handleRemoveItem = (item) =>{
  dispatch(removeCartItem(item))

}

const handleCheckOut = ()=>{
  dispatch(setCartSidebar(false))
  router.push('/check-out')
}




return (
  <>


  
    <div  className={`min-h-screen border-red-800 shadow-xl overflow-auto mt-42 md:mt-16 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 
    dark:bg-gray-800 ${!CartSidebar && "translate-x-full"}`}
    >
      <div className="flex items-start justify-between mb-10">
                      <h2 className="text-xl bold " >Keranjang Belanja</h2>
                      <div className="ml-3 flex h-7 items-center">
                      
                        <button onClick={handleClose} className="relative -m-2 p-2 text-gray-400 text-white hover:text-gray-500">
                        <i className="icofont-close-circled text-5xl"></i>
                       
                       </button>
                       
          </div>
          </div>   
    
        {shoppingCart.length > 0 ?     
       <section>

                                         
                            
                        <div className="pb-[100px] overflow-auto ">
                        <div className="">
                        {/* {shoppingCart.slice(0).reverse().map((item, index) => { */}
                       {shoppingCart && shoppingCart.map((item, index) => {
                return (
                          <p className="flex py-4 border-2 p-1 mb-4 shadow-lg">
                              <div className="h-14 w-14 mt-2  overflow-hidden rounded-md border border-gray-200">
                                <img src={item.img} alt="carts" className="h-full w-full object-cover object-center"/>
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>
                                      <a href="#">{item.title}</a>
                                    </p>
                                    <p className="ml-4">Rp. {(item.price).toLocaleString('id-ID')+',-'}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">Sate kulit ayam yang lezat, bergizi dan berprotein tinggi.</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500 bold text-orange-700">Qty : {item.quantity} items</p>

                                  <div className="flex">
                                    <button onClick={()=>handleRemoveItem(item)} className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                  </div>
                                </div>
                              </div>
                            </p>
                               )
                              })} 
   </div>
   <div className=" mt-6 bg-gray-100 text-white mb-20">
   <div className=" mt-6">
   <div className="flex justify-between items-center px-5 bold py-4 border-b pb-2 border-slate-800 text-gray-900">
      <p>Total Belanja  </p><p>Rp. {totlaPrice?(totlaPrice).toLocaleString('id-ID')+',-': '0,-'} </p>
  </div>
  {/* <div className="flex justify-between items-center px-5 bold py-4 border-b pb-2 border-slate-800">
      <p>Ongkir GOJEK </p><p>  {totlaPrice?((deliveryCost)).toLocaleString("id-ID")+',-':'0,-'}  </p>
  </div>
  <div className="flex justify-between items-center px-5 bold py-4 border-b pb-2 border-slate-800">
      <p>Total Pembayaran  </p><p>  {totlaPrice?( totlaPrice + deliveryCost).toLocaleString('id-ID')+',-': "0,-"} </p>
  </div> */}
  </div>     
  <div className="flex centered">
    <button onClick={handleContunueShopping}  className="w-full my-2 text-white bg-blue-700 hover:bg-blue-800 w-[80%] 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase"> <i class="icofont-cart-alt text-2xl"></i> Teruskan Belanja</button>   
             </div>    
  <div className="flex centered">
    <button onClick={handleClearCart} className="w-full my-2 text-white bg-red-900 hover:bg-green-800 w-[80%] 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  uppercase"><i class="icofont-trash"></i>  Bersihkan Keranjang</button>   
             </div> 
             <div className="flex centered">
    <button onClick={handleCheckOut}  className="w-full my-2 text-white bg-orange-700 hover:bg-green-800 w-[80%] 
  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 
  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  uppercase">  Check Out</button>   
             </div> 


          
          
             </div>
                      
                        </div>
                  

</section>  
: <>
<div className="flex centered flex-col border-4 py-4 bg-green-600 text-white mb-20">
<p className="bold">Oppss... Keranjang belanja kosong</p>
<img src="/assets/img/empty-cart.webp" className="w-[100px] mx-auto mt-4" alt="delivery-order" /> 
</div>
<div className="flex flex-col centered ">
<h4 className="bold mb-4 font-DayOne text-4xl text-red-500">PESAN ANTAR?</h4>
<h4 className="bold mb-4">LEBIH MURAH PESAN LANGSUNG</h4>
<img src="/assets/img/delivery-order.webp" className="w-[100px] mx-auto mt-4" alt="delivery-order" /> 
<p className="text-justify mt-10"> Belanja online di aplikasi kami anda akan tetap mendapatkan harga retail standar dengan ongkir yang relatif sama dengan aplikasi GO-FOOD</p>
</div>
</>

}
</div>
  </>
)
}



