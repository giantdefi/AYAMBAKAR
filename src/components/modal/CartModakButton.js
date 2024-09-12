import React, { useEffect, useRef, useState } from "react"
import Router, { useRouter } from "next/router"

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalCartButton } from 'redux/reducers/ModalReducer'
//-------------------------------------------------------

export default function PopupNewUser() { // from NewUserJoinWithPopup.js in folder layout/main

    const outsideRef = useRef(null)
    const overlayRef = useRef(null)
    const router = useRouter()
    // redux store
    const dispatch = useDispatch()
    const { modalCartButton } = useSelector((state) => state.ModalReducer)
    const { shoppingCart, selectedItem } = useSelector((state) => state.CartReducer)
   
    const [clicked, setClicked] = useState(false)
    const[totalItem, setTotalItem] = useState(false)

    useEffect(() => {
  
    //    const totalItem = shoppingCart[selectedItem.pid].quantity
    //    console.log(totalItem)
    console.log('================shoppingCart')
    console.log(shoppingCart)

    for(let i=0; i < shoppingCart.length; i++) {
        console.log('================shoppingCart.pid')
        console.log(shoppingCart[i].pid)
        console.log(selectedItem.pid)
       
        if(shoppingCart[i].pid === selectedItem.pid){
            console.log('ok same')
            console.log(shoppingCart[i].quantity)
            setTotalItem(shoppingCart[i].quantity)
        }
    }

   
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [shoppingCart])

    const handleModalClose = () => {
        document.body.classList.remove('overflow-hidden') // prevent body scroll on modal open
        if(outsideRef.current){
            outsideRef.current.classList.add('zoomOut');
            overlayRef.current.classList.add('fadeOut');
            }
        setTimeout(() => { // delay close to enable animation working first
            dispatch(setModalCartButton(false))
        }, 1000)
    }


    useEffect(() => {
        if (modalCartButton) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        setTimeout(() => {
                            handleModalClose()
                        document.body.classList.remove('overflow-hidden')
                        }, 20000) 
                        
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 1000)
        }

        setTimeout(() => {
            handleModalClose()
          }, 20000) 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalCartButton])


    console.log(totalItem)


    return (
        <>

            <div className="_modal_user_join left-2 animated" ref={overlayRef}>
                <div className="relative shadow-full    animated fadeInUp w-full md:w-1/2 mx-auto"
                    ref={outsideRef} >

                   {selectedItem && 
                    <div  className="bg-sky-700 cursor-pointer 
                    relative text-white flex flex-row items-center px-1 rounded-xl border-2 border-gray-300"> 
                        <div className="flex items-center ">
                            
                               
                                    <img src={selectedItem.img} alt="avatar" className="rounded-full border-2 border-gray-400  w-[60px] h-[60px] animate-pulse" />
                               

                            
                           

                            <div className="w-full flex flex-col mt-1 items-left ml-6">
                               <p className="ml-2 text-white text-sm bold"><i className="icofont-cart-alt text-2xl"></i> Masuk keranjang</p>
                               
                                  
                                <p className="ml-2  text-white ">{selectedItem.title}</p>
                                <p className="ml-2  text-white ">Rp. {(selectedItem.price2).toLocaleString('id-ID')+',-'} X {totalItem} item</p>
                                <div className="flex justify-between items-center w-full">
                                    <p className="ml-2 text-[10px] text-yellow-200"><i></i></p>
                                    {/* <p className="-mr-2 text-[12px] border bg-pink-700 px-2 rounded-lg mb-1 bold"><i className="icofont-arrow-right"></i> M-tree</p> */}
                                </div>
                            </div>
                        </div>

                    </div>
}
                </div>
            </div>


        </>
    )
}

