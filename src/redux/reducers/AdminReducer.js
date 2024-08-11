import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    statsData: false,
    selectedWDItem: false,

    wdWalletHistory: false, // wd E-Wallet crypto
    totalWDWalletTxs: false,
    totalWDWalletValue: false,
    totalWDPaid: false,

    // on wd table click
    wdRequestID: false,
    wdPaymentUsername: false,
    wdPaymentAmount: false,
    wdTxHash: false,
    walletAddress: false,
    freeStatus: false,

}

export const AdminSlice = createSlice({
    name: 'adms',
    initialState,
    reducers: {
        setStatsData: (state, action) => {
            state.statsData = action.payload
        },
        setSelectedWDItem: (state, action) => {
            state.selectedWDItem = action.payload
        },

        // Deposit BUSD
        setWdWalletHistory: (state, action) => {
            state.wdWalletHistory = action.payload
        },
        setTotalWDWalletTxs: (state, action) => {
            state.totalWDWalletTxs = action.payload
        },
        setTotalWDWallet: (state, action) => {
            state.totalWDWalletValue = action.payload
        },
        setTotalWDPaid: (state, action) => {
            state.totalWDPaid = action.payload
        },

        setWdRequestID: (state, action) => {
            state.wdRequestID = action.payload
        },
        setWdPaymentUsername: (state, action) => {
            state.wdPaymentUsername = action.payload
        },
        setWdPaymentAmount: (state, action) => {
            state.wdPaymentAmount = action.payload
        },
        setWdTxHash: (state, action) => {
            state.wdTxHash = action.payload
        },
        setWalletAddress: (state, action) => {
            state.walletAddress = action.payload
        },
        setFreeStatus: (state, action) => {
            state.freeStatus = action.payload
        },



        resetStats: () => initialState
    }

})

export const { resetStats, setStatsData, setSelectedWDItem,
    setWdWalletHistory, setTotalWDWalletTxs, setTotalWDWallet, setTotalWDPaid,
    setWdRequestID, setWdPaymentUsername, setWdPaymentAmount, setWdTxHash, setWalletAddress, setFreeStatus

} = AdminSlice.actions

export default AdminSlice.reducer
