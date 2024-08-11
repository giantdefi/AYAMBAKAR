import React, { useRef, useState, useEffect } from "react"
//import Link from 'next/link'
//import Router, { useRouter } from "next/router"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMyEpins } from 'redux/reducers/ModalReducer'

import { setSelectedEpinPackage, setSelectedEpinValue, setSelectedEpinID, setSelectedEpinGas } from 'redux/reducers/ActivationReducer'
//--------------------------------------

export default function ModalMyEpinsActivate() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    //  const router = useRouter()
    const dispatch = useDispatch()
    const { modalMyEpins } = useSelector((state) => state.ModalReducer)
    const { myAllEpins } = useSelector((state) => state.EpinReducer)
    //const [spinner, setSpinner] = useState(false)

    useEffect(() => {

        document.body.classList.add('overflow-hidden')

        if (modalMyEpins) {

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
    }, [modalMyEpins])

    const handleCloseModal = () => {
        if (overlayRef.current) {

            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalMyEpins(false))

        }, 500)
        document.body.classList.remove('overflow-hidden')
    }

    const selectedEpin = (id, pack, value, gas) => {
        dispatch(setSelectedEpinID(id))
        dispatch(setSelectedEpinPackage(pack))
        dispatch(setSelectedEpinValue(value))
      //  dispatch(setSelectedEpinGas(gas))

        handleCloseModal()
    }

    return (
        <>
            <div className="_modal animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="relative  w-96 border-4 border-gray-200  bg-gray-800 mx-auto rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>

                    <div className="_modal-header py-2 text-left px-2 bg-purple-800">

                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold ml-4 text-white">My MANEKI</p>

                            <div onClick={handleCloseModal} className="modal-close cursor-pointer z-50" >
                                <h1 className="icofont-close-circled text-yellow-400  text-4xl"></h1>
                            </div>
                        </div>
                        <p className="ml-4 text-white">Total : {myAllEpins && myAllEpins.length || 0} Items</p>
                    </div>

                    <div className="modal-content  bg-gray-800 h-[500px]">
                        <div className="overflow-x-auto  h-[420px]">
                            <table className="w-full overflow-y-auto text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-white uppercase bg-gray-700 border-b border-gray-600">
                                    <tr>
                                        <th className="py-2 text-center text-[12px]"> Maneki  </th>
                                        <th className="py-2 text-center text-[12px]"> Value  </th>
                                        <th className="py-2 text-center text-[12px]"> Breeding  </th>
                                        <th className="py-2 text-center text-[12px]"> Select  </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {myAllEpins && myAllEpins.map((item, index) => {
                                        return (
                                            <tr className="bg-gray-800 text-white h-12 border-b border-gray-600" key={index}>
                                                <td className="max-w-md text-center text-[12px]">   <img src={`/assets/img/maneki/${item.icon}`} alt="banner" className="w-16 ml-6 py-2" /></td>
                                                <td className="text-center text-[13px]">{item.value}</td>
                                                <td className="text-center text-[13px]">{parseFloat(item.roi).toLocaleString()}</td>
                                                <td className="text-center">
                                                    <button onClick={() => selectedEpin(item.id, item.icon, item.value, item.gas_fee)}
                                                        className="bg-gray-800 hover:bg-gray-700 border-gray-500 border py-1 px-2 rounded-full text-xs">
                                                        Select</button>
                                                </td>
                                            </tr>
                                        )
                                    })}



                                </tbody>
                            </table>

                            {!myAllEpins &&
                                <div className="text-center">
                                    <p className="pt-10 text-white">You do not have any Maneki!</p>
                                </div>
                            }


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


        </>
    );
}

