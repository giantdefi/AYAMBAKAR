import React, { useState, useRef, useCallback, useEffect } from "react"
import Cropper from 'react-easy-crop'
import CroptHelper from './CroptHelper'
import axios from "axios"

import { blobToBase64, base64ToBlob } from './ImageOptimizerWebp'

//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setAvatar } from 'redux/reducers/AuthReducer'
import { setUploadImageBlob, setImageBlob } from 'redux/reducers/UploadReducer'
import { setPlaySound } from 'redux/reducers/SoundReducer'
//-------------------------------------------------------

export default function UploadAvatarCrop() {

    const fileUploadnRef = useRef()
    const dispatch = useDispatch()

    const [myFile, setMyFile] = useState(null)

    //  const { sellerData } = useSelector((state) => state.SellersReducer)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [spinnerBtn, setSpinnerBtn] = useState(false)
    //   const [imageBlob, setImageBlob] = useState(false)
    const { isLogin, username, avatar } = useSelector((state) => state.AuthReducer)
    const { imageUploadBlob, imageBlob } = useSelector((state) => state.UploadReducer)
    const [modalOpen, setModalOpen] = useState(false)

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const showCroppedImage = useCallback(async () => {

        setModalOpen(false)

        dispatch(setImageBlob(false)) // reset blob preview

        setTimeout(() => {
            dispatch(setImageBlob("/assets/img/loader1.gif")) // show loading spinner
        }, 10)

        try {
            const croppedImage = await CroptHelper(
                myFile,
                croppedAreaPixels,
                rotation
            )
            setTimeout(() => {
                dispatch(setImageBlob(croppedImage)) // set preview with blob
            }, 1000)
        } catch (e) {
            console.error(e)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [croppedAreaPixels, rotation, myFile])


    const handleGetFile = (e) => {
        if (e.target.files.length !== 0) {
            const blob = (window.URL || window.webkitURL).createObjectURL(e.target.files[0])
            if (blob) {
                setModalOpen(true)
                setMyFile(blob)
            }
        } else {
            alert('file undefined')
        }
    }

    const handleUploadButton = () => {

        fileUploadnRef.current.click()
    }



    const handleUploadImage = async () => {

        if (!isLogin) {
            dispatch(setPlaySound('error'))
            return dispatch(setModalMessage({ type: 'danger', title: "Login Required!", message: 'Please Login to continue' }))
        }

        if (!imageBlob) return false


        setSpinnerBtn(true)
        //  dispatch(setBtnSpinner(true))

        const base64 = await blobToBase64(imageBlob) // Optimize image and convert to WEBP format
        const optimizedImg = base64ToBlob(base64) // turn back to blob as webp format before upload

        console.log(optimizedImg)


        const data = new FormData()

        data.append("file", optimizedImg)
        data.append("action", "UPLOAD AVATAR")
        data.append("username", username)

        const URL = process.env.NEXT_PUBLIC_API_URL
        return axios({
            url: `${URL}/upload`,
            method: 'POST',
            data,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            responseType: 'json'
        })
            .then(async response => {


                if (response.data.isSuccess) {
                    const avatar = response.data.avatar

                    dispatch(setAvatar(false))

                    setTimeout(() => { // will running after reload
                        dispatch(setAvatar(avatar))
                    })

                    dispatch(setUploadImageBlob(imageBlob))

                    dispatch(setModalMessage({ type: 'success', title: "Upload Success", message: 'Change Avatar is successfull' }))

                    dispatch(setImageBlob(false))
                    setMyFile(null)

                } else {
                    console.log(response.data)
                }

                setSpinnerBtn(false)

            }).catch(function (error) {
                setSpinnerBtn(false)
                console.log(error)
                dispatch(setModalMessage({ type: 'danger', title: "Upload Error", message: error }))

            })
    }


    const handleCancelUpload = () => {
        dispatch(setImageBlob(false))
        fileUploadnRef.current.value = null
    }

    const handleCancel = () => {
        setModalOpen(false)
        dispatch(setImageBlob(false))
        fileUploadnRef.current.value = null
    }

    return (
        <>
            <input className="hidden" type="file" accept="image/png, image/jpeg, image/webp" name="myfile" onChange={(e) => handleGetFile(e)} ref={fileUploadnRef} />

            <div className="flex flex-col items-center justify-center ">

                <img className="w-[180px] border-2 bg-gray-900 border-dashed rounded-full" title="Click to change image"
                    src={imageBlob ? imageBlob : imageUploadBlob ? imageUploadBlob : avatar ? avatar : '/assets/img/user.png'}
                    alt="avatar"
                />

                {!imageBlob &&
                    <div className="flex justify-center items-center mt-5">
                        <button onClick={handleUploadButton} className="_gradient_green rounded-full  text-sm border-2 px-4 py-1">
                            Change Avatar</button>
                    </div>
                }

                {imageBlob &&
                    <div className="w-full flex flex-row justify-around  mt-4">

                        {!spinnerBtn &&
                            <button onClick={handleCancelUpload}
                                className="border-2 border-white px-4 py-1 bg-red-500 bottom-0 rounded-full text-white hover:bg-purple-700 text-sm">
                                Cancel
                            </button>}

                        {spinnerBtn ?
                            <button className="border-2 border-white px-4 py-1 bg-purple-500 bottom-0 rounded-full text-white hover:bg-purple-700 text-sm">
                                <svg role="status" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                Upload
                            </button>
                            :
                            <button onClick={handleUploadImage} className="border-2 border-white px-4 py-1 bg-purple-500 bottom-0 rounded-full text-white hover:bg-purple-700 text-sm">
                                Upload
                            </button>}


                    </div>
                }

            </div>


            {modalOpen &&
                <div className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center " style={{ background: 'rgba(0,0,0,0.1)' }}>
                    <div className="border-gray-700  shadow-2xl bg-white  mx-auto rounded-lg z-50 overflow-y-auto " >

                        <div className="modal-content relative p-2">

                            <div className=" p-2 bg-blue  bg-slate-300 rounded-lg shadow-md w-full ">

                                <div className=" relative h-64 bg-black">
                                    <Cropper
                                        image={myFile}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={1 / 1}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                        cropShape={'round'}
                                    />
                                </div>

                                <div className="mx-auto w-1/2 mt-2">
                                    <input
                                        type="range"
                                        value={zoom}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        aria-labelledby="Zoom"
                                        onChange={(e) => {
                                            setZoom(e.target.value)
                                        }}
                                        className="zoom-range"
                                    />
                                </div>
                                <div className="flex justify-between gap-2 pt-4 px-4">
                                    <button className="border-2 border-white px-3 py-1 bg-red-500  
                                    rounded-full text-white hover:bg-red-400 text-sm" onClick={handleCancel}>CANCEL</button>
                                    <button className="border-2 border-white px-3 py-1 bg-blue-500  
                                    rounded-full text-white hover:bg-blue-400 text-sm" onClick={handleUploadButton}>CHANGE</button>
                                    <button className="border-2 border-white px-3 py-1 bg-purple-500  
                                    rounded-full text-white hover:bg-purple-700 text-sm ml-2" onClick={showCroppedImage} >PREVIEW</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            }
        </>
    )
}




