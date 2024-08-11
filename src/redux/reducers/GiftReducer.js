import { createSlice } from '@reduxjs/toolkit'

const initialState = {

   selectGift : false,
   delivery_address : false,
   merkMotor : false,
   NomorPlat : false,
   motorTahun : false,
   copySTNK : false
}

export const GiftSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        setSelectGift: (state, action) => {
            state.selectGift = action.payload
        },
        setDeliveryAddress: (state, action) => {
            state.delivery_address = action.payload
        },
        setMerkMotor: (state, action) => {
            state.merkMotor = action.payload
        },
        setMotorTahun: (state, action) => {
            state.motorTahun = action.payload
        },
        setNomorPlat: (state, action) => {
            state.NomorPlat = action.payload
        },
        setcopySTNK: (state, action) => {
            state.copySTNK = action.payload
        },
       


        resetGift: () => initialState
    }

})

export const { resetGift, setSelectGift, setDeliveryAddress, setMerkMotor, setMotorTahun, setcopySTNK, setNomorPlat
   
} = GiftSlice.actions

export default GiftSlice.reducer
