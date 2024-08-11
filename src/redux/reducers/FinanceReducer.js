import { createSlice } from '@reduxjs/toolkit'

const initialState = {

   WDAmount : false,
   bank : false,
   bank_account : false,
   bank_owner : false,
   
}

export const FinanceSlice = createSlice({
    name: 'finance', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        setWDAmount: (state, action) => {
            state.WDAmount = action.payload
        },
      
        setBank: (state, action) => {
            state.bank = action.payload
        },
        setBankAccount: (state, action) => {
            state.bank_account = action.payload
        },
        setBankOwner: (state, action) => {
            state.bank_owner = action.payload
        },
      

        resetFinance: () => initialState

    }

})

export const {
    resetFinance, setWDAmount, setBank, setBankAccount, setBankOwner
    // setSwap_rate, setWD_rate

} = FinanceSlice.actions

export default FinanceSlice.reducer
