import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './userSlice';
import { Client } from './clientSlice';

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
    user: [],
    client: []
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInAdmin: (state, action: PayloadAction<Admin>) => { 
            state.currentAdmin = action.payload;
            state.isAdmin = true;
        },
        
        signOutAdmin: (state) => {
            state.currentAdmin = null;
            state.isAdmin = false;
        },
        addRequest: (state, action: PayloadAction<Admin>) => {
               state.request.push(action);
        },
        pullRequest: (state, action: PayloadAction<Admin>) => {
            state.request = state.request.filter(
                (item) => item.clientId !== action.payload.clientId
              );
        },
        setUser: (state, action: PayloadAction<User>) => {
            const usersMap = new Map(state.user.map((user) => [user._id, user]));  
            usersMap.set(action.payload._id, action.payload); 
            state.user = Array.from(usersMap.values()); 
             
        },
        setClient: (state, action: PayloadAction<Client>) => {
            const clientMap = new Map(state.client.map((client) => [client._id, client])); 
            clientMap.set(action.payload._id, action.payload); 
            state.client = Array.from(clientMap.values()); 
             
        },
        blockUser: (state, action: PayloadAction<User>) => {
           const foundUser = state.user.find((u) => u._id === action.payload );
       
           if(foundUser) {
            foundUser.isBlocked = true
           }
        },
        unBlockUser: (state, action) => {
            const foundUser = state.user.find((u: User) => u._id === action.payload );
       
            if(foundUser) {
             foundUser.isBlocked = false
            }
        },
        blockClient: (state, action: PayloadAction<Client>) => {
           const foundClient= state.client.find((u) => u._id === action.payload );
       
           if(foundClient) {
            foundClient.isBlocked = true
           }
        },
        unBlockClient: (state, action) => {
            const fountClient = state.client.find((u) => u._id === action.payload );
       
            if(fountClient) {
             fountClient.isBlocked = false
            }
        },
        deleteDatasUser: (state, action)=> { 
            console.log('action: ',action)
                state.user = []
        }, 
        deleteDatasClient: (state, action)=> { 
            console.log('action: ',action)

                state.client = []
        } 

    }
});


export default adminSlice.reducer;
export const { signInAdmin, signOutAdmin, addRequest, pullRequest,setUser,setClient, blockUser, blockClient, unBlockUser, unBlockClient, deleteDatasUser, deleteDatasClient} = adminSlice.actions;