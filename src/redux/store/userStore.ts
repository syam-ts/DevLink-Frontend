import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from '../slices/userSlice'


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer
    }
});


export const persistor = persistStore(store);

export default store;