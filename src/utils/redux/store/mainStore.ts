import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from '../slices/userSlice';
import clientReducer from '../slices/clientSlice';
import adminReducer from '../slices/adminSlice';
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

 

  const userPersistConfig = {
    key: 'user',
    storage,
    // whitelist: ['user'], 
};

const clientPersistConfig = {
    key: 'client',
    storage,
    // whitelist: ['client'],  
};
 

const adminPersistConfig = {
    key: 'admin',
    storage,
    // whitelist: ['admin'],  
}; 



const userPersistedReducer = persistReducer(userPersistConfig, userReducer);
const clientPersistedReducer = persistReducer(clientPersistConfig, clientReducer);
const adminPersistedReducer = persistReducer(adminPersistConfig, adminReducer);

const rootReducer = combineReducers({
    user: userPersistedReducer,
    client: clientPersistedReducer,
    admin: adminPersistedReducer,
});
 
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: { 
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;






