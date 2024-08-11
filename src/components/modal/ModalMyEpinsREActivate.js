import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
//import Router, { useRouter } from "next/router"
import axios from 'axios'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMyEpinsReactivate } from 'redux/reducers/ModalReducer'
import { setMyAllEpins } from 'redux/reducers/EpinReducer'
import { setModalMessage,  } from 'redux/reducers/ModalReducer'
import { setError, resetErrors } from 'redux/reducers/ErrorReducer'
import { setEpinselectedID, setEpinselectedValue, setEpinselectedIcon } from 'redux/reducers/ReactivateReducer'
import { setMyBreedingData,  setRunningDays, setBreedingProgress, setIsComplete  } from 'redux/reducers/BreedingReducer';
//--------------------------------------

export default function ModalMyEpinsReactivated() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    //  const router = useRouter()
    const dispatch = useDispatch()
    const { formError } = useSelector((state) => state.ErrorReducer)
    const { modalMyEpinsReactivate } = useSelector((state) => state.ModalReducer)
    const { myAllEpins } = useSelector((state) => state.EpinReducer)
    const { isLogin, isBinary, username, token, pvalue } = useSelector((state) => state.AuthReducer)
    const { epinselectedID, epinselectedValue, epinselectedIcon } = useSelector((state) => state.ReactivateReducer)
    const [spinner, setSpinner] = useState(false)


    useEffect(() => {
        if (isLogin && isBinary ) {
            getMyManekiPins()
        } else {
            // setSpinner(true)
            // setTimeout(() => {
            //     setSpinner(false)
            // }, 1000)
        }
        dispatch(resetErrors())  
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
       
        console.log( epinselectedID)
        console.log(epinselectedValue)
        console.log(epinselectedIcon)
        console.log(username)
        console.log(pvalue)

if(epinselectedID) {
setTimeout(()=>{
        if(epinselectedValue !== pvalue){ // prevent error front end
            dispatch(setPlaySound('error'))
        return dispatch(setError({ path: "slectedPin", message: 'Value must the same Current Package Value' }))
        }else{
            reActivation()
        }
        },100)

}
        
  

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [epinselectedID])


    useEffect(() => {

        document.body.classList.add('overflow-hidden')

        if (modalMyEpinsReactivate) {

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
    }, [modalMyEpinsReactivate])

    const handleCloseModal = () => {
        dispatch(setEpinselectedID(false))
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalMyEpinsReactivate(false))

        }, 500)
        document.body.classList.remove('overflow-hidden')
    }

    const reActivation = async () => {

        setSpinner(true)

const data = {
    epinselectedID,
    epinselectedValue,
    epinselectedIcon,
    username,
    pvalue
}


        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/package/reactivate`,
            method: 'POST',
             data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                const data = response.data
                console.log(data.totaltx)

                if (data.isSuccess) {

                    dispatch(setMyBreedingData(response.data.myBreeding))
                   // dispatch(setWallet(response.data.balance))
                    dispatch(setBreedingProgress(response.data.progress))
                    dispatch(setRunningDays(false))
                    dispatch(setIsComplete(data.myBreeding.completed))

                    handleCloseModal()
                   return dispatch(setPlaySound('success'))
                  
                } else {

                }

                // setReload(false)
                // return setSpinner(false)

            }).catch(function (error) {
                // setReload(false)
                // setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    const getMyManekiPins = async () => {

        setSpinner(true)


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
                console.log(data.totaltx)

                if (data.isSuccess) {
                    dispatch(setMyAllEpins(data.data))
                  
                } else {

                }

                // setReload(false)
                // return setSpinner(false)

            }).catch(function (error) {
                // setReload(false)
                // setSpinner(false)
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

const selectedEpin = (id, icon, value) => {
    dispatch(resetErrors())
    dispatch(setEpinselectedID(id))
    dispatch(setEpinselectedValue(value))
    dispatch(setEpinselectedIcon(icon))

    // if(epinselectedValue !== pvalue){
    //     return dispatch(setError({ path: "slectedPin", message: 'Maneki Value must the same value' }))
    // }
  //  handleCloseModal()
}



    return (
        <>
            <div className="_modal animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="relative  w-96 border-2 border-gray-200  bg-gray-800 mx-auto rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>

                    <div className="_modal-header py-2 text-left px-2 bg-purple-800">

                        <div className="flex justify-between items-center">
                            <p className="text-xl font-bold ml-4 text-white">SELECT MANEKI PACKAGE</p>
                            <div onClick={handleCloseModal} className="modal-close cursor-pointer z-50" >
                                <h1 className="icofont-close-circled text-yellow-400  text-4xl"></h1>
                            </div>
                        </div>
                        <p className="ml-4 text-white">Total : {myAllEpins && myAllEpins.length || 0} items</p>
                    </div>

                    <div className="modal-content  bg-gray-800 h-[600px]">
                        <div className="overflow-x-auto  h-[600px]">
                            <table className="w-full overflow-y-auto text-sm text-left text-gray-500 ">
                                <thead className="text-xs text-white uppercase bg-purple-900 border-b border-gray-600 h-[60px]">
                                    <tr>
                                        {/* <th className="py-2 text-center text-[12px]"> No  </th> */}
                                        {/* <th className="py-2 text-center text-[12px]"> PID  </th> */}
                                        <th className="py-2 text-center text-[12px]"> Maneki  </th>
                                        <th className="py-2 text-center text-[12px]"> Value   </th>
                                           <th className="py-2 text-center text-[12px]"> Breeding  </th>
                                           <th className="py-2 text-center text-[12px]"> Select  </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {myAllEpins && myAllEpins.map((item, index) => {
                                        return (
                                            <tr className="bg-gray-800 text-white h-12 border-b border-gray-600" key={index}>
                                                {/* <td className="max-w-md text-center text-[12px]"> {index + 1}</td> */}
                                              
                                                <td className="max-w-md text-center text-[12px]">
                                                <img src={`/assets/img/maneki/${item.icon}`} alt="icon" className=" h-[80px] mx-auto p-1" /> 
                                                </td>
                                                <td className="text-center text-[13px]">$ {item.value}</td>
                                                <td className="max-w-md text-center text-[12px]">  {
                                                parseFloat(item.roi) < 1 ? parseFloat(item.roi).toFixed(2):parseInt(item.roi)
                                                }</td> 
                                                  <td className="text-center">
                                                    <button onClick={() => selectedEpin(item.id, item.icon, item.value)}
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
                                    <p className="pt-10 text-white">You do not have any Manekies!</p>
                                </div>
                            }

                            
                {formError && formError.path === 'slectedPin' ?
                    <p className="text-yellow-300 ml-2 text-sm">
                        <span className="animate-ping inline-flex h-2 w-2 rounded-full bg-white opacity-75 mr-2" />
                        {formError.message}
                    </p>
                    : null
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

