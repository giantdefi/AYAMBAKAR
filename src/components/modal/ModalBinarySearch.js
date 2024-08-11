import React, { useRef, useEffect } from "react"
//import Link from 'next/link'
//import KeyboardBinarySearch from "components/inputforms/auth/KeyboardBinarySearch"
import UserBinarySearch from "components/inputforms/auth/BinarySearchUser"
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalBinarySearch } from 'redux/reducers/ModalReducer'
//--------------------------------------

export default function ModalBinarySearch() {

  const outsideRef = useRef()
  const overlayRef = useRef()

  const dispatch = useDispatch();
  const { modalBinarySearch } = useSelector((state) => state.ModalReducer)

  useEffect(() => {

    if (modalBinarySearch) {

      setTimeout(() => { // must use this to little bit delay click outside. Otherwise modal will immediatelly close when it called

        const checkIfClickedOutside = e => {
          if (outsideRef.current && !outsideRef.current.contains(e.target)) {
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
  }, [modalBinarySearch])

  const handleCloseModal = () => {
    if (overlayRef.current) {
      overlayRef.current.classList.add('zoomOut')
    }
    setTimeout(() => {
      dispatch(setModalBinarySearch(false))
      document.body.classList.remove('overflow-hidden')
    }, 500)
  }



  return (
    <>
      <div className="_modal animated" style={{ zIndex: 100 }} ref={overlayRef}>
        <div className="relative w-[400px] border-2 border-gray-400  bg-gray-800 mx-auto 
                rounded-xl z-50 overflow-y-auto  animated zoomIn" ref={outsideRef}>

          <div className="modal-content px-2 bg-gray-800 min-h-[280px] mb-10  pt-10">

             <UserBinarySearch /> 

          </div>
          <div className="flex justify-between">
            <div onClick={handleCloseModal} className="modal-close cursor-pointer z-50" >
              <button className="border py-2 px-4 text-white bg-red-800 border-gray-500 rounded-r-full  mb-4">
                <span className="icofont-close-circled text-yellow-400  mr-2 text-lg"></span>
                CLOSE</button>
            </div>

            {/* <div onClick={handleCloseModal} className="modal-close cursor-pointer z-50" >
              <button className="border py-2 px-4 text-white bg-green-800 border-gray-500 rounded-l-full  mb-4">
                <span className="icofont-thumbs-up text-yellow-400  mr-2 text-lg"></span>
                OK DONE</button>
            </div> */}
          </div>



        </div>
      </div>



    </>
  );
}

