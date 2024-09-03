import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalMessage: false, // will consist ( true/false, modalType, message )
  modalToast: false, // will consist ( true/false, modalType, message )
  modalActivateUser: false,
  modalConfirmLogOut: false, 
  modalConfirmTopUp : false,
  modalWarningBuyPackage : false,
  modalSuccessRankings : false,
  modalMenuDrawer: false,
  modalMenuDrawer: false,
  modalLogin : false,
  modalRegister : false,
  closeModal : false,
  modalRedeemPackage : false,
  modalJoinBinary: false, // create own modal video
  modalMyEpins: false, // activate binary with select
  modalMyEpinsDashboard: false,
  modalStoclkistSendEpin: false,
  modalSponsorHistorySearch: false,
  modalStockisEpinHistory: false,
  modalConfirmBuyEpin : false,
  modalConvertPairing : false,
  modalMapPicker : false,

   // metamask
   walletModal: false,
   modalProcess: false, // smart contract interaction
   modalAllowance: false,
   modalConnectBinance: false,
   modalInstallMetamask: false,
   modalConfirmBuyEpinCrypto: false,
   modalSponsorHistorySearch: false,
   modalStockisEpinHistory: false,
   modalKeyboardCloneUser: false,
   modalBuyNewPAckage: false,
   modalReactivatePackage: false,
   modalLoginCloneUser: false,
   modalAdminPaymentWD: false,
   modalBinarySearch: false,

   popupNewUser: false,

   modalMyEpinsReactivate: false,
   modalConfirmationProcess : false,
   modalCart : false,

};

export const modalSlice = createSlice({
  name: 'modal', // specified name for this reducer. You can see this name on redux toolkit action
  initialState,
  reducers: {
    setModalMessage: (state, action) => {
      state.modalMessage = action.payload
    },
    setModalToast: (state, action) => {
      state.modalToast = action.payload
    },
    setModalActivateUser: (state, action) => {
      state.modalActivateUser = action.payload
    },
    setModalConfirmLogOut: (state, action) => {
      state.modalConfirmLogOut = action.payload
    },
    setModalConfirmTopUp: (state, action) => {
      state.modalConfirmTopUp = action.payload
    },
    setModalWarningBuyPackage: (state, action) => {
      state.modalWarningBuyPackage = action.payload
    },
    setModalSuccessRanking: (state, action) => {
      state.modalSuccessRankings = action.payload
    },
    setModalMenuDrawer: (state, action) => {
      state.modalMenuDrawer = action.payload
    },
    setModalLogin: (state, action) => {
      state.modalLogin = action.payload
    },
    setModalRegister: (state, action) => {
      state.modalRegister = action.payload
    },
    setCloseModal: (state, action) => {
      state.closeModal = action.payload
    },
    setModalRedeemPackage: (state, action) => {
      state.modalRedeemPackage = action.payload
    },

    setModalJoinBinary: (state, action) => {
      state.modalJoinBinary = action.payload
    },
    setModalMyEpins: (state, action) => {
      state.modalMyEpins = action.payload
    },
    setModalMyEpinsDashboard: (state, action) => {
      state.modalMyEpinsDashboard = action.payload
    },
    setModalStoclkistSendEpin: (state, action) => {
      state.modalStoclkistSendEpin = action.payload
    },

    setModalSponsorHistorySearch: (state, action) => {
      state.modalSponsorHistorySearch = action.payload
    },
    setModalStockisEpinHistory: (state, action) => {
      state.modalStockisEpinHistory = action.payload
    },
    setModalConfirmBuyEpin: (state, action) => {
      state.modalConfirmBuyEpin = action.payload
    },
    setModalConvertPairing: (state, action) => {
      state.modalConvertPairing = action.payload
    },

    // crypto ---
    setWalletModal: (state, action) => {
      state.walletModal = action.payload
    },
    setModalProcess: (state, action) => {
      state.modalProcess = action.payload
    },
    setModalAllowance: (state, action) => {
      state.modalAllowance = action.payload
    },
    setModalConnectBinance: (state, action) => {
      state.modalConnectBinance = action.payload
    },
    setModalInstallMetamask: (state, action) => {
      state.modalInstallMetamask = action.payload
    },

    setModalSponsorHistorySearch: (state, action) => {
      state.modalSponsorHistorySearch = action.payload
    },

    setModalKeyboardCloneUser: (state, action) => {
      state.modalKeyboardCloneUser = action.payload
    },

    setModalReactivatePackage: (state, action) => {
      state.modalReactivatePackage = action.payload
    },

    setModalLoginCloneUser: (state, action) => {
      state.modalLoginCloneUser = action.payload
    },

    setModalAdminPaymentWD: (state, action) => {
      state.modalAdminPaymentWD = action.payload
    },

    setModalBinarySearch: (state, action) => {
      state.modalBinarySearch = action.payload
    },

    setPopupNewUser: (state, action) => {
      state.popupNewUser = action.payload
    }, 

    setModalMyEpinsReactivate: (state, action) => { 
      state.modalMyEpinsReactivate = action.payload
    }, 

    setModalConfirmationProcess: (state, action) => {  
      state.modalConfirmationProcess = action.payload
    }, 

    setModalMapPicker: (state, action) => {  
      state.modalMapPicker = action.payload
    }, 
  

    resetModal: () => initialState
  }

});

export const { resetModal, setModalMessage, setModalToast, setModalActivateUser, setModalConfirmLogOut, setModalConfirmTopUp,
   setModalWarningBuyPackage, setModalSuccessRanking, setModalMenuDrawer, setCloseModal, setModalLogin, setModalRegister,
   setModalRedeemPackage,setModalConfirmBuyEpin,
   setModalJoinBinary,setModalMyEpins,setModalMyEpinsDashboard, setModalStoclkistSendEpin,setModalSponsorHistorySearch,setModalStockisEpinHistory,
   setModalConvertPairing, setModalMyEpinsReactivate,setModalMapPicker,

   // crypto
   setWalletModal, setModalProcess, setModalAllowance, setModalConnectBinance, setModalInstallMetamask,
   setModalReactivatePackage, setModalLoginCloneUser, setModalBinarySearch, setPopupNewUser,
 
   setModalAdminPaymentWD, setModalConfirmationProcess
} = modalSlice.actions;

export default modalSlice.reducer;
