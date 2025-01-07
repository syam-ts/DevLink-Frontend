import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Admin {
    name: string;
    email: string;
    mobile: number;
    clientId: string;
};

const initialState = {
    currentAdmin: null,
    isAdmin: false,
    request: [],
    user: []
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
        addRequest: (state: any, action: PayloadAction<Admin>) => {
               state.request.push(action);
        },
        pullRequest: (state: any, action: PayloadAction<Admin>) => {
            state.request = state.request.filter(
                (item: any) => item.clientId !== action.payload.clientId
              );
        },
        setUser: (state: any, action: PayloadAction<any>) => {
            const usersMap = new Map(state.user.map((user: any) => [user._id, user])); // Create a Map using user _id as the key
            usersMap.set(action.payload._id, action.payload); // Add or update the new user
            state.user = Array.from(usersMap.values()); 
             
        },
        blockUser: (state: any, action: PayloadAction<any>) => {
           const foundUser = state.user.find((u: any) => u._id === action.payload );
       
           if(foundUser) {
            foundUser.isBlocked = true
           }
        },
        unBlockUser: (state: any, action: any) => {
            const foundUser = state.user.find((u: any) => u._id === action.payload );
       
            if(foundUser) {
             foundUser.isBlocked = false
            }
        },

    }
});


export default adminSlice.reducer;
export const { signInAdmin, signOutAdmin, addRequest, pullRequest,setUser, blockUser, unBlockUser} = adminSlice.actions;