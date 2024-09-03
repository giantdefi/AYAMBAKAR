import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    showMap : false,
    userCoords : false,
    totalDistance : false,
    deliveryCost : false,

    duration : false,

    // constant 
    basicCost : 5000,
    costperKM : 2500,

    userLocation : false,

  

   showGooglePopup : false,

   mapLoaded : false

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
        setDeliveryCost: (state, action) => {
            state.deliveryCost = action.payload
        },
        setDuration: (state, action) => {
            state.duration = action.payload
        },
        setShowGooglePopup: (state, action) => {
            state.showGooglePopup = action.payload
        },
        setUserLocation: (state, action) => {
            state.userLocation = action.payload
        },
        setMapLoaded: (state, action) => {
            state.mapLoaded = action.payload
        },

        resetMap: () => initialState
    }

})

export const { resetMap, setShowMap, setUserCoords,setTotalDistance, setDuration, setShowGooglePopup, setDeliveryCost, setUserLocation,
    setMapLoaded
 

} = UsersSlice.actions

export default UsersSlice.reducer
