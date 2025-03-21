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
    user: [],
    client: []
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
            const usersMap = new Map(state.user.map((user: any) => [user._id, user]));  
            usersMap.set(action.payload._id, action.payload); 
            state.user = Array.from(usersMap.values()); 
             
        },
        setClient: (state: any, action: PayloadAction<any>) => {
            const clientMap = new Map(state.client.map((client: any) => [client._id, client])); 
            clientMap.set(action.payload._id, action.payload); 
            state.client = Array.from(clientMap.values()); 
             
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
        blockClient: (state: any, action: PayloadAction<any>) => {
           const foundClient= state.client.find((u: any) => u._id === action.payload );
       
           if(foundClient) {
            foundClient.isBlocked = true
           }
        },
        unBlockClient: (state: any, action: any) => {
            const fountClient = state.client.find((u: any) => u._id === action.payload );
       
            if(fountClient) {
             fountClient.isBlocked = false
            }
        },
        deleteDatasUser: (state: any, action: any)=> { 
                state.user = []
        }, 
        deleteDatasClient: (state: any, action: any)=> { 
                state.client = []
        } 

    }
});


export default adminSlice.reducer;
export const { signInAdmin, signOutAdmin, addRequest, pullRequest,setUser,setClient, blockUser, blockClient, unBlockUser, unBlockClient, deleteDatasUser, deleteDatasClient} = adminSlice.actions;