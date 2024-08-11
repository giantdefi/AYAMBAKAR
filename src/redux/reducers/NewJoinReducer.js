import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // modal info new user
  newuser: false,
  sponsor: false,
  upline: false,
  avatar: false,
  packages: false, // error is fusing package??
  value: false,
  timeAgo: false,

  latestRegister: false,
  totalRegister: false,

  latestActive: false,
  totalActive: false,



}

export const NewUserSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    setNewUser: (state, action) => {
      state.newuser = action.payload.newuser
      state.sponsor = action.payload.sponsor
      state.upline = action.payload.upline
      state.avatar = action.payload.avatar
      state.packages = action.payload.package
      state.value = action.payload.value
      state.timeAgo = action.payload.timeAgo
    },
    setLatestRegister: (state, action) => {
      state.latestRegister = action.payload
    },
    setTotalRegister: (state, action) => {
      state.totalRegister = action.payload
    },
    setLatestActive: (state, action) => {
      state.latestActive = action.payload
    },
    setTotalActive: (state, action) => {
      state.totalActive = action.payload
    },
    resetNewUser: () => initialState
  }

})

export const { resetNewUser, setNewUser,
  setLatestRegister, setTotalRegister,
  setLatestActive, setTotalActive

} = NewUserSlice.actions

export default NewUserSlice.reducer
