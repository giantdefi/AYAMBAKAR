import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    showMap : false,
    userCoords : false,
    totalDistance : false,
    duration : false,

}

export const UsersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        setShowMap: (state, action) => {
            state.showMap = action.payload
        },
        setUserCoords: (state, action) => {
            state.userCoords = action.payload
        },
        setTotalDistance: (state, action) => {
            state.totalDistance = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },

        resetMap: () => initialState
    }

})

export const { resetMap, setShowMap, setUserCoords,setTotalDistance, setDuration
 

} = UsersSlice.actions

export default UsersSlice.reducer
