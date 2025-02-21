import { configureStore,combineReducers } from '@reduxjs/toolkit'
import { persistReducer,persistStore } from 'redux-persist'
import persistConfig from './persistConfig'
import userReducer from './slices/userSlice'
import vehicleReducer from './slices/vechileSlice'


const rootReducer=combineReducers({
  user:userReducer,
  vehicle: vehicleReducer,
})

const persistedReducer= persistReducer(persistConfig,rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false}),
})
export const persistor = persistStore(store);
export default store;