import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  username: false,
  sponsor : false,
  wallet: false,
  token: false,
  isAdmin : false,
  isStokist: false, // stockist or admin
  isActive : false,
  epin : false,
  activeRefs : false,
  boardNo : false,
  level : false,
  toggleLogin: false,

  // firebase
 // isLogin: false,
  userid: false,
  email:false

}

export const AuthSlice = createSlice({
  name: 'auth', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
   
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setSponsor: (state, action) => {
      state.sponsor = action.payload
    },
    setBoardNo: (state, action) => { 
      state.boardNo = action.payload
    },
    setLevel: (state, action) => {
      state.level = action.payload
    },
  
    setToken: (state, action) => {
      state.token = action.payload
    },
    setEPin: (state, action) => {
      state.epin = action.payload
    },

    setActiveRefs: (state, action) => {
      state.activeRefs = action.payload
    },
    
    setIsStokist: (state, action) => {
      state.isStokist = action.payload
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
    setWallet: (state, action) => {
      state.wallet = action.payload
    },

    setToggleLogin: (state, action) => {
      state.toggleLogin = action.payload
    },

    // firebase

    setLogin: (state, action) => {
      state.isLogin = action.payload.isLogin,
      state.userid = action.payload.userid,
      state.email = action.payload.email
    },
    setLogout: (state) => {
      state.isLogin = false,
      state.userid = false,
      state.email = false
    },



    resetAuth: () => initialState
  }

})

export const { resetAuth, setUsername, setSponsor, setEmail,  setToken, setIsLogin, setWallet, setBoardNo, 
  setLevel, setIsStokist, setIsAdmin, setIsActive, setEPin, setActiveRefs, setToggleLogin,
  // firebase
  setLogin, setLogout

} = AuthSlice.actions

export default AuthSlice.reducer
