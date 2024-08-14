import { configureStore } from '@reduxjs/toolkit'

//import storage from 'redux-persist/lib/storage' // use in production is ok
import storage from './storage' // prevent console waring message on development

import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'


import GeneralReducer from 'redux/reducers/GeneralReducer'
import CartReducer from 'redux/reducers/CartReducer'
import ErrorReducer from 'redux/reducers/ErrorReducer'
import FormReducer from 'redux/reducers/FormReducer'
import ModalReducer from 'redux/reducers/ModalReducer'
import LoaderReducer from 'redux/reducers/LoaderReducer'

import ReferralReducer from 'redux/reducers/ReferralReducer'
import AuthReducer from 'redux/reducers/AuthReducer'

import SidebarReducer from 'redux/reducers/SidebarReducer'
import SettingReducer from 'redux/reducers/SettingReducer'

import MainmenuReducer from 'redux/reducers/MainmenuReducer'

import PersistReducer from 'redux/reducers/PersistReducer'

import SoundReducer from 'redux/reducers/SoundReducer'

import UsersReducer from 'redux/reducers/UsersReducer'
import MapReducer from 'redux/reducers/MapReducer'
const rootReducer = combineReducers({

  AuthReducer,
  ErrorReducer,
  CartReducer,
  FormReducer,
  GeneralReducer,
  LoaderReducer,
  MainmenuReducer,
  ModalReducer,
  MapReducer,
  PersistReducer,
  ReferralReducer,
  SoundReducer,
  SettingReducer,
  SidebarReducer,
  UsersReducer,
  SettingReducer,

})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["AuthReducer", "SettingReducer", "ReferralReducer", "CartReducer"] //"PersistReducer"
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
//  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

const persistor = persistStore(store)

export { store, persistor }

