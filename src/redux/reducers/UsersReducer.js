import { createSlice } from '@reduxjs/toolkit'

const initialState = {

     // from google aouth token decode
   
   
   
}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
     
       

        resetUsers: () => initialState
    }

})

export const { 
    resetUsers, setName, setEmail, 
 
} = UsersSlice.actions

export default UsersSlice.reducer
