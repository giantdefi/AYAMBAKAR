import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  name: false,
  email: false,
  authToken :  false

}

export const AuthSlice = createSlice({
  name: 'auth', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
   
    setIsLogin: (state, action) => {
      state.isLogin = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
  },

  setEmail: (state, action) => {
      state.email = action.payload
  },
  setAuthToken: (state, action) => {
    state.authToken = action.payload
},

    resetAuth: () => initialState
  }

})

export const { resetAuth, setIsLogin,setName,setEmail, setAuthToken

} = AuthSlice.actions

export default AuthSlice.reducer
