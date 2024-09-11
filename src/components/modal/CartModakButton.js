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
    const { selectedItem } = useSelector((state) => state.CartReducer)
 
    const [clicked, setClicked] = useState(false)

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
                        handleModalClose()
                        document.body.classList.remove('overflow-hidden')
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
          }, 10000) 

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalCartButton])


    const handelJumpToBinary = (user) => {
        setClicked(true)

        setTimeout(() => {
            handleModalClose()
            dispatch(setModalJoinBinary(false)) // if this modal open
            dispatch(setModalConvertPairing(false)) // if this modal open
            dispatch(setLoadUsername(user))
            setTimeout(() => {
                router.push('/users/m-tree') // prevent flashing
            })
        })
    }

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
                                <p className="ml-2  text-white ">Rp. {(selectedItem.price).toLocaleString('id-ID')+',-'} </p>
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

