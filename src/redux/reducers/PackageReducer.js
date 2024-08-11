import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    //  investmentPackage: false,

    myStakingPackage: false,
    activateTime: false,

    runningDays: false,
    lastRedeemTime: false,
    lastRedeemDays: false,
    lastRedeemValue: false,

    redeemDaysAvailable: false,
    redeemValueAvailable: false,

    continueToRedeem: false, // on modal confirmation
    isCompleted: false,

    reloadPackage: false,

}

export const packageSlice = createSlice({
    name: 'mypackage', // specified name for this reducer. You can see this name on redux toolkit action
    initialState,
    reducers: {
        // setInvestmentPackage: (state, action) => { // consist 1 to 4
        //     state.investmentPackage = action.payload
        // },
        setMyStakingPackage: (state, action) => { // consist 1 to 4
            state.myStakingPackage = action.payload
        },

        setActivateTime: (state, action) => { // consist 1 to 4
            state.activateTime = action.payload
        },

        setRunningDays: (state, action) => { // consist 1 to 4
            state.runningDays = action.payload
        },
        setLastRedeemTime: (state, action) => { // consist 1 to 4
            state.lastRedeemTime = action.payload
        },
        setLastRedeemDays: (state, action) => { // consist 1 to 4
            state.lastRedeemDays = action.payload
        },
        setLastRedeemValue: (state, action) => { // consist 1 to 4
            state.lastRedeemValue = action.payload
        },
        setRedeemDaysAvailable: (state, action) => { // consist 1 to 4
            state.redeemDaysAvailable = action.payload
        },
        setRedeemValueAvailable: (state, action) => { // consist 1 to 4
            state.redeemValueAvailable = action.payload
        },
        setContinueToRedeem: (state, action) => { // consist 1 to 4
            state.continueToRedeem = action.payload
        },
        setIsCompleted: (state, action) => { // consist 1 to 4
            state.isCompleted = action.payload
        },

        setReloadPackage: (state, action) => { // consist 1 to 4
            state.reloadPackage = action.payload
        },

        resetPackage: () => initialState

    }

})

export const { resetPackage,
    // setInvestmentPackage,  // move to persist reducer
    setMyStakingPackage, setActivateTime, setRunningDays, setLastRedeemTime, setLastRedeemDays,
    setLastRedeemValue, setRedeemDaysAvailable, setRedeemValueAvailable, setContinueToRedeem, setIsCompleted, setReloadPackage
} = packageSlice.actions

export default packageSlice.reducer
