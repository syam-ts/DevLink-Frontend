import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from '../slices/userSlice';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

 
const rootReducer = combineReducers({
    user: userReducer,
});
 
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],  
};

 
const persistedReducer = persistReducer(persistConfig, rootReducer);

 
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: { 
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const userPersistor = persistStore(store);
export default store;
