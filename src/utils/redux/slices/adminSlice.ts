import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
    name: string;
    email: string;
    mobile: number;
};

const initialState = {
    currentAdmin: null,
    isAdmin: false
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInAdmin: (state: any, action: PayloadAction<Admin>) => {
            state.currentAdmin = action.payload;
            state.isAdmin = true;
        },
        
        signOutAdmin: (state: any) => {
            state.currentAdmin = null;
            state.isAdmin = false;
        },

    }
});


export default adminSlice.reducer;
export const { signInAdmin, signOutAdmin} = adminSlice.actions;