import authReducer from './authSlice';
import {
   persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

// these helps us to store data even when the tab is closed
const persistConfig = {key: "root", storage, version: 1};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      })
});

export default store;