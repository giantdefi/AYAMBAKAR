import React, { useEffect, useState } from "react"
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import Wallet from "components/wallet"
//import HeaderBoard from "components/HeaderBoard"
//import GIftOption from "components/GiftOptions"
import UploadIDCard from 'components/upload/UploadIDCard'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
// import { setPlaySound } from 'redux/reducers/SoundReducer'
import { setModalMessage, setCloseModal } from 'redux/reducers/ModalReducer'
import { setIsActive } from 'redux/reducers/AuthReducer'
import {  setItemSelected, setDropdownOpen, setMainSidebarOpen } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {


      const {width } = useSelector((state) => state.GeneralReducer)
   const { mainSidebarOpen } = useSelector((state) => state.MainmenuReducer)
   const { username, sponsor, wallet, epin, token, isActive, isLogin } = useSelector((state) => state.AuthReducer)
   const { fullname, email, handphone, state, postcode, address, city, image } = useSelector((state) => state.UsersReducer)
    const router = useRouter()
    const dispatch = useDispatch()

    const [spinner, setSpinner] = useState(false)
    const [isValid, setisValid] = useState(false)

    useEffect(() => {
        dispatch(setDropdownOpen(1))
        dispatch(setItemSelected(1))
          dispatch(setCloseModal(true))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    
        useEffect(() => {  // redirect to next page!!!
      
            if(!isLogin) {
                 router.push('/login')
                 return
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isLogin])

    useEffect(() => {
    
    if(!fullname || !email || !handphone || !state || !postcode || !address || !city || !image || !epin){
        setisValid(false)
    }else{
        setisValid(true)
    }
      
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fullname, email, handphone, state, postcode, address, city, image])

const handleActivate = () => {
  
    setSpinner(true)

    const data = {
        username, sponsor, epin
    }

    const URL = process.env.NEXT_PUBLIC_API_URL_V1
    return axios({
        url: `${URL}/board/activate`,
        method: 'POST',
        data,
        'headers': {
            'Authorization': token,
            accept: 'application/json',
            'content-type': 'application/json',
        }
    })
        .then(async response => {

             // console.log(response)

            if (response.data.isSuccess) {


                dispatch(setIsActive(true))

                 setSpinner(false)
              

                return dispatch(setModalMessage({ type: 'success', title: response.data.title, message: response.data.message }))

            } else {

                //   console.log(response.data)
                setSpinner(false)
             //   return dispatch(setError({ path: response.data.path, message: response.data.message }))
                return dispatch(setModalMessage({ type: 'warning', title: response.data.title, message: response.data.message }))
            }

        }).catch(function (error) {
            //  setSpinnerBtn(false)
            console.log(error)
            setSpinner(false)
            return dispatch(setModalMessage({ type: 'danger', title: "Network Error!", message: 'Please check your Internet connection' }))
        });

}
   


    return (
        <>

          
<div className="transition-all duration-300 flex flex-col items-center  text-white lg:px-1  md:pt-10 border border-slate-700 min-h-screen " >

<div className="flex justify-end  w-full  h-12 fixed top-[50px] right-0 z-10 hidden md:block ">
                    <div className=" z-10 h-12 mt-4">
              <Wallet/>
                    </div>                 
                </div>
              
      {/* <HeaderBoard/>  */}
     <div className="flex flex-col centered w-full mt-4 px-2 lg:w-1/2">

     {!isActive ?
     <div className="flex flex-col centered w-full mt-4 border pb-5">
            <h4>Aktivasi Akun</h4>
            <small className="text-sm">Pastikan anda sudah memiki E-PIN Keanggotaan</small>
            
            <div className="bg-slate-900 w-full mt-2 ">
                            <div className="space-y-2 text-sm mb-6">
                           
                            <div className={epin? "flex justify-between items-center px-5 bg-green-800 h-[50px] border-b border-slate-800 h-12" :
                                "flex justify-between items-center px-5 bg-red-900  border-b border-slate-800 h-12" }
                                >
                                    <p>E-PIN KEANGGOTAAN </p><p> {epin || 'Tidak ada EPin'} 
                                       {!epin?  <span className="ml-4 animate-ping inline-flex h-3 w-3 rounded-full bg-red-100 opacity-75 mr-2 " /> 
                                       :
                                       <i className="ml-4 icofont-checked"></i>   
                                    }
                                          </p>
                                </div>
                                <div className="text-[16px]">
                                <div className="flex justify-between items-center px-5 py-2  border-b border-slate-800">
                                    <p>Username </p><p> {username} </p>
                                </div>
                                <div className="h-10 flex justify-between items-center px-5 py-2  border-b border-slate-800">
                                    <p>Sponsor </p><p> {sponsor} </p>
                                </div>
                                <div className="h-10 flex justify-between items-center px-5 py-2  border-b border-slate-800">
                                    <p>Nama lengkap </p><p> {fullname} </p>
                                </div>
                                <div className="h-10 flex justify-between items-center px-5  border-b border-slate-800">
                                    <p>Handphone </p><p> {handphone} </p>
                                </div>
                                <div className="h-10 space-y-2 flex justify-between items-center px-5   border-b border-slate-800">
                                    <p>Email</p><p> {email} </p>
                                </div>
                                <div className="h-12 flex justify-between items-center px-5   border-b border-slate-800">
                                    <p>Alamat dalam KTP</p><p> {address}  </p>
                                </div>
                                <div className="h-10 flex justify-between items-center px-5   border-b border-slate-800">
                                    <p>Kota </p><p> {city}  </p>
                                </div>
                                <div className="h-10 flex justify-between items-center px-5   border-b border-slate-800">
                                    <p>Provinsi </p><p> {state}  </p>
                                </div>
                                <div className="h-10 flex justify-between items-center px-5   border-b border-slate-800">
                                    <p>Kode pos </p><p> {postcode}  </p>
                                </div>
                                <div className="flex justify-between items-center px-5   border-b border-slate-800">
                                <p>Upload KTP </p><p className="justify-end flex"> <span>Klik untuk upload</span> <UploadIDCard/> </p>
                                </div>
                                <div className="flex justify-between items-center px-5   border-b border-slate-800">
                                    <p>Data belum lengkap? </p><p> <button onClick={()=>router.push("/users/profile")} className="_gradient_green text-white  py-2 mt-2 border-2 border-gray-400 rounded-full px-4  flex justify-center items-center">
                                      Lengkapi data disini</button> </p>
                                </div>
                                </div>
                            </div>
                           
                        </div>   

                       { !isValid ?
                        <button className="_gradient_orange text-white   py-1 mt-2 border-4 border-gray-400 rounded-full px-6  flex justify-center items-center">
                        <i className="icofont-ban mr-2" />  AKTIFKAN</button>
                        
                   
                    :

                         <button onClick={handleActivate} className="_gradient_green text-white   py-1 mt-2 border-4 border-gray-400 rounded-full px-6  flex justify-center items-center">
                        
                       {spinner? 
                        <svg style={{ maxWidth: 40 }} role="status" className="mr-4 inline w-4 h-4 text-gray-200 dark:text-gray-300 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg> : <i className="icofont-checked mr-2" />  } AKTIFKAN</button> }

     </div>:

<div className="flex flex-col centered w-full mt-4 px-2">
<div>KEANGGOTAAN ANDA SUDAH AKTIF</div>
<img className="w-full" src="/assets/img/community.webp" alt="banner"/>
<img className="w-1/2"  src="/assets/img/moto-1.webp" alt="banner"/>
</div>
}
     </div>
</div>         
        
           




        </>
    )
}



