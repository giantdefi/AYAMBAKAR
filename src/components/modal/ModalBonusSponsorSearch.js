import React, { useRef, useEffect, useState } from "react"
//import Link from 'next/link'
//import Router, { useRouter } from "next/router"
import axios from 'axios'

//import KeyboardSearchUsername from "components/inputforms/auth/KeyboardSearchUsername"
import BonusSponsorSearchUsername from "components/inputforms/activate-binary/BonusSponsorSearchUsername"

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setModalSponsorHistorySearch } from 'redux/reducers/ModalReducer'
import { setBonusSponsorHistory, setTotalBonusSponsorTsx, setTotalBonusSponsor } from 'redux/reducers/HistoryReducer'
import { setSearchUsername } from 'redux/reducers/FormReducer'
import { setSpinner } from 'redux/reducers/LoaderReducer'
import { setModalPleaseLogin } from 'redux/reducers/ModalReducer'
//--------------------------------------


export default function ModalBonusSponsorSearch() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    const { spinner } = useSelector((state) => state.LoaderReducer)
    const { searchUsername } = useSelector((state) => state.FormReducer)
    const { isLogin, isBinary, username, token } = useSelector((state) => state.AuthReducer)
    const dispatch = useDispatch()
    const { modalSponsorHistorySearch } = useSelector((state) => state.ModalReducer)

    useEffect(() => {
        document.body.classList.add('overflow-hidden')

        if (modalSponsorHistorySearch) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {

                        //   handleCloseModal() // close with toogle number????

                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 100)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalSponsorHistorySearch])


    const handleCloseModal = () => {
        document.body.classList.remove('overflow-hidden')
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalSponsorHistorySearch(false))

        }, 500)
    }

    const handleFromUserSearch = () => {
        dispatch(setSpinner(true))
        setTimeout(() => {
            bonusSponsorHistory(searchUsername) // from form
        }, 500)
    }

    const bonusSponsorHistory = async (searchUsername) => {

        if (!searchUsername) {
            dispatch(setSpinner(false))
            return handleCloseModal()
        }

        if (!isLogin && !isBinary) {
            dispatch(setSpinner(false))
            dispatch(setSearchUsername(false))
            dispatch(setModalPleaseLogin(true))
            return handleCloseModal()
        }

        dispatch(setSpinner(true))

        const URL = process.env.NEXT_PUBLIC_API_URL_V1
        return axios({
            url: `${URL}/users/search-from-bonus-sponsor?username=${username}&user=${searchUsername}`,
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
                    dispatch(setBonusSponsorHistory(data.dataLimit))
                    dispatch(setTotalBonusSponsorTsx(data.totalAllTxs))
                    dispatch(setTotalBonusSponsor(data.totalAllBonus))
                } else {
                    dispatch(setModalMessage({ type: 'warning', title: "User Not Found!", message: 'Search User is not found' }))
                }

                dispatch(setSpinner(false))
                return handleCloseModal()

            }).catch(function (error) {
                dispatch(setSpinner(false))
                console.log(error)
                return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
            })
    }

    return (
        <>
             <div className="_modal animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className="relative  min-w-[500px] border-4 border-gray-400  bg-gray-800 mx-auto 
                rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-2 right-2 text-3xl text-orange-400 cursor-pointer"
                        onClick={handleCloseModal} />
                    <div className="modal-content text-white py-4  pb-10 px-4">

                        <h5 className="text-gray-100 uppercase font-semibold"> SEARCH FROM USER </h5>

                        <BonusSponsorSearchUsername />

                    </div>



                </div>
            </div>


        </>
    );
}

