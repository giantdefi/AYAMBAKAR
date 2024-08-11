import { createSlice } from '@reduxjs/toolkit'

const initialState = {



    epinsToSendArray: false,
    historySendEpins: false,
    totalHistorySendEpins: false,

}

export const StockistSlice = createSlice({
    name: 'stockist',
    initialState,
    reducers: {


        setEpinsToSendArray: (state, action) => {
            state.epinsToSendArray = action.payload
        },
        setHistorySendEpins: (state, action) => {
            state.historySendEpins = action.payload
        },
        setTotalHistorySendEpins: (state, action) => {
            state.totalHistorySendEpins = action.payload
        },

        resetStockist: () => initialState
    }

})

export const { resetStockist, setEpinsToSendArray, setHistorySendEpins, setTotalHistorySendEpins } = StockistSlice.actions

export default StockistSlice.reducer
