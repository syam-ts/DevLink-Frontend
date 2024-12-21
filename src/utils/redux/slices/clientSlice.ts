import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
    name: string;
    email: string;
    mobile: number;
};

const initialState = {
    currentClient: null,
    isClient: false
};

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        signInClient: (state: any, action: PayloadAction<Client>) => {
            state.currentClient = action.payload;
            state.isClient = true;
        },
        
        signOutClient: (state: any) => {
            state.currentClient = null;
            state.isClient = false;
        },

    }
});


export default clientSlice.reducer;
export const { signInClient, signOutClient} = clientSlice.actions;