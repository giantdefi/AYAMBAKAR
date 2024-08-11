import React, { useRef, useState, useEffect } from "react"
//import Link from 'next/link'
//import Router, { useRouter } from "next/router"

import BtnConvertSalesPairing from "redux/actions/BtnConvertSalesPairing"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalConvertPairing } from 'redux/reducers/ModalReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//--------------------------------------

export default function ModalConvertPairing() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    //  const router = useRouter()
    const dispatch = useDispatch()
    const { currency } = useSelector((state) => state.GeneralReducer)
    const { modalConvertPairing } = useSelector((state) => state.ModalReducer)
    const [spinner, setSpinner] = useState(false)
    const { isLogin, isBinary, username, token, sponsor } = useSelector((state) => state.AuthReducer)
    const { binary_level_1 } = useSelector((state) => state.MtreeReducer)
    const { onePairValue } = useSelector((state) => state.BinaryReducer)
    const [pairs, setPairs] = useState(false)
    const [bonus, setBonus] = useState(false)
    const [remainingLeft, setRemainingLeft] = useState(false)
    const [remainingRight, setRemainingRight] = useState(false)



    useEffect(() => {

        const sales_left = parseInt(binary_level_1.sales_left)
        const sales_right = parseInt(binary_level_1.sales_right)

        //  console.log(sales_left)
        //   console.log(sales_right)


        const indexs = 20 //  1 pair
        let pairs = 0

        if (sales_left > sales_right) {
           // pairs = Math.floor(sales_right / indexs)
           if (sales_right >= 20) {
            pairs = Math.floor(sales_right / indexs)
        }
        } else if (sales_left < sales_right) {
           // pairs = Math.floor(sales_left / indexs)
           if (sales_left >= 20) {
            pairs = Math.floor(sales_left / indexs)
        }
        } else if (sales_left === sales_right) {
           // pairs = Math.floor(sales_left / indexs) // left or right is the same
           if (sales_left >= 20) { // left or right is the same
            pairs = Math.floor(sales_left / indexs) // left or right is the same
        }
        }

        //  console.log(pairs)

        let remaining_left = 0
        let remaining_right = 0

        remaining_left = sales_left - (pairs * indexs)
        remaining_right = sales_right - (pairs * indexs)

        setPairs(pairs)
        setBonus(pairs * parseInt(onePairValue)) // $2 per pair
        setRemainingLeft(remaining_left)
        setRemainingRight(remaining_right)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //console.log(remainingLeft)
    // console.log(remainingRight)

    useEffect(() => {
        if (modalConvertPairing) {
            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called
                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        handleCloseModal()
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 100)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalConvertPairing])

    const handleCloseModal = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalConvertPairing(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }




    return (
        <>

            {binary_level_1 && binary_level_1.username === username &&

                <div className="_modal animated" style={{ zIndex: 100 }} ref={overlayRef}>
                    <div className="relative  w-96 border-2 border-gray-400  bg-gray-800 mx-auto 
                    rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>

                        <div className="_modal-header py-4 text-left px-2 bg-purple-900">

                            <div className="flex justify-between items-center">
                                <p className="text-xl font-semibold ml-4 text-white">MATCHING BONUS</p>
                                <div onClick={handleCloseModal} className="modal-close cursor-pointer z-50" >
                                    <h1 className="icofont-close-circled text-yellow-400  text-4xl"></h1>
                                </div>
                            </div>
                        </div>

                        <div className="modal-content  _gradient_mtree  text-white ">
                            <div className="overflow-x-auto  min-h-[360px] pb-4">


                                <div className="col">
                                    <div className="text-center mt-5">
                                        <div className="row m-0 p-0">
                                            <div className="col text-center">

                                                <div className="flex flex-col justify-center items-center ">
                                                    <div className="flex flex-col justify-center items-center 
                                                     border-4 border-gray-200 rounded-full w-[100px] h-[97px]">
                                                        <div className="flex justify-center items-center p-0 m-0">
                                                            {binary_level_1.avatar ?
                                                                < img className="rounded-full" src={binary_level_1.avatar} alt="user" width={150} />
                                                                :
                                                                <img className="rounded-full" src="/assets/img/avatar.webp" alt="user" width={150} />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-2">{binary_level_1.username || 'YOU'}</p>
                                                <p className="text-xs">{binary_level_1.package || ''} {binary_level_1.value || ''}</p>
                                            </div>
                                        </div>

                                        <div className="-space-y-1 text-white">
                                            <div className="row m-0 p-0">
                                                <div className="col  text-right my-0 ">
                                                    <small title="Total member Left">  {binary_level_1.total_users_left}</small>
                                                </div>
                                                <div className="col left-lined text-left my-0 ml-0">
                                                    <small title="Total member Right "> {binary_level_1.total_users_right} </small>
                                                </div>
                                            </div>

                                            <div className="row m-0 p-0">
                                                <div className="col pr-1 text-right my-0 ">
                                                    <small title="Today omset Left">  {binary_level_1.sales_left}</small>
                                                </div>
                                                <div className="col pl-1 left-lined text-left my-0 ">
                                                    <small title="Today omset Right"> {binary_level_1.sales_right} </small>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                                <div className="row mb-2">
                                    <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '55%', borderTop: '1px solid #888', borderLeft: '1px solid #888', borderRight: '1px solid #888', height: 15 }} />
                                </div>

                                <div className="text-center mb-4">
                                    <p className="">Total pairs = {pairs || 0} </p>
                                    <p className="">Total bonus = {bonus || 0}  {currency}</p>
                                    <p className="">Pending Sales =
                                        <span className="text-yellow-400"> {remainingLeft || 0} Left | {remainingRight || 0} Right</span></p>
                                </div>

                                <BtnConvertSalesPairing />

                                <div className="text-center mt-4">
                                    <p className="">Note that Flash Out may be applied</p>
                                    <p>Maximum daily pairs = 100 pairs or 200  {currency}</p>
                                </div>

                                {/* <div className="absolute bottom-5">
                                    <div onClick={handleCloseModal} className="modal-close cursor-pointer" >
                                        <button className="border py-1 px-2 text-white bg-red-800 border-gray-500 rounded-r-full ">
                                            <span className="icofont-close-circled text-yellow-400  mr-2 text-lg"></span>
                                            Close</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>
                </div>

            }
        </>
    );
}

