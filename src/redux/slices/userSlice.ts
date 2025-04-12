import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    _id?: string;
    name: string;
    email: string;
    mobile: number;
}

interface UserState {
    currentUser: User | null;
    isUser: boolean;
    notifications: string[];
    notificationsUnread: number;
}

const initialState: UserState = {
    currentUser: null,
    isUser: false,
    notifications: [],
    notificationsUnread: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
            state.isUser = true;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },

        signOutUser: (state) => { 
            state.currentUser = null;
            state.isUser = false;
        },
        addNotification: (state, action) => {
            const parsedNotifications = JSON.parse(action.payload);
            state.notifications.push(...parsedNotifications);
            state.notificationsUnread++;
        },
        markAsReadNotifications: (state) => {
            state.notificationsUnread = 0;
        },
        clearNotificationsUser: (state) => {
            state.notifications = [];
        },
    },
});

export default userSlice.reducer;
export const {
    signInUser,
    updateUser,
    addNotification,
    markAsReadNotifications,
    clearNotificationsUser,
    signOutUser,
} = userSlice.actions;
