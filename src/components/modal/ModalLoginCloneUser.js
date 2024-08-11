import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
//import Router, { useRouter } from "next/router"
import bcrypt from 'bcryptjs'
import axios from 'axios'

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'


import { setError } from 'redux/reducers/ErrorReducer'
import { setLogout } from 'redux/reducers/AuthReducer'
import { resetForm } from 'redux/reducers/FormReducer'
//import { resetFormData } from 'redux/reducers/FormDataReducer'
import { resetUpload } from 'redux/reducers/UploadReducer'
import { resetBinary } from 'redux/reducers/BinaryReducer'
import { resetActivation } from 'redux/reducers/ActivationReducer'
import { resetMtree } from 'redux/reducers/MtreeReducer'
import { resetAffiliate } from 'redux/reducers/AffiliateReducer'
import { resetEpins } from 'redux/reducers/EpinReducer'
import { resetTransaction } from 'redux/reducers/TransactionReducer'
//import { resetMyPackage } from 'redux/reducers/PackageReducer'
import { resetHistory } from 'redux/reducers/HistoryReducer'
//import { resetRefLink } from 'redux/reducers/ReferralReducer'
import { resetSetting } from 'redux/reducers/SettingReducer'
import { resetForgot } from 'redux/reducers/ForgotReducer'
import { resetStats } from 'redux/reducers/AdminReducer'

import { resetStockist } from 'redux/reducers/StockistReducer'


import { setModalLoginCloneUser, setModalMessage, setModalToast } from 'redux/reducers/ModalReducer'
import { resetFinance, setReloadBalance } from 'redux/reducers/FinanceReducer' 
import { resetBreeding } from 'redux/reducers/BreedingReducer' 
import { resetUsers, setAllowReloadClonUser, setNameFull } from 'redux/reducers/UsersReducer'
import {  setIsLogin, setUsername,setWallet,setIsStokist, setToken, setSponsor, setIsActive, setIsBinary, setPackage, setPvalue, setLoginAsClone } from 'redux/reducers/AuthReducer'
//--------------------------------------

export default function ModalLoginCloneUser() {

    const outsideRef = useRef()
    const overlayRef = useRef()

    const dispatch = useDispatch()
    const [spinner, setSpinner] = useState(false)
    const { username, token } = useSelector((state) => state.AuthReducer)
    const { cloneLoginUsername, allowReloadPage } = useSelector((state) => state.UsersReducer)
    const { modalLoginCloneUser } = useSelector((state) => state.ModalReducer)


    const handleLogin = () => {

        setSpinner(true)

      

        dispatch(resetForm())
        dispatch(resetBreeding())
      
        dispatch(resetBinary())
        dispatch(resetAffiliate())
        dispatch(resetFinance())
       // dispatch(resetMyPackage())
        dispatch(resetActivation())
        dispatch(setError(false))
        dispatch(resetMtree())
        dispatch(resetEpins())
        dispatch(resetTransaction())
        dispatch(resetHistory())
      //  dispatch(resetForgot())
        // dispatch(resetRefLink())
        dispatch(resetUsers()) // clone
        dispatch(resetSetting())
      
        dispatch(resetStockist())

        dispatch(setLogout())
        handleLoginDelay()

    }

    const handleLoginDelay = async () => {

        const data = {
            username,
            loginuser: cloneLoginUsername,

        }

        // console.log(data)

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/clone/authclone`,
            method: 'POST',
            data,
            'headers': {
                'Authorization': token,
                accept: 'application/json',
                'content-type': 'application/json',
            }
        })
            .then(async response => {

                if (response.data.isSuccess) {
                  
                    const token = response.data.token
                    const dataLogin = response.data.dataLogin
                    const dataUser = response.data.dataUser
                    console.log(dataLogin)
                   
                    dispatch(setIsLogin(true))
                    dispatch(setToken(token))
                    dispatch(setUsername(dataLogin.username))
                    dispatch(setIsActive(dataLogin.isActive))
                    dispatch(setIsBinary(dataLogin.isBinary))
                
                    dispatch(setIsStokist(dataLogin.isStokist))
                    dispatch(setNameFull(dataUser.fullname))

                    dispatch(setSponsor(dataUser.dataSponsor))
                                   
                    dispatch(setWallet(dataLogin.wallet)) 
                    dispatch(setPackage(dataLogin.package)) 
                    dispatch(setPvalue(dataLogin.pvalue)) 


                   

                    dispatch(setAllowReloadClonUser(true)) // reload table
                    dispatch(setModalLoginCloneUser(false)) // close modal

                   // dispatch(setReloadBalance(true)) setModalToast
                 //  return dispatch(setModalToast({ type: 'success', title: "LOGIN SUCCESS", message: 'Change Login is succesfull!' }))
                 return
                } else {

                    dispatch(setError({ path: response.data.path, message: response.data.message }))
                }

                setSpinner(false)

            }).catch(function (error) {
                console.log(error)
                setSpinner(false)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    useEffect(() => {
        if (modalLoginCloneUser) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        //   document.body.classList.add('overflow-hidden')
                        // handleCloseModal()
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 100)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalLoginCloneUser])

    const handleCloseModal = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalLoginCloneUser(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }






    return (
        <>
            <div className="fixed w-full inset-0 overflow-hidden flex justify-center items-center animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="_gradient_slate  min-w-[400px] relative border-2 shadow-2xl   mx-auto rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-2 right-2 text-3xl text-orange-400 cursor-pointer"
                        onClick={handleCloseModal} />
                    <div className="modal-content text-white py-4  pb-10 px-4">

                        <h5 className="text-gray-100 uppercase font-semibold"> CHANGE LOGIN SESSION </h5>


                        <div className="w-full  mt-4">
                            <p>Confirm to Log Out </p>
                            <p>and LOGIN as : {cloneLoginUsername}</p>
                        </div>


                        <div className="flex justify-between items-center  mt-4">
                            <button onClick={handleCloseModal} className="_btn_submit_red ">
                                Cancel
                            </button>
                            <button onClick={handleLogin} className="_btn_submit_green border-2 border-gray-400">
                                YES CONTINUE
                                {spinner ?
                                    <svg style={{ maxWidth: 40 }} role="status" className="ml-2 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg> :
                                    <i className="icofont-thin-double-right ml-2"></i>
                                }
                            </button>

                        </div>

                    </div>
                </div>
            </div>


        </>
    );
}

