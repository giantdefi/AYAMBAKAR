import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    emailForget: false,
    usernameForgot: false,
    passReminder: false,

    recoveryCode: false,

    newPasswordForgot: false,
    newConfirForgotPassword: false,

    continue1: false,
    continue2: false,
}

export const ForgetSlice = createSlice({
    name: 'forgot',
    initialState,
    reducers: {
        setEmailForgot: (state, action) => {
            state.emailForget = action.payload
        },
        setUsernameForgot: (state, action) => {
            state.usernameForgot = action.payload
        },
        setPassReminder: (state, action) => {
            state.passReminder = action.payload
        },
        setRecoveryCode: (state, action) => {
            state.recoveryCode = action.payload
        },
        setNewPassword: (state, action) => {
            state.newPasswordForgot = action.payload
        },
        setNewConfirForgotPassword: (state, action) => {
            state.newConfirForgotPassword = action.payload
        },
        setContinue1: (state, action) => {
            state.continue1 = action.payload
        },
        setContinue2: (state, action) => {
            state.continue2 = action.payload
        },


        resetForgot: () => initialState
    }

})

export const { resetForgot, setEmailForgot, setUsernameForgot, setRecoveryCode, setContinue1, setContinue2, setPassReminder,
    setNewPassword, setNewConfirForgotPassword } = ForgetSlice.actions

export default ForgetSlice.reducer
