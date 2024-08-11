import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    DEFIEXPLORER: false,
    BUSDEXPLORER: false,

    DEFI_BUSD_balance: false, // contract BUSD Balance
    USER_BUSD_balance: false, // users BUSD balance

    //-------------------------
    //  max_WD_EWallet: 100, // only constant // change to database constant
    //  min_WD_Ewallet: 10,// only constant

    // WD at min days running
    // allow_running_days_wd: false, // // days, only constant
    currentRunningDays: 0,
    //-------------------------

    depositBUSDAmount: false,

    historyDepositBUSD: false,
    totalDepositBUSDTrx: false,
    totalDepositBUSDValue: false,

    wdXBUSDAmount: false,

    wdWalletHistory: false, // wd E-Wallet crypto
    totalWDWalletTxs: false,
    totalWDWalletValue: false

};

export const CryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {

        // setAllow_running_days_wd: (state, action) => {
        //     state.allow_running_days_wd = action.payload
        // },

        setCurrentRunningDays: (state, action) => {
            state.currentRunningDays = action.payload
        },


        setDepositBUSDAmount: (state, action) => {
            state.depositBUSDAmount = action.payload
        },

        // Deposit BUSD
        setHistoryDepositBUSD: (state, action) => {
            state.historyDepositBUSD = action.payload
        },
        setTotalDepositBUSDTrx: (state, action) => {
            state.totalDepositBUSDTrx = action.payload
        },
        setTotalDepositBUSDValue: (state, action) => {
            state.totalDepositBUSDValue = action.payload
        },

        setWdXBUSDAmount: (state, action) => {
            state.wdXBUSDAmount = action.payload
        },

        // WD E-WALLET or XBUSD
        setWdWalletHistory: (state, action) => {
            state.wdWalletHistory = action.payload
        },
        setTotalWDWalletTxs: (state, action) => {
            state.totalWDWalletTxs = action.payload
        },
        setTotalWDWallet: (state, action) => {
            state.totalWDWalletValue = action.payload
        },

        // BUY EPIN

        resetCrypto: () => initialState
    }

});

export const {

    resetCrypto, setCurrentRunningDays, setDepositBUSDAmount,

    setHistoryDepositBUSD, setTotalDepositBUSDTrx, setTotalDepositBUSDValue,
    setWdWalletHistory, setTotalWDWalletTxs, setTotalWDWallet,

    setWdXBUSDAmount,


} = CryptoSlice.actions;

export default CryptoSlice.reducer;
