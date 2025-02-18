import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    name: string;
    email: string;
    mobile: number;
};
 


interface UserState {
    currentUser: User | null,
    isUser: boolean,
    notifications: string[];
    notificationsUnread: number;
};

const initialState: UserState = {
    currentUser: null,
    isUser: false,
    notifications: [],
    notificationsUnread: 0

}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInUser: (state: any, action: PayloadAction<User>) => {
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
        },
        addNotification: (state: any, action: any) => {
            console.log("The paylod ", action.payload)
            const parsedNotifications = JSON.parse(action.payload);
            state.notifications.push(...parsedNotifications);
            state.notificationsUnread++;

        },
        markAsReadNotifications: (state: any) => { 
            state.notificationsUnread = 0;

        },
        clearNotifications: (state: any) => {
            state.notifications = [];
        }

    }
});


export default userSlice.reducer;
export const { signInUser, updateUser, addNotification, markAsReadNotifications, clearNotifications, signOutUser } = userSlice.actions;