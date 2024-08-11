import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    userDestination: false,
    // userCheckData: false,

    //sendPinsArray: false,
    sendBWalletAmount: false,
    sendBUSDAmount: false,
    // sendGasAmount: false,

    swapXBUSDAmount: false,

    // purchaseBWalletAmount: false,
    // purchaseGasAmount: false

}

export const TransactionSlice = createSlice({
    name: 'transaction', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setUserDestination: (state, action) => {
            state.userDestination = action.payload
        },
        // setUserCheckData: (state, action) => {
        //     state.userCheckData = action.payload
        // },
        // setSendPinsArray: (state, action) => {
        //     state.sendPinsArray = action.payload
        // },
        setSendBWalletAmount: (state, action) => {
            state.sendBWalletAmount = action.payload
        },
        setSendBUSDAmount: (state, action) => {
            state.sendBUSDAmount = action.payload
        },
        // setSendGasAmount: (state, action) => {
        //     state.sendGasAmount = action.payload
        // },
        setSwapXBUSDAmount: (state, action) => {
            state.swapXBUSDAmount = action.payload
        },
        // setPurchaseBWalletAmount: (state, action) => {
        //     state.purchaseBWalletAmount = action.payload
        // },
        // setPurchaseGasAmount: (state, action) => {
        //     state.purchaseGasAmount = action.payload
        // },

        resetTransaction: () => initialState

    }

})

export const {
    resetTransaction,
    setUserDestination,
    setSendBWalletAmount,
    setSwapXBUSDAmount,
    setSendBUSDAmount,
    // setUserCheckData,
    // setSendPinsArray, 

    //setSendGasAmount,
    // setPurchaseBWalletAmount, 
    //setPurchaseGasAmount

} = TransactionSlice.actions

export default TransactionSlice.reducer
