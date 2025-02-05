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
            console.log("Payload received in reducer:", action.payload);
            state.currentUser = action.payload;
            state.isUser = true;
        },
        updateUser: (state: any, action: PayloadAction<User>) => { 
            console.log("Payload received in reducer:", action.payload);
            state.currentUser = action.payload; 
        },
        
        signOutUser: (state: any) => {
            state.currentUser = null;
            state.isUser = false;
        }
    }
});


export default userSlice.reducer;
export const { signInUser,updateUser, signOutUser} = userSlice.actions;