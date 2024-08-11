import React, { useRef, useState, useEffect } from "react"
//import Link from 'next/link'
import Router, { useRouter } from "next/router"
import axios from 'axios'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalStoclkistSendEpin } from 'redux/reducers/ModalReducer'
import { setEpinsToSendArray } from 'redux/reducers/StockistReducer'
import { setMyAllEpins } from 'redux/reducers/EpinReducer'
//--------------------------------------

export default function ModalMyEpinsToSend() {

    const outsideRef = useRef()
    const overlayRef = useRef()
     const router = useRouter()
    const [spinner, setSpinner] = useState(false)
    const dispatch = useDispatch()
    const { modalStoclkistSendEpin } = useSelector((state) => state.ModalReducer)
    const { myAllEpins } = useSelector((state) => state.EpinReducer)
    const { epinsToSendArray } = useSelector((state) => state.StockistReducer)
    const [toSendArray, setTosendArray] = useState(epinsToSendArray ? epinsToSendArray : []) // use this beacuse can not directly update redux
    const { isLogin, username, phone, sponsor, token, status } = useSelector((state) => state.AuthReducer)

    //====== LOOP ======================
    const selectedEpin = (id) => {
        for (let i = 0; i < myAllEpins.length; i++) {
            const pid = myAllEpins[i].id
            if (pid === id) {
                setTosendArray(current => [...current, myAllEpins[i]])
                const fileterd = myAllEpins.filter((item) => item.id !== id)
                console.log(fileterd)
                dispatch(setMyAllEpins(fileterd))
            }
        }

    }

    // store epin to send on triggered
    useEffect(() => {
        if (toSendArray.length) {
            dispatch(setEpinsToSendArray(toSendArray))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toSendArray])

    // close modal if no more existing epins
    useEffect(() => {
        if (myAllEpins && myAllEpins.length < 1) {
            dispatch(setMyAllEpins(false))
             handleCloseModal()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myAllEpins])

    useEffect(() => {
        if (!myAllEpins) {
            getMyManekiPins()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [myAllEpins])


    const getMyManekiPins = async () => {

     

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/my-maneki?username=${username}`,
            method: 'GET',
            // data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data
                

                if (data.isSuccess) {
                    dispatch(setMyAllEpins(data.data))
                } 

            }).catch(function (error) {
                 console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }


    //========= MODAL FUNCTION =======================
    useEffect(() => {

        document.body.classList.add('overflow-hidden')

        if (modalStoclkistSendEpin) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {

                        //handleCloseModal() // not use. Modal close on click the last epin in table
                        //  console.log('click outside')

                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 100)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStoclkistSendEpin])

    const handleCloseModal = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalStoclkistSendEpin(false))
        }, 500)
        document.body.classList.remove('overflow-hidden')
    }

const handleRedirect = () => {
    handleCloseModal()
    router.push('/users/buy-maneki')
}

    return (
        <>
            <div className="_modal animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="relative  w-96 border-4 border-gray-200  bg-gray-800 mx-auto rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>

                    <div className="_modal-header py-2 text-left px-2 bg-purple-900">

                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold ml-4 text-white">My MANEKIES</p>

                            <div onClick={handleCloseModal} className="modal-close cursor-pointer z-50" >
                                <h1 className="icofont-close-circled text-yellow-400  text-4xl"></h1>
                            </div>
                        </div>
                        <p className="ml-4 text-white">Total Items : {myAllEpins && myAllEpins.length || 0} </p>
                    </div>

                    <div className="modal-content  bg-gray-800 h-[500px]">
                        <div className="overflow-x-auto  h-[420px]">
                            <table className="w-full overflow-y-auto text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-white uppercase bg-gray-700 border-b border-gray-600">
                                    <tr>
                                        <th className="py-2 text-center text-[12px]"> Maneki  </th>
                                        <th className="py-2 text-center text-[12px]"> Value  </th>
                                        {/* <th className="py-2 text-center text-[12px]"> Gas Fee  </th> */}
                                        <th className="py-2 text-center text-[12px]"> Select  </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {myAllEpins && myAllEpins.map((item, index) => {
                                        return (
                                            <tr className="bg-gray-800 text-white h-12 border-b border-gray-600" key={index}>
                                                <td className="max-w-md text-center text-[12px]">
                                                <img src={`/assets/img/maneki/${item.icon}`} alt="icon" className=" h-[80px] mx-auto p-1" /> 
                                                </td>
                                                <td className="text-center text-[13px]">{item.value}</td>
                                                
                                                <td className="text-center">
                                                    <button onClick={() => selectedEpin(item.id)}
                                                        className="bg-gray-800 hover:bg-gray-700 border-gray-500 border py-1 px-2 rounded-full text-xs">
                                                        Select</button>
                                                </td>
                                            </tr>
                                        )
                                    })}

                                    {!spinner && !myAllEpins &&
                                        <tr className="bg-gray-800 text-white text-center h-12 border-b border-gray-600">
                                            <td colSpan={4} className="text-sm">You do not have any Epins!</td>
                                        </tr>
                                    }


                                </tbody>
                            </table>

                            <button onClick={handleRedirect}  className="_gradient_blue mt-10 text-white text-xl  mx-auto py-1 mt-2 border-4 border-gray-300
                     rounded-full px-6  flex justify-center items-center">
                        <i className="icofont-double-right mr-2 text-[12px]" />  Click here to Buy Maneki</button>
                        </div>
                    </div>

                </div>
            </div>


        </>
    );
}

