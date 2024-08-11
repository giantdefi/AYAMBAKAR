import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    stockistMinPurchase: 10, // min ENTERPRISE package
    stockistDiscount: 10,
    applicationEmail_1: 'cryptoxspeed@gmail.com',
    applicationEmail_2: 'support@cryptoxspeed.com',


    // buy epins
    epinNumber: 1,
    packageValue: 20,
    packageName: 'STARTER',
    totalPrice: 20,
    continueBuy: false,
    continueBuyCrypto: false,

    myAllEpins: false,
    myAllEpinsKeep: false, // for stockist reset send pins

    stockisSendEpinsHistory: false

}

export const EpinSlice = createSlice({
    name: 'epin', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setBuyEpinNumber: (state, action) => { // buy epins
            state.epinNumber = action.payload
        },
        setBuyEpinValue: (state, action) => { // buy epins
            state.packageValue = action.payload
        },
        setBuyEpinName: (state, action) => { // buy epins
            state.packageName = action.payload
        },
        setBuyEpinTotalPrice: (state, action) => { // buy epins
            state.totalPrice = action.payload
        },
        setContinueBuy: (state, action) => { // buy epins
            state.continueBuy = action.payload
        },
        setContinueBuyCrypto: (state, action) => { // buy epins
            state.continueBuyCrypto = action.payload
        },

        setMyAllEpins: (state, action) => {
            state.myAllEpins = action.payload
        },
        seMyAllEpinsKeep: (state, action) => {
            state.myAllEpinsKeep = action.payload
        },

        setBuyepinsHistory: (state, action) => {
            state.buyepinsHistory = action.payload
        },

        setStockisSendEpinsHistory: (state, action) => {
            state.stockisSendEpinsHistory = action.payload
        },


        resetEpins: () => initialState
    }

})

export const { resetEpins, setMyEpinsArrayTotal, setMyEpinsArray,
    setPins1Total, setPins2Total, setPins3Total, setPins4Total,
    setPins1Array, setPins2Array, setPins3Array, setStockisSendEpinsHistory,
    //setPins4Array,
    setMyAllEpins, seMyAllEpinsKeep,
    setBuyEpinNumber, setBuyEpinValue, setBuyEpinName, setBuyEpinTotalPrice, setContinueBuy,
    setContinueBuyCrypto


} = EpinSlice.actions

export default EpinSlice.reducer


