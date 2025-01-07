import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    mobile: number;
};

const initialState = {
    currentUser: null,
    isUser: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state: any, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isUser = true;
        },
        
        signOutUser: (state: any) => {
            state.currentUser = null;
            state.isUser = false;
        }
    }
});


export default userSlice.reducer;
export const { signInUser, signOutUser} = userSlice.actions;