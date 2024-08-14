import React, { } from "react";
//import Link from 'next/link'

//----------- Firebase Login and Logout -----------------
import { auth } from "./firebaseConfig";
import {
  // createUserWithEmailAndPassword,
  //  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
const provider = new GoogleAuthProvider();
//--------------------------------------------------------------------

//---- REDUX STORE ---------------------
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from 'redux/reducers/AuthReducer';
//--------------------------------------


const JoinButton = (props) => {

  //--- redux----
  const { isLogin } = useSelector((state) => state.AuthReducer)
  const dispatch = useDispatch();

  //---- firebase LOGIN from server side ----
  const handleLogin = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (user) {
          dispatch(setLogin({ isLogin: true, userid: user.uid, email: user.email }))
        }
      })
  }

  //---- firebase LOGOUT from server side ----
  const handleLogout = async () => {
    await signOut(auth);
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        dispatch(setLogout())
        alert('You are already Sign Out...!')
      }
    })
  }

  return (
    <>

      <div className="ml-2">
        <ul className="flex w-full flex-wrap items-center h-10 ">

          {!isLogin ?
            <li className="border rounded-xl px-2 py-1 hover:bg-blue-900" onClick={handleLogin}>
              <div className="flex items-center w-full cursor-pointer font-semi-bold"  >
                <svg className="mr-2" width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                  <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                  <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                  <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                </svg>
                LOGIN WITH GOOGLE</div>
            </li>
            :
            <li className="border rounded-xl px-2 py-1 hover:bg-blue-900" onClick={handleLogout}>
              <div className="flex items-center w-full cursor-pointer font-semi-bold" >

                LOGOUT</div>
            </li>
          }
        </ul>
      </div>



    </>

  )
}

export default JoinButton

