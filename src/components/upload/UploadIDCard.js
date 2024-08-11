import React, { useState, useRef, useCallback, useEffect } from "react";
import Cropper from 'react-easy-crop'
import CroptHelper from 'components/upload/CroptHelper'
import { blobToBase64, base64ToBlob } from './ImageOptimizerWebp'
import axios from "axios"
//--- redux store---------------------------------------
import { useSelector, useDispatch } from 'react-redux';
import { setPreviewMainBlob, resetDetailImage } from 'redux/reducers/ImageReducer';
import { setFormData } from 'redux/reducers/FormDataReducer'
import { setModalMessage } from 'redux/reducers/ModalReducer'
import { setAllowReloadData } from 'redux/reducers/UsersReducer'
//-------------------------------------------------------


export default function PreviewDetailImage() {

  const dispatch = useDispatch()

  const fileUploadnRef = useRef()
  const [myFile, setImage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const [spinner, setSpinner] = useState(false)
  const [spinnerNo, setSpinnerNo] = useState(false)

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const { username, isLogin, token } = useSelector((state) => state.AuthReducer)
  const { image, img_dir } = useSelector((state) => state.UsersReducer)
  const { formData } = useSelector((state) => state.FormDataReducer)
  //console.log(formData)

  //--- redux store ----
  const { main_img_blob } = useSelector((state) => state.ImageReducer)


  useEffect(() => {
    
    if(main_img_blob){
      handleUploadImage()
   }
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [main_img_blob])


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleGetFile = (e) => {
    if (e.target.files.length !== 0) {
      const blob = (window.URL || window.webkitURL).createObjectURL(e.target.files[0]); //URL.createObjectURL(e.target.files[0])
      if (blob) {
        setModalOpen(true)
        setImage(blob)
      }
    } else {
      // alert('file undefined')
    }
  }

  //---- render blob image on page ------
  const showCroppedImage = useCallback(async () => {
    setModalOpen(false)
    setSpinner(true)
    try {
      const croppedImage = await CroptHelper(
        myFile,
        croppedAreaPixels,
        rotation
      )
      console.log(croppedImage)
      dispatch(setPreviewMainBlob(croppedImage)) // push image blob ImageReducer
     
      
     
    //  dispatch(setFormData({ ...formData, detail_images: [] }))
    } catch (e) {
      console.error(e)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation, myFile])


  //--- select image window open ----
  const handleImageClick = (no) => {
   // if (main_img_blob) {
      setSpinnerNo(no)
      fileUploadnRef.current.click()

   // }
  }

  //--- change button on crop popup
  const handleUploadButton = () => {

    fileUploadnRef.current.click()

  }


  const handleUploadImage = async () => {

    //console.log('------------UPLOAD IMAGE-------------')

    if (!isLogin) {
        return dispatch(setModalPleaseLogin(true))
        //   return dispatch(setModalMessage({ type: 'danger', title: "Login Required!", message: 'Please Login to continue' }))
    }

    if (!main_img_blob){
      return  dispatch(setModalMessage({ type: 'danger', title: "Image Blob Missing", message: 'Image blob missing' }))
    }

    //setSpinnerBtn(true)

    const base64 = await blobToBase64(main_img_blob) // Optimize image and convert to WEBP format
    const optimizedImg = base64ToBlob(base64) // turn back to blob as webp format before upload

    //console.log(optimizedImg)

    const data = new FormData();

    data.append("file", optimizedImg);
    data.append("username", username);

    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
        url: `${URL}/users/uploadIDCard`,
        method: 'POST',
        data,
        'headers': {
            'Authorization': token,
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'json'
    })
        .then(async response => {


            if (response.data.isSuccess) {
            
             dispatch(setAllowReloadData(true))
                         
                setTimeout(() => { // will running after reload
                  //  dispatch(setAvatar(avatar))
                }, 100)

              //  dispatch(setUploadImageBlob(imageBlob))

                dispatch(setModalMessage({ type: 'success', title: "Upload Success", message: 'Upload is successfull' }))

                // dispatch(setImageBlob(false))
                // setMyFile(null)

            } else {
                console.log(response.data)
            }

          

        }).catch(function (error) {
          
            console.log(error)
            dispatch(setModalMessage({ type: 'danger', title: "Upload Error", message: error }))

        });
}

// console.log('main_img_blob')
// console.log(main_img_blob)
// console.log(image)
// console.log(img_dir)

  return (
    <>

      <input className="hidden" type="file" accept="image/png, image/jpeg, image/webp" name="myfile" onChange={(e) => handleGetFile(e)} ref={fileUploadnRef} />

      <div className="flex justify-end items-center  py-2 pl-2 mt-8">
      


        {/* <button className="py-1 px-4 border border-gray-400 rounded-full bg-orange-800 text-white text-sm"
          onClick={handleResetImages}>Reset image</button> */}
      </div>

      {formData && formData.id &&
        <p className="py-2 ml-2 text-sm">Last images will be reset if you change detail images</p>
      }

      <div className="flex w-1/2 justify-end">

        <div className="flex justify-end ">
          {spinner && spinnerNo === 1 ?
            <svg style={{ maxWidth: 40 }} role="status" className="inline w-12 h-12 text-gray-200 animate-spin fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            :
            <img className="cursor-pointer w-[200px]" title="Select image" onClick={handleImageClick}
              src={main_img_blob ? main_img_blob :
                  image? image :'/assets/img/upload.webp'}
              alt="preview"
            />
            // <img className="cursor-pointer w-full" title="Select image" onClick={handleImageClick} src={image} alt="KTP"/>

          }
        </div>


      </div>



      {modalOpen &&
        <div className="fixed w-full inset-0 z-50 overflow-hidden flex justify-center items-center " style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="border-white border-4 shadow-2xl bg-white  mx-auto rounded-lg z-50 overflow-y-auto w-[500px] " >

            <div className="modal-content relative p-2">

              <div className="p-2 bg-blue border bg-slate-300 rounded-lg shadow-md w-full ">

                <div className="relative h-64 bg-black">
                  <Cropper
                    image={myFile}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
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
                  <button className="px-3 py-1 bg-red-500 rounded-full text-white hover:bg-red-400 text-sm" onClick={() => setModalOpen(false)}>CANCEL</button>
                  <button className="px-3 py-1 bg-blue-500 rounded-full text-white hover:bg-blue-400 text-sm" onClick={handleUploadButton}>CHANGE</button>
                  <button className="px-3 py-1 bg-purple-500 rounded-full text-white hover:bg-purple-700 text-sm ml-2" onClick={showCroppedImage} >USE IMAGE</button>
                </div>

              </div>

            </div>
          </div>
        </div>
      }


    </>
  )
}

