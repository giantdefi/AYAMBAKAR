import React, {useRef, useEffect, useState } from "react"
import Link from 'next/link'
import Router, { useRouter } from "next/router"

import Sponsor from 'components/inputforms/register/Sponsor'
import UsernameReg from 'components/inputforms/register/Username'
import UsernameLogin from 'components/inputforms/login/Username'
import PasswordLogin from 'components/inputforms/login/Password'
import Email from 'components/inputforms/register/Email'
import Phone from 'components/inputforms/register/Phone'
import FirstName from 'components/inputforms/register/FirstName'
import LastName from 'components/inputforms/register/LastName'

import Password from 'components/inputforms/register/Password'
import ConfirmPassword from 'components/inputforms/register/ConfirmPassword'
import BtnLogin from 'redux/actions/BtnLogin'
import BtnRegister from 'redux/actions/BtnRegister'
import { resetErrors } from 'redux/reducers/ErrorReducer'
import { resetForm } from 'redux/reducers/FormReducer'
import { setShowLogin } from 'redux/reducers/SidebarReducer'
//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux'
import { setRightSidebar, setLeftSidebar } from 'redux/reducers/MainmenuReducer'
//--------------------------------------

export default function Home() {

  
 const dispatch = useDispatch()
  const router = useRouter()
  const { rightSidebar } = useSelector((state) => state.MainmenuReducer)
  const { showLogin } = useSelector((state) => state.SidebarReducer)




const toggleLogin = () => {
    dispatch(resetForm())
    dispatch(resetErrors())
    if(showLogin){
        dispatch(setShowLogin(false))
    }else{
        dispatch(setShowLogin(true))
    }
}
const handleClose = () => { 
    dispatch(setRightSidebar(false))
}


return (
  <>


        
    <div  class={`min-h-screen overflow-auto mt-24 md:mt-16 fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform  bg-white w-96 
    dark:bg-gray-800 ${!rightSidebar && "translate-x-full"}`}
    >
       
    
{showLogin ? 
 <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700" >
    
    
         <div class="flex justify-end w-full">
          <button onClick={handleClose} className="icofont-close border p-2 rounded-full hover:bg-blue-300"></button>
          </div>
    <div class="space-y-6" > 
        <h5 class="text-xl font-medium text-gray-900 dark:text-white mb-6">Log In to our platform</h5>
     
        <UsernameLogin/>
        <PasswordLogin/>
      
        <div class="flex justify-between">
            <div class="flex items-start">
                <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <a href="#" class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
        </div>
     
     <BtnLogin/>
    
        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <button onClick={toggleLogin} class="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
        </div>
    </div>
</div> 
:
<div class="max-w-md mx-auto mt-2">
<div class="flex justify-end w-full">
          <button onClick={handleClose} className="icofont-close border p-2 rounded-full hover:bg-blue-300"></button>
          </div>
    <div class="flex w-full">
        
    <h3 className="mb-6 mx-auto text-blue-800">Register your account</h3>
    </div>
 
<Sponsor/>
  <div class="grid md:grid-cols-2 md:gap-6">
   <FirstName/>
  <LastName/>
  </div>



  <UsernameReg/>
  <Email />
  <Phone/>
  <Password/>
  <ConfirmPassword/>
  
 
<BtnRegister/>

  <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already have account? <button onClick={toggleLogin} class="text-blue-700 hover:underline dark:text-blue-500">Login here</button>
        </div>

</div>

}
</div>

  </>
)
}



