import { createSlice } from '@reduxjs/toolkit'

const initialState = {


    historyBonusSponsor: false,
    totalBSponsor : false,
    totalTxSponsor: false,

    historyWDCash: false,
    totalWDCash : false,
    totalTxWDCash : false,




}

export const HistorySlice = createSlice({
    name: 'history', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {


        // Send B-Wallet
        setHistoryBonusSponsor: (state, action) => {
            state.historyBonusSponsor = action.payload   
        },
        setTotalBSponsor: (state, action) => {
            state.totalBSponsor = action.payload
        },
        setTotalTxSponsor: (state, action) => {
            state.totalTxSponsor = action.payload
        },
      
      
      
        setHistoryWDCash: (state, action) => {
            state.historyWDCash = action.payload
        },
        setTotalWDCash: (state, action) => {
            state.totalWDCash = action.payload
        },
        setTotalTxWDCash: (state, action) => {
            state.totalTxWDCash = action.payload
        },
       


        resetHistory: () => initialState
    }

})

export const { resetHistory,


    setHistoryBonusSponsor, setTotalBSponsor, setTotalTxSponsor,
    
    setHistoryWDCash, setTotalTxWDCash, setTotalWDCash, 



} = HistorySlice.actions

export default HistorySlice.reducer


