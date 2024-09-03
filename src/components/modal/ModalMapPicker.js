import React, { useRef, useEffect, useState } from "react"
import MapPicker from 'components/map/MapPicker'
import dynamic from 'next/dynamic'
const GeoMapMarkersCheckOut = dynamic(() => import("components/map/GeoMapMarkersCheckOut"), {
  ssr: false,
})
import { useSelector, useDispatch } from 'react-redux'
import { setModalMapPicker } from 'redux/reducers/ModalReducer'
//---------------------------------------------
export default function ModalLogins() {

    const outsideRef = useRef()
    const overlayRef = useRef()
    const dispatch = useDispatch()
    const { modalMapPicker } = useSelector((state) => state.ModalReducer)
 
    useEffect(() => {
        if (modalMapPicker) {

            setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

                const checkIfClickedOutside = e => {
                    if (outsideRef.current && !outsideRef.current.contains(e.target)) {
                        document.body.classList.remove('overflow-hidden')
                        handleCloseModal()
                    }
                }
                document.addEventListener("click", checkIfClickedOutside)
                return () => {
                    document.removeEventListener("click", checkIfClickedOutside)
                }
            }, 500)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalMapPicker])

    const handleCloseModal = () => {
        if (overlayRef.current) {
            overlayRef.current.classList.add('zoomOut')
        }
        setTimeout(() => {
            dispatch(setModalMapPicker(false))
            document.body.classList.remove('overflow-hidden')
        }, 500)

    }

    return (
        <>
            <div className="fixed w-full inset-0   overflow-hidden flex justify-center items-center animated" style={{ zIndex: 100 }} ref={overlayRef}>
                <div className=" relative border-2 shadow-2xl   mx-auto rounded-xl z-50 overflow-y-auto w-96 animated zoomIn" ref={outsideRef}>
                    <i className="icofont-close-circled absolute top-1 right-2 text-3xl text-orange-400 cursor-pointer"
                        />

                    <div className="modal-contenXt bg-sky-700 py-4 px-4">

                      
                  <MapPicker/>
                               
                      
                      
                    <div className="flex justify-center mt-10">
                 
                    </div>

                    </div>
                </div>
            </div>


        </>
    );
}

